import OneSignal from 'react-onesignal';

export default async function initializeOneSignal(): Promise<void> {
  await OneSignal.init({
    appId: "d7b7bb14-262f-40fd-9f07-e98221459df8",
    allowLocalhostAsSecureOrigin: true,
    promptOptions: {
      // Custom prompt options if needed
    }
  });
}
