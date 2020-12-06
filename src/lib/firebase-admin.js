// Firebase admin constant
const admin = require("firebase-admin");
//Service Account
const serviceAccount = require(process.env.PATH_TO_FIREBASE_ADMIN_KEY);

// db constant
const db = admin.database();
// ref constant
const ref = db.ref("");
