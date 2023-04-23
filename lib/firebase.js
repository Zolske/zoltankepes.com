// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
// "file storage database", change ref to alias to avoid conflict with other refs
import { getStorage, ref as fs_ref } from "firebase/storage";
// "realtime database", change ref to alias to avoid conflict with other refs
import { getDatabase, ref as rt_ref } from "firebase/database";

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

// Create a storage reference from our storage service
const notes_markdown_Ref = fs_ref(storage, "notes_markdown");

// Create a storage reference from our storage service
export const bali_Ref = fs_ref(storage, "notes_markdown/test/bali.md");
// <<< end <<< create references to the Databases /////////////////////////////
