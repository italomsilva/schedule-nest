const Device = Parse.Object.extend('Device');
const Notification = Parse.Object.extend('Notification');
const Rating = Parse.Object.extend('Rating');
const Schedule = Parse.Object.extend('Schedule');

const Recipient = require('mailersend').Recipient;
const EmailParams = require('mailersend').EmailParams;
const MailerSend = require('mailersend').MailerSend;
const Sender = require('mailersend').Sender;

const resetPasswordMaxTime = 1000 * 60 * 60;

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_KEY,
});

//ok
Parse.Cloud.define(
  'v1-sign-in',
  async (req) => {
    const queryUser = new Parse.Query('_User');
    queryUser.equalTo('email', req.params.email.toLowerCase());
    const foundUser = await queryUser.first({ useMasterKey: true });

    if (foundUser != null) {
      if (!foundUser.get('methods').includes('email')) throw 'OTHER_METHOD';
    }

    const user = await Parse.User.logIn(
      req.params.email.toLowerCase(),
      req.params.password,
    );
    return formatUser(user.toJSON());
  },
  {
    fields: {
      email: {
        required: true,
      },
      password: {
        required: true,
      },
    },
  },
);

Parse.Cloud.define('v1-sign-in-with-google', async (req) => {
  const queryUser = new Parse.Query('_User');
  queryUser.equalTo('email', req.params.email.toLowerCase());
  const foundUser = await queryUser.first({ useMasterKey: true });

  if (foundUser != null) {
    if (!foundUser.get('methods').includes('google')) throw 'OTHER_METHOD';
  }

  const authData = {
    authData: {
      id: req.params.id,
      access_token: req.params.access_token,
      id_token: req.params.id_token,
    },
  };

  let user = await Parse.User.logInWith('google', authData, {
    useMasterKey: true,
  });
  user.set('fullname', titleCase(req.params.fullname || ''));
  user.set('email', req.params.email);
  user.set('username', req.params.email);
  user.addUnique('methods', 'google');
  user = await user.save(null, { useMasterKey: true });

  return formatUser(user.toJSON());
});

Parse.Cloud.define(
  'v1-link-with-google',
  async (req) => {
    const authData = {
      authData: {
        id: req.params.id,
        access_token: req.params.access_token,
        id_token: req.params.id_token,
      },
    };

    let user = await req.user.linkWith('google', authData, {
      useMasterKey: true,
    });
    user.addUnique('methods', 'google');
    user = await user.save(null, { useMasterKey: true });

    return formatUser(user.toJSON());
  },
  {
    requireUser: true,
  },
);
//ok
Parse.Cloud.define('v1-get-user', async (req) => {
  return formatUser(req.user.toJSON());
});

//ok
Parse.Cloud.define(
  'v1-sign-up',
  async (req) => {
    const user = new Parse.User();
    user.set('email', req.params.email.toLowerCase());
    user.set('username', req.params.email.toLowerCase());
    user.set('fullname', req.params.fullname);
    user.set('phone', req.params.phone);
    user.set('document', req.params.document);
    user.set('password', req.params.password);
    user.addUnique('methods', 'email');
    await user.signUp(null, { useMasterKey: true });
    return formatUser(user.toJSON());
  },
  {
    fields: {
      email: {
        required: true,
      },
      password: {
        required: true,
      },
      fullname: {
        required: true,
      },
      document: {
        required: true,
      },
      phone: {
        required: truean,
      },
    },
  },
);

//ok
Parse.Cloud.define(
  'v1-change-password',
  async (req) => {
    const user = await Parse.User.logIn(
      req.user.get('email'),
      req.params.currentPassword,
    );
    user.set('password', req.params.newPassword);
    await user.save(null, { useMasterKey: true });
  },
  {
    requireUser: true,
  },
);

//ok
Parse.Cloud.define(
  'v1-edit-profile',
  async (req) => {
    req.user.set('phone', req.params.phone);
    req.user.set('fullname', req.params.fullname);
    req.user.set('document', req.params.cpf);

    const savedUser = await req.user.save(null, { useMasterKey: true });
    return formatUser(savedUser.toJSON());
  },
  {
    requireUser: true,
  },
);

