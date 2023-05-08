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
import CreateNote from "../../components/CreateNote";
import DeleteNote from "../../components/DeleteNote";
import Button from "../../components/Button";
import { LoggedUserContext } from "../../lib/Contexts";
import { useContext } from "react";

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

  // use the "LoggedUserContext" to see user data which is defined when user logs-in in "Layout.tsx"
  const LoggedUserData = useContext(LoggedUserContext);

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
      {/* <Button callBack={console.log(db_json.current)} title="log json" />
      <Button
        callBack={() => console.log(db_array.current)}
        title="log array"
      /> */}
      {/* only show if adminMarkdownNote is true */}
      {LoggedUserData?.adminMarkdownNote && (
        <CreateNoteFolder db_json={db_json.current} />
      )}
      {!db_json.current && !db_array.current && <h1>{waitData}</h1>}
      {db_array.current && (
        // grid container for folder and description
        <div className="md:grid md:grid-cols-12 gap-2">
          {/* description grid item */}
          <div className="md:col-span-6 bg-indigo-400">
            <h2 className="mt-4 text-center">Description</h2>
            <p className="text-center">{description}</p>
          </div>
          {/* folder grid item */}
          <div className="bg-primary-500 md:col-span-6">
            {db_array.current.map((folder) => (
              <div key={folder[0]}>
                {/* folder from the root of the database */}
                <div
                  className="group flex items-center"
                  onMouseOver={(e) =>
                    readMetaData(db_json.current[folder[0]]?.MetaData)
                  }
                >
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
                    className="mr-2"
                  />
                  <h3>{folder[0]}</h3>
                  {/* only show if adminMarkdownNote is true */}
                  {LoggedUserData?.adminMarkdownNote && (
                    <div className="invisible group-hover:visible">
                      <CreateNoteFolder
                        db_json={db_json.current}
                        parent_name={folder[0]}
                      />
                      <DeleteNoteFolder
                        path={folder[0]}
                        db_array={db_array.current}
                        folderName={folder[0]}
                        rootFolderName={folder[0]}
                        pathFileStorage={folder[0]}
                      />
                      <CreateNote
                        path={folder[0] + "/Notes"}
                        pathFileStorage={folder[0]}
                        db_json={db_json.current}
                        folderName={folder[0]}
                      />
                    </div>
                  )}
                </div>
                {/* notes from root folder */}
                {folder[1] &&
                  folder[1].map((link) => (
                    <>
                      <ul>
                        <li
                          key={link}
                          className="group flex items-center"
                          onMouseOver={(e) =>
                            readMetaData(
                              db_json.current[folder[0]].Notes[link]?.MetaData
                            )
                          }
                        >
                          <Link href={`/notes/${folder[0]}/${link}`}>
                            <Image
                              loader={myLoader}
                              src={icon_file}
                              alt={`${link} icon`}
                              width={15}
                              height={15}
                              className="inline-block mr-1"
                            />
                            {link}
                          </Link>
                          {/* only show if adminMarkdownNote is true */}
                          {LoggedUserData?.adminMarkdownNote && (
                            <div className="invisible group-hover:visible">
                              <DeleteNote
                                path={folder[0] + "/Notes/" + link}
                                db_array={db_array.current}
                                noteName={link}
                                pathFileStorage={folder[0]}
                              />
                            </div>
                          )}
                        </li>
                      </ul>
                    </>
                  ))}
                {folder[2] &&
                  folder[2].map((subfolder) => (
                    <>
                      {/*subfolder from the root of the database */}
                      <div
                        className="group flex items-center"
                        onMouseOver={(e) =>
                          readMetaData(db_json.current[folder[0]]?.MetaData)
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
                              ? db_json.current[folder[0]].SubFolder[
                                  subfolder[0]
                                ]?.MetaData?.icon
                              : icon_folder
                          }
                          alt={`${subfolder[0]} icon`}
                          width={25}
                          height={25}
                          className="mr-2"
                        />
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
                          {subfolder[0]}
                        </h4>
                        {/* only show if adminMarkdownNote is true */}
                        {LoggedUserData?.adminMarkdownNote && (
                          <div className="invisible group-hover:visible">
                            <DeleteNoteFolder
                              path={folder[0] + "/SubFolder/" + subfolder[0]}
                              db_array={db_array.current}
                              folderName={subfolder[0]}
                              rootFolderName={folder[0]}
                              pathFileStorage={folder[0] + "/" + subfolder[0]}
                            />
                            <CreateNote
                              path={
                                folder[0] +
                                "/SubFolder/" +
                                subfolder[0] +
                                "/Notes"
                              }
                              pathFileStorage={folder[0] + "/" + subfolder[0]}
                              db_json={db_json.current}
                              folderName={subfolder[0]}
                            />
                          </div>
                        )}
                      </div>
                      {/* notes from the subfolder */}
                      {subfolder[1] &&
                        subfolder[1].map((link) => (
                          <>
                            <ul>
                              <li
                                key={link}
                                className="group flex items-center"
                                onMouseOver={(e) =>
                                  readMetaData(
                                    db_json.current[folder[0]].SubFolder[
                                      subfolder[0]
                                    ]?.Notes[link]?.MetaData
                                  )
                                }
                              >
                                <Link
                                  href={`/notes/${folder[0]}/${subfolder[0]}/${link}`}
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
                                </Link>
                                {/* only show if adminMarkdownNote is true */}
                                {LoggedUserData?.adminMarkdownNote && (
                                  <div className="invisible group-hover:visible">
                                    <DeleteNote
                                      path={
                                        folder[0] +
                                        "/SubFolder/" +
                                        subfolder[0] +
                                        "/Notes/" +
                                        link
                                      }
                                      pathFileStorage={
                                        folder[0] + "/" + subfolder[0]
                                      }
                                      noteName={link}
                                    />
                                  </div>
                                )}
                              </li>
                            </ul>
                          </>
                        ))}
                    </>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
