// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// "file storage database", change ref to alias to avoid conflict with other refs
import { getStorage, ref as fs_ref } from "firebase/storage";
// "realtime database", change ref to alias to avoid conflict with other refs
import { getDatabase, ref as rt_ref } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// >>> start >>> Initialize Databases /////////////////////////////////////////
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(firebaseApp);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);
// <<< end <<< Initialize Databases ///////////////////////////////////////////

// >>> start >>> create references to the Databases ///////////////////////////
// reference to the root of "firebase realtime database"
// https://console.firebase.google.com/project/zoltankepes-com/database/zoltankepes-com-default-rtdb/data
export const rt_db_json_ref = rt_ref(db, "markdown_note_index");

// reference to the root of "firebase file cloud storage database"
export const fs_db_markdown_ref = fs_ref(storage, "notes_markdown");

// Create a storage reference from our storage service
export const bali_Ref = fs_ref(storage, "notes_markdown/test/bali.md");
// <<< end <<< create references to the Databases /////////////////////////////
