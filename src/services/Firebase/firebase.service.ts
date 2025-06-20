import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
// import serviceAccount from '../Firebase/firebase-consult-service.json'; // You will download this

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      // admin.initializeApp({
      //   credential: admin.credential.cert(
      //     serviceAccount as admin.ServiceAccount,
      //   ),
      // });
    }
  }

  async sendMulticastNotification(
    tokens: string[],
    title: string,
    body: string,
  ) {
    const message = {
      notification: {
        title,
        body,
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log('Multicast sent:', response.successCount, 'successes');
      if (response.failureCount > 0) {
        const failedTokens = response.responses
          .map((res, idx) => (!res.success ? tokens[idx] : null))
          .filter((t) => t !== null);
        console.warn('Failed tokens:', failedTokens);
      }
      return response;
    } catch (error) {
      console.error('Error sending multicast notification:', error);
      throw error;
    }
  }
}
