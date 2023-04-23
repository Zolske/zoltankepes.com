import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";
import Image from "next/image";
import icon_folder from "../../assets/images/icons/folder_page.png";
import Link from "next/link";
import { createJsonArray } from "../../lib/helperFunctions";
import { rt_db_json_ref } from "../../lib/firebase";
import { useState, useEffect } from "react";

export async function getStaticProps() {
  // get json from the realtime database
  // https://firebase.google.com/docs/database/web/read-and-write#read_data
  let data = "not ready";
  onValue(rt_db_json_ref, (snapshot) => {
    // data = snapshot.val();
    data = createJsonArray(snapshot.val());
  });

  return {
    props: {
      json: data,
    },
  };
}

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function Notes({ json }) {
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // const note_folder = Object.keys(json);

  return (
    <>
      <h1>{json}</h1>
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