//renan
Parse.Cloud.define(
  'v1-delete-account',
  async (req) => {
    const user = await Parse.User.logIn(
      req.user.get('email'),
      req.params.password,
    );
    await user.destroy({ useMasterKey: true });
  },
  {
    requireUser: true,
  },
);

//ok
Parse.Cloud.define('v1-request-password-reset', async (req) => {
  const queryUser = new Parse.Query('_User');
  queryUser.equalTo('email', req.params.email);
  const user = await queryUser.first({ useMasterKey: true });

  if (user) {
    const code = getRndInteger(100000, 1000000);
    user.set('resetPasswordCode', code);
    user.set('resetPasswordDateTime', new Date());
    user.set('resetPasswordTries', 0);
    await user.save(null, { useMasterKey: true });

    await sendResetPasswordCode(user.get('fullname'), user.get('email'), code);
  }
});

//ok
Parse.Cloud.define('v1-set-new-password', async (req) => {
  const queryUser = new Parse.Query('_User');
  queryUser.equalTo('email', req.params.email);
  const user = await queryUser.first({ useMasterKey: true });

  if (!user) {
    throw 'INVALID_CODE';
  }

  if (
    user.get('resetPasswordCode') != req.params.code ||
    user.get('resetPasswordTries') >= 5
  ) {
    user.increment('resetPasswordTries', 1);
    await user.save(null, { useMasterKey: true });
    if (user.get('resetPasswordTries') >= 5) {
      throw 'MAX_TRIES_EXCEEDED';
    } else {
      throw 'INVALID_CODE';
    }
  } else if (
    new Date() - user.get('resetPasswordDateTime') >
    resetPasswordMaxTime
  ) {
    throw 'MAX_TIME_EXCEEDED';
  } else {
    user.set('password', req.params.password);
    user.unset('resetPasswordCode');
    user.unset('resetPasswordDateTime');
    user.unset('resetPasswordTries');
    await user.save(null, { useMasterKey: true });
  }
});


//apagar todos os devices dele
//apagar todas as notificações dele
//apagar todas as avaliações dele
//apagar todas os agendamentos dele


//renan 
Parse.Cloud.afterDelete('_User', async (request) => {
  const user = request.object;

  const queryDevices = new Parse.Query(Device);
  queryDevices.equalTo('user', user);
  const devices = await queryDevices.find({ useMasterKey: true });

  await Parse.Object.destroyAll(devices, { useMasterKey: true });

  const queryNotifications = new Parse.Query(Notification);
  queryNotifications.equalTo('user', user);
  const notifications = await queryNotifications.find({ useMasterKey: true });

  await Parse.Object.destroyAll(notifications, { useMasterKey: true });

  const queryRatings = new Parse.Query(Rating);
  queryRatings.equalTo('user', user);
  const ratings = await queryRatings.find({ useMasterKey: true });

  await Parse.Object.destroyAll(ratings, { useMasterKey: true });

  const querySchedules = new Parse.Query(Schedule);
  querySchedules.equalTo('user', user);
  const schedules = await querySchedules.find({ useMasterKey: true });

  await Parse.Object.destroyAll(schedules, { useMasterKey: true });
});

function formatUser(u) {
  return {
    id: u.objectId,
    token: u.sessionToken,
    fullname: u.fullname,
    document: u.document,
    phone: u.phone,
    methods: u.methods || [],
  };
}

function titleCase(str) {
  var splitStr = str.trim().toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function sendResetPasswordCode(userName, userEmail, code) {
  const recipients = [new Recipient(userEmail, userName)];

  const sentFrom = new Sender('noreply@medictime.com.br', 'Medic Time');

  const personalization = [
    {
      email: userEmail,
      data: {
        code: code,
        name: userName,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setTemplateId('pxkjn417j364z781')
    .setPersonalization(personalization);

  await mailersend.email.send(emailParams);
}
