import { ref, onValue } from "firebase/database";
import Image from "next/image";
import icon_folder from "../../assets/images/icons/folder_page.png";
import icon_file from "../../assets/images/icons/file.png";
import icon_subfolder from "../../assets/images/icons/subfolder.png";
import Link from "next/link";
import { createJsonArray } from "../../lib/helperFunctions";
import { rt_db_json_ref } from "../../lib/firebase";
import { useState, useEffect, useRef } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import CreateNoteFolder from "../../components/CreateNoteFolder";
import DeleteNoteFolder from "../../components/DeleteNoteFolder";
import Button from "../../components/Button";

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
  const [description, setDescription] = useState("hover over the folders");
  const [author, setAuthor] = useState(false);
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [minToRead, setMinToRead] = useState(false);
  const [icon, setIcon] = useState(false);
  const [title, setTitle] = useState(false);

  let db_json = useRef(false);
  let db_array = useRef(false);

  useEffect(() => {
    onValue(rt_db_json_ref, (snapshot) => {
      if (snapshot.exists()) {
        db_json.current = snapshot.val();
        db_array.current = createJsonArray(db_json.current);
        setWaitData("data has arrived");
      }
    });
  }, [db_json]);

  function readMetaData(data = false) {
    setDescription(data.description ? data.description : false);
    setAuthor(data.author ? data.author : false);
    setCreated(data.created ? data.created : false);
    setUpdated(data.updated ? data.updated : false);
    setMinToRead(data.minToRead ? data.minToRead : false);
    setIcon(data.icon ? data.icon : false);
    setTitle(data.title ? data.title : false);
  }
  // console.log(db_json.current);

  function allNoteNames(json) {
    let firstFolder = Object.keys(json);
    let secondFolder = [];
    let firstNotes = [];
    let secondNotes = [];

    for (let i = 0; i < firstFolder.length; i++) {
      if ("SubFolder" in json[firstFolder[i]]) {
        secondFolder = secondFolder.concat(
          Object.keys(json[firstFolder[i]].SubFolder)
        );
      }
    }

    for (let i = 0; i < firstFolder.length; i++) {
      if ("Notes" in json[firstFolder[i]]) {
        firstNotes = firstNotes.concat(Object.keys(json[firstFolder[i]].Notes));
      }
    }

    for (let first = 0; first < firstFolder.length; first++) {
      for (let second = 0; second < secondFolder.length; second++) {
        if ("SubFolder" in json[firstFolder[first]]) {
          if (secondFolder[second] in json[firstFolder[first]].SubFolder) {
            if (
              "Notes" in
              json[firstFolder[first]].SubFolder[secondFolder[second]]
            ) {
              secondNotes = secondNotes.concat(
                Object.keys(
                  json[firstFolder[first]].SubFolder[secondFolder[second]].Notes
                )
              );
            }
          }
        }
      }
    }

    return firstNotes.concat(secondNotes);
  }

  return (
    <>
      <Button callBack={console.log(db_json.current)} title="log json" />
      <Button
        callBack={() => console.log(db_array.current)}
        title="log array"
      />
      {!db_json.current && !db_array.current && <h1>{waitData}</h1>}
      {db_array.current &&
        db_array.current.map((folder) => (
          <div key={folder[0]}>
            <h3
              onMouseOver={(e) =>
                readMetaData(db_json.current[folder[0]]?.MetaData)
              }
              className="inline-block"
            >
              {
                <Image
                  loader={myLoader}
                  src={
                    db_json.current[folder[0]]?.MetaData?.icon
                      ? db_json.current[folder[0]]?.MetaData?.icon
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
            <CreateNoteFolder
              db_json={db_json.current}
              parent_name={folder[0]}
            />
            <DeleteNoteFolder
              path={folder[0]}
              db_array={db_array.current}
              folderName={folder[0]}
            />
            {folder[1] &&
              folder[1].map((link) => (
                <>
                  <ul>
                    <li
                      key={link}
                      className="inline-block"
                      onMouseOver={(e) =>
                        readMetaData(
                          db_json.current[folder[0]].Notes[link]?.MetaData
                        )
                      }
                    >
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
                  <h4
                    key={subfolder[0]}
                    className="inline-block"
                    onMouseOver={(e) =>
                      readMetaData(
                        db_json.current[folder[0]].SubFolder[subfolder[0]]
                          ?.MetaData
                      )
                    }
                  >
                    <Image
                      key={
                        db_json.current[folder[0]].SubFolder[subfolder[0]]
                          ?.MetaData?.icon
                      }
                      loader={myLoader}
                      src={
                        db_json.current[folder[0]].SubFolder[subfolder[0]]
                          ?.MetaData.icon
                          ? db_json.current[folder[0]].SubFolder[subfolder[0]]
                              ?.MetaData?.icon
                          : icon_folder
                      }
                      alt={`${subfolder[0]} icon`}
                      width={25}
                      height={25}
                      className="inline-block mr-2"
                    />

                    {subfolder[0]}
                  </h4>
                  <DeleteNoteFolder
                    path={folder[0] + "/SubFolder/" + subfolder[0]}
                    db_array={db_array.current}
                    folderName={subfolder[0]}
                  />
                  {subfolder[1] &&
                    subfolder[1].map((link) => (
                      <>
                        <ul>
                          <li
                            key={link}
                            className="inline-block"
                            onMouseOver={(e) =>
                              readMetaData(
                                db_json.current[folder[0]].SubFolder[
                                  subfolder[0]
                                ]?.Notes[link]?.MetaData
                              )
                            }
                          >
                            <Image
                              key={link + icon_file}
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
      <h2 className="mt-4 text-center">Description</h2>
      <p className="text-center">{description}</p>
      <CreateNoteFolder db_json={db_json.current} />
    </>
  );
}
