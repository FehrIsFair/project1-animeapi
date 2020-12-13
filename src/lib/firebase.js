import app from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../config";

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

export default app;
