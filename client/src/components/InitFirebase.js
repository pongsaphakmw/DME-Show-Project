import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCJcoxuPYRqBrDz684MqbPp1fbMCvR5BGg",
    authDomain: "dme-social-project.firebaseapp.com",
    projectId: "dme-social-project",
    storageBucket: "dme-social-project.appspot.com",
    messagingSenderId: "311829785258",
    appId: "1:311829785258:web:814f707ded3c2a77e8fed3",
    measurementId: "G-ZNQ4346FCV"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;