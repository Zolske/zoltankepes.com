// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(firebaseApp);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);

// Create a storage reference from our storage service
const notes_markdown_Ref = ref(storage, "notes_markdown");

// Create a storage reference from our storage service
export const bali_Ref = ref(storage, "notes_markdown/test/bali.md");
