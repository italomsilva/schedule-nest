const Professional = Parse.Object.extend('Professional');
const Service = Parse.Object.extend('Service');
const Specialty = Parse.Object.extend('Specialty');
const Insurance = Parse.Object.extend('Insurance');
//ok--
Parse.Cloud.define('v1-save-schedule-rule', async (req) => {
    const professional = new Professional();
    professional.id = req.params.professionalId;
    await professional.fetch({useMasterKey: true});

    if(professional.get('owner').id != req.user.id) throw 'INVALID_PROFESSIONAL';

    const slotInterval = req.params.slotInterval;

    if(!slotInterval) throw 'INVALID_SLOT_INTERVAL';

    const slots = req.params.slots;

    if(slots.some((s) => s.weekday > 7 || s.weekday < 1)) throw 'INVALID_WEEKDAY';
    else if(slots.some((s) => new Date(new Date(s.startTime).getTime() + slotInterval * 60 * 1000) > new Date(s.endTime))) throw 'INVALID_SLOTS';

    for(let weekday = 1; weekday <= 7; weekday++) {
        const daySlots = slots.filter((s) => s.weekday == weekday);
        if(daySlots.length == 0 || daySlots.length == 1) continue;

        daySlots.sort(function (a, b) { return new Date(a.startTime) - new Date(b.startTime)});

        for(let slotIndex = 0; slotIndex < daySlots.length - 1; slotIndex++) {
            if(new Date(daySlots[slotIndex].endTime) > new Date(daySlots[slotIndex+1].startTime)) throw 'INVALID_SLOTS';
        }
    }

    professional.set('scheduleRule', slots);
    professional.set('slotInterval', slotInterval);
    professional.set('finishedProfile', true);
    await professional.save(null, {useMasterKey: true});
}, {
    requireUser: true
});

//ok--
Parse.Cloud.define('v1-create-service', async (req) => {
    const professional = new Professional();
    professional.id = req.params.professionalId;
    await professional.fetch({useMasterKey: true});

    if(professional.get('owner').id != req.user.id) throw 'INVALID_PROFESSIONAL';

    const duration = req.params.duration;
    const slotInterval = professional.get('slotInterval');
    if(duration % slotInterval != 0) throw 'INVALID_DURATION';
    if(!req.params.name) throw 'INVALID_NAME';

    const service = new Service();
    service.set('name', req.params.name);
    service.set('price', req.params.price);
    service.set('duration', duration);
    service.set('available', true);
    await service.save(null, {useMasterKey: true});

    professional.add('services', service);
    await professional.save(null, {useMasterKey: true});

    return formatService(service.toJSON());
}, {
    requireUser: true,
    fields: {
        professionalId: {
            required: true,
        },
        name: {
            required: true,
        },
        price: {
            required: true,
        },
        duration: {
            required: true,
        }
    }
});

//ok--
Parse.Cloud.define('v1-change-service-status', async (req) => {
    const professional = new Professional();
    professional.id = req.params.professionalId;
    await professional.fetch({useMasterKey: true});

    if(professional.get('owner').id != req.user.id) throw 'INVALID_PROFESSIONAL';

    const services = professional.get('services');
    const service = services.find((s) => s.id == req.params.serviceId);

    if(!service) throw 'INVALID_SERVICE';
   
    service.set('available', req.params.available);
    await service.save(null, {useMasterKey: true});
    await service.fetch({useMasterKey: true});

    return formatService(service.toJSON());
}, {
    requireUser: true,
    fields: {
        professionalId: {
            required: true,
        },
        serviceId: {
            required: true,
        },
        available: {
            required: true
        }
    }
});

