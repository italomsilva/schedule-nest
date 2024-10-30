import admin from 'firebase-admin';
import { NotificationGateway } from '../../domain/gateway/NotificationGateway';

const firebaseCredentials = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

export class FirebaseNotificationGateway implements NotificationGateway {
  private initialized: boolean = false;
  private firebaseAdmin: admin.app.App;

  constructor() {
    this.initialize(firebaseCredentials);
  }

  async initialize(serviceAccountCredentials: any): Promise<void> {
    if (!this.initialized) {
      this.firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccountCredentials),
      });

      this.initialized = true;
    }
  }

  async sendPush(
    registrationTokens: string[],
    title: string,
    body: string,
    data: any,
  ): Promise<admin.messaging.BatchResponse> {
    if (!this.initialized || !this.firebaseAdmin) {
      throw new Error(
        'Firebase Admin has not been initialized. Call initialize method first.',
      );
    }

    const message = {
      data: data,
      notification: {
        title: title,
        body: body,
      },
      tokens: registrationTokens,
    };

    const result = await this.firebaseAdmin.messaging().sendMulticast(message);
    return result;
  }
}
