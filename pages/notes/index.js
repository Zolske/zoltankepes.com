import { ref, onValue } from "firebase/database";
import Image from "next/image";
import icon_folder from "../../assets/images/icons/folder_page.png";
import Link from "next/link";
import { createJsonArray } from "../../lib/helperFunctions";
import { rt_db_json_ref } from "../../lib/firebase";
import { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

// export async function getStaticProps() {
// get json from the realtime database
// https://firebase.google.com/docs/database/web/read-and-write#read_data
//   let db_json,
//     db_array = null;
//   onValue(rt_db_json_ref, (snapshot) => {
//     db_array = createJsonArray(snapshot.val());
//     db_json = snapshot.val();
//   });

//   return {
//     props: {
//       db_json: db_json,
//       db_array: db_array,
//     },
//   };
// }

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function Notes() {
  const [jsonArray, setJsonArray] = useState("wait for data to be loaded");
  let db_json,
    db_array = null;

  onValue(rt_db_json_ref, (snapshot) => {
    db_array = createJsonArray(snapshot.val());
    db_json = snapshot.val();
  });

  function waitData() {
    if (db_json && db_array) {
      clearInterval(myInterval);
      setJsonArray("data has arrived");
      console.log(db_json);
      console.log(db_array);
    }
  }

  const myInterval = setInterval(waitData, 100);

  return (
    <>
      {!db_json && !db_array && <h1>{jsonArray}</h1>}
      {/* {note_folder.map((folder) => (
        <div key={folder}>
          <h3>
            {json[folder].icon && (
              <Image
                loader={myLoader}
                src={json[folder].icon}
                alt={`${folder} icon`}
                width={25}
                height={25}
                className="inline-block mr-2"
              />
            )}
            {!json[folder].icon && (
              <Image
                src={icon_folder}
                alt={`folder icon`}
                width={25}
                height={25}
                className="inline-block mr-2"
              />
            )}
            {folder}
          </h3>
        </div>
      ))} */}
    </>
  );
}