//:ok
Parse.Cloud.define('v1-get-professionals', async (req) => {
	const query = new Parse.Query(Professional);
	query.include('specialties', 'insurances', 'services');

	if(req.params.specialties && req.params.specialties.length > 0) {
        const specialties = req.params.specialties.map(function(s) {
            const specialty = new Specialty();
            specialty.id = s;
            return specialty;
        });
		
		query.containedIn('specialties', specialties);
	}

	if(req.params.slat && req.params.slong && req.params.nlat && req.params.nlong) {
		const southwest = new Parse.GeoPoint({latitude: req.params.slat, longitude: req.params.slong});
        const northeast = new Parse.GeoPoint({latitude: req.params.nlat, longitude: req.params.nlong});
		query.withinGeoBox('location', southwest, northeast);
	}

	if(req.params.page) {
		query.limit(req.params.page);
		query.skip(req.params.page * 20);
	}

    if(req.params.search) {
        query.matches('searchWords', '.*' + req.params.search.toLowerCase() + ".*");
    }
	
	const results = await query.find({useMasterKey: true});
	return results?.map((r) => formatProfessional(r.toJSON()));
}, {
	fields: {
		
	}
});

//:ok
Parse.Cloud.define('v1-get-professional', async (req) => {
	return await getProfessional(req.params.professionalId);
}, {
	fields: {
		professionalId: {
            required: true,
        }
	}
});

//ok--
Parse.Cloud.define('v1-get-professional-internal-profile', async (req) => {
    const professional = new Professional();
    professional.id = req.params.professionalId;
    await professional.fetchWithInclude(['insurances', 'specialties'], {useMasterKey: true});

    if(professional.get('owner').id != req.user.id) throw 'INVALID_PROFESSIONAL';

	return formatInternalProfessional(professional.toJSON());
}, {
	fields: {
		professionalId: {
            required: true,
        }
	}
});

//ok--
Parse.Cloud.define('v1-get-professional-internal-services', async (req) => {
    const professional = new Professional();
    professional.id = req.params.professionalId;
    await professional.fetchWithInclude(['services'], {useMasterKey: true});

    if(professional.get('owner').id != req.user.id) throw 'INVALID_PROFESSIONAL';

	return professional.get('services').map((s) => formatService(s.toJSON()));
}, {
	fields: {
		professionalId: {
            required: true,
        }
	}
});

//ok--
Parse.Cloud.define('v1-get-professional-internal-slots', async (req) => {
    const professional = new Professional();
    professional.id = req.params.professionalId;
    await professional.fetchWithInclude(['services'], {useMasterKey: true});

    if(professional.get('owner').id != req.user.id) throw 'INVALID_PROFESSIONAL';

	return {
        slotInterval: professional.get('slotInterval'),
        slots: professional.get('scheduleRule')
    };
}, {
	fields: {
		professionalId: {
            required: true,
        }
	}
});

//ok
Parse.Cloud.define('v1-edit-professional', async (req) => {
    let professional;
    if(req.params.professionalId) {
        professional = new Professional();
        professional.id = req.params.professionalId;
        await professional.fetchWithInclude(['insurances', 'specialties'], {useMasterKey: true});
    
        if(professional.get('owner').id != req.user.id) throw 'INVALID_PROFESSIONAL';
    } else {
        professional = new Professional();
        professional.set('owner', req.user);
        professional.set('services', []);
        professional.set('scheduleRule', []);
        professional.set('visible', false);
        professional.set('finishedProfile', false);
    }
   
    professional.set('address', req.params.address);
    professional.set('phone', req.params.phone);
    professional.set('name', req.params.name);
    professional.set('location', req.params.location != null ? new Parse.GeoPoint(req.params.location) : null);
    professional.set('crm', req.params.crm);
    professional.set('insurances', req.params.insuranceIds.map((i) => {
        const insurance = new Insurance();
        insurance.id = i;
        return insurance;
    }));
    professional.set('specialties', req.params.specialtyIds.map((i) => {
        const specialty = new Specialty();
        specialty.id = i;
        return specialty;
    }));

    if(req.params.newPicture != null) {
        if(req.params.newPicture == '') {
            await professional.get('profilePicture').destroy({useMasterKey: true});
            professional.unset('profilePicture');
        } else {
            const file = new Parse.File(professional.id + '_picture', {base64: req.params.newPicture});
            professional.set('profilePicture', file);
        }
    }

    await professional.save(null, {useMasterKey: true});
    await professional.fetchWithInclude(['insurances', 'specialties'], {useMasterKey: true});

    return formatInternalProfessional(professional.toJSON());
}, {
    requireUser: true,
    fields: {
        address: {
            required: true,
        },
        phone: {
            required: true,
        },
        name: {
            required: true,
        },
        location: {},
        crm: {
            required: true,
        },
        specialtyIds: {
            required: true,
        },
        insuranceIds: {
            required: true,
        },
        newPicture: {}
    }
});

