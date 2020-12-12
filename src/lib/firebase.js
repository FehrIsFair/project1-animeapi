import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../config";
import * as _admin from "firebase-admin";
import * as adminConfig from "../Confidential/school-project-19319-firebase-adminsdk-hntw6-95b67a2244.json";

if (!firebase.apps.length) {
  console.log(process.env);
  firebase.initializeApp(firebaseConfig);
  _admin.initializeApp(adminConfig);
}

export let admin = _admin;

export default firebase;
