import { ref, onValue } from "firebase/database";
import Image from "next/image";
import icon_folder from "../../assets/images/icons/folder_page.png";
import Link from "next/link";
import { createJsonArray } from "../../lib/helperFunctions";
import { rt_db_json_ref } from "../../lib/firebase";
import { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export async function getStaticProps() {
  // get json from the realtime database
  // https://firebase.google.com/docs/database/web/read-and-write#read_data
  //   let db_json,
  //     db_array = null;
  //   onValue(rt_db_json_ref, (snapshot) => {
  //     db_array = createJsonArray(snapshot.val());
  //     db_json = snapshot.val();
  //   });
  let db_json,
    db_array = null;

  // read data from firebase realtime database
  onValue(rt_db_json_ref, (snapshot) => {
    db_array = createJsonArray(snapshot.val())
      ? createJsonArray(snapshot.val())
      : null;
    db_json = snapshot.val() ? snapshot.val() : null;
  });

  // check if data has been updated
  function updateData() {
    // if db_json && db_array are not "null"
    if (db_json && db_array) {
      // stop "setInterval"
      clearInterval(myInterval);
      // setWaitData("data has arrived");
    }
  }

  // keep calling the "updateData" function
  const myInterval = setInterval(updateData, 3000);

  return {
    props: {
      db_json: db_json,
      db_array: db_array,
    },
  };
}

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function Notes({ db_json, db_array }) {
  // message shown to the user for the time the data is loading
  const [waitData, setWaitData] = useState("wait for data to be loaded");
  // console.log(db_array);
  return (
    <>
      {!db_json && !db_array && <h1>{waitData}</h1>}
      {db_array &&
        db_array.map((folder) => (
          <div key={folder[0]}>
            <h3>{folder[0]}</h3>
          </div>
        ))}
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
