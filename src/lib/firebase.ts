import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  projectId: "terra-abode",
  appId: "1:290593073743:web:3b78017059a45adab2183a",
  storageBucket: "terra-abode.firebasestorage.app",
  apiKey: "AIzaSyC6dUoB2EV1YR-vC5tfjCHrMlRlowwmKcI",
  authDomain: "terra-abode.firebaseapp.com",
  messagingSenderId: "290593073743"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize App Check - This is commented out until a valid reCAPTCHA key is available.
// if (typeof window !== 'undefined') {
//   initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
//     isTokenAutoRefreshEnabled: true
//   });
// }


const db = getFirestore(app);

export { app, db };