//:ok
Parse.Cloud.define('v1-get-specialties', async (req) => {
	const query = new Parse.Query(Specialty);
    query.ascending('name');
	const results = await query.find({useMasterKey: true});
	return results.map((r) => formatSpecialty(r.toJSON()));
});

//:ok
Parse.Cloud.define('v1-get-insurances', async (req) => {
	const query = new Parse.Query(Insurance);
    query.ascending('name');
	const results = await query.find({useMasterKey: true});
	return results.map((r) => formatInsurance(r.toJSON()));
});

//ok
Parse.Cloud.define('v1-get-linked-professional', async (req) => {
	const query = new Parse.Query(Professional);
    query.equalTo('owner', req.user);
	const professional = await query.first({useMasterKey: true});
    if(professional) {
        const p = professional.toJSON();
        return {
            id: p.objectId,
            name: p.name,
            picture: p.profilePicture != null ? p.profilePicture?.url : null,
            finishedProfile: p.finishedProfile
        }
    }
	return null;
}, {
    requireUser: true
});

Parse.Cloud.afterSave(Professional, async (request) => {
    /*const professional = request.object;
    await professional.fetchWithInclude(['services', 'specialties'], {useMasterKey: true});
    const words = [];
    words.push(professional.get('name'));
    words.push(professional.get('crm'));
    words.push(professional.get('address'));
    for(const service of professional.get('services')) {
        words.push(...service.get('name').split(' '));
    }
    for(const specialty of professional.get('specialties')) {
        words.push(...specialty.get('name').split(' '));
    }
    professional.set('searchWords', [...new Set(words)].join(' ').toLowerCase());
    await professional.save(null, {useMasterKey: true});
    */
});

async function getProfessional(professionalId) {
    const query = new Parse.Query(Professional);
	query.include('specialties', 'insurances', 'services');

	const result = await query.get(professionalId, {useMasterKey: true});
	return formatProfessional(result.toJSON());
}

function formatService(s) {
    return {
        id: s.objectId,
        name: s.name,
        price: s.price,
        duration: s.duration,
        available: s.available,
    }
}

function formatSpecialty(s) {
	return {
		id: s.objectId,
		name: s.name
	}
}

function formatInsurance(i) {
    return {
        id: i.objectId,
        name: i.name
    }
}

function formatProfessional(p) {
	return {
		id: p.objectId,
		name: p.name,
		specialties: p.specialties.map((s) => formatSpecialty(s)),
		crm: p.crm,
		services: p.services.filter((s) => s.available).map((s) => formatService(s)),
        rating: p.rating,
        ratingCount: p.ratingCount,
        address: p.address,
        phone: p.phone,
        insurances: p.insurances.map((i) => formatInsurance(i)),
        picture: p.profilePicture != null ? p.profilePicture?.url : null,
        location: p.location,
	};
}

function formatInternalProfessional(p) {
	return {
		id: p.objectId,
		name: p.name,
		specialties: p.specialties.map((s) => formatSpecialty(s)),
		crm: p.crm,
        address: p.address,
        phone: p.phone,
        insurances: p.insurances.map((i) => formatInsurance(i)),
        picture: p.profilePicture != null ? p.profilePicture?.url : null,
        location: p.location,
	};
}