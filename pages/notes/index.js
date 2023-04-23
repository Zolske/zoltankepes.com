import { ref, onValue } from "firebase/database";
import Image from "next/image";
import icon_folder from "../../assets/images/icons/folder_page.png";
import icon_file from "../../assets/images/icons/file.png";
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
// let db_json,
//   db_array = null;

// // read data from firebase realtime database
// onValue(rt_db_json_ref, (snapshot) => {
//   db_array = createJsonArray(snapshot.val())
//     ? createJsonArray(snapshot.val())
//     : null;
//   db_json = snapshot.val() ? snapshot.val() : null;
// });

// // check if data has been updated
// function updateData() {
//   // if db_json && db_array are not "null"
//   if (db_json && db_array) {
//     // stop "setInterval"
//     clearInterval(myInterval);
//     // setWaitData("data has arrived");
//   }
// }

// // keep calling the "updateData" function
// const myInterval = setInterval(updateData, 3000);

//   return {
//     props: {
//       db_json: db_json,
//       db_array: db_array,
//     },
//   };
// }

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function Notes() {
  // message shown to the user for the time the data is loading
  const [waitData, setWaitData] = useState("wait for data to be loaded");

  let db_json,
    db_array = false;

  // read data from firebase realtime database
  onValue(rt_db_json_ref, (snapshot) => {
    db_array = createJsonArray(snapshot.val());
    db_json = snapshot.val();
  });

  // check if data has been updated
  function updateData() {
    // if db_json && db_array are not "null"
    if (db_json && db_array) {
      // stop "setInterval"
      clearInterval(myInterval);
      // DO NOT DELETE! is needed to trigger a rerender of the page!!
      setWaitData("data has arrived");
    }
  }

  // keep calling the "updateData" function
  const myInterval = setInterval(updateData, 100);
  // console.log(db_array);
  return (
    <>
      {!db_json && !db_array && <h1>{waitData}</h1>}
      {db_array &&
        db_array.map((folder) => (
          <div key={folder[0]}>
            <h3>
              {
                <Image
                  loader={myLoader}
                  src={
                    db_json[folder[0]].icon
                      ? db_json[folder[0]].icon
                      : icon_folder
                  }
                  alt={`${folder[0]} icon`}
                  width={25}
                  height={25}
                  className="inline-block mr-2"
                />
              }
              {folder[0]}
            </h3>
            {folder[1] &&
              folder[1].map((link) => (
                <>
                  <ul>
                    <li key={link}>
                      <Image
                        loader={myLoader}
                        src={icon_file}
                        alt={`${link} icon`}
                        width={15}
                        height={15}
                        className="inline-block mr-1"
                      />
                      {link}
                    </li>
                  </ul>
                </>
              ))}
            {folder[2] &&
              folder[2].map((subfolder) => (
                <>
                  <h4 key={subfolder[0]}>
                    {/* // console.log(
                      //   db_json[folder[0]].SubFolder[subfolder[0]].icon
                      // ) */}
                    <Image
                      loader={myLoader}
                      src={
                        db_json[folder[0]].SubFolder[subfolder[0]].icon
                          ? db_json[folder[0]].SubFolder[subfolder[0]].icon
                          : icon_folder
                      }
                      alt={`${subfolder[0]} icon`}
                      width={25}
                      height={25}
                      className="inline-block mr-2"
                    />

                    {subfolder[0]}
                  </h4>
                  {subfolder[1] &&
                    subfolder[1].map((link) => (
                      <>
                        <ul>
                          <li key={link}>
                            <Image
                              loader={myLoader}
                              src={icon_file}
                              alt={`${link} icon`}
                              width={15}
                              height={15}
                              className="inline-block mr-1"
                            />
                            {link}
                          </li>
                        </ul>
                      </>
                    ))}
                </>
              ))}
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
