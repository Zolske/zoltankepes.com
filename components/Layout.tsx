import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoggedUserContext } from "../lib/Contexts";
import { useState, useRef, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [userIn, setUserIn] = useState(false);

  const database = getDatabase();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user && !userIn) {
      setUserIn(true);
      const adminMarkdownNoteRef = ref(
        database,
        `zoltankepes_users/admin/admin_markdown_note/${user.uid}`
      );
      onValue(adminMarkdownNoteRef, (snapshot) => {
        const admin = snapshot.exists();
        setLoggedUserData({ adminMarkdownNote: admin });
      });
    } else if (!user && userIn) {
      setUserIn(false);
      setLoggedUserData(null);
    }
  });

  return (
    <div>
      <LoggedUserContext.Provider value={loggedUserData}>
        <Navbar />
        {/* <main>{children}</main> */}
        {children}
        <Footer />
      </LoggedUserContext.Provider>
    </div>
  );
}
