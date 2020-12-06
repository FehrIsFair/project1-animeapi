import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../config";

// Firebase admin constant
const admin = require("firebase-admin");
//Service Account
const serviceAccount = require(process.env.PATH_TO_FIREBASE_ADMIN_KEY);

// db constant
export const db = admin.database();

if (!firebase.apps.length) {
  console.log(process.env);
  firebase.initializeApp(firebaseConfig);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default firebase;
