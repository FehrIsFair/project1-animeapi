import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../config";

// Firebase admin constant
const admin = require("firebase-admin");

//Service Account
const serviceAccount = require("../Confidential/school-project-19319-firebase-adminsdk-hntw6-95b67a2244.json");

// db constant

if (!firebase.apps.length) {
  console.log(process.env);
  firebase.initializeApp(firebaseConfig);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export const db = admin.firestore();
export default firebase;
