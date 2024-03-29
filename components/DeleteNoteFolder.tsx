import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ref, remove } from "firebase/database";
import { db, storage } from "../lib/firebase";
import Image from "next/image";
import icon_correct from "../assets/images/icons/check.png";
import icon_wrong from "../assets/images/icons/cross.png";
import { allFolderNames } from "../lib/helperFunctions";
import toast, { Toaster } from "react-hot-toast";
import icon_delete_folder from "../assets/images/icons/delete-folder.png";

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function DeleteNoteFolder({
  path,
  pathFileStorage,
  db_array,
  folderName,
  rootFolderName,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    folderNotes();
  }

  function deleteFolderDB(path) {
    const pathToFolder = ref(db, `markdown_note_index/${path}`);
    remove(pathToFolder)
      .then(() => {
        // Data saved successfully!
        toast.success(
          `The folder "${folderName}", was successfully deleted fom the database.`,
          {
            duration: 4000,
          }
        );
      })
      .catch((error) => {
        // The write failed...
        toast.error(`see console log for error: "${error}"`, {
          duration: 4000,
        });
        console.log(error);
      });
    // close the menu after
    closeModal();
  }

  function folderNotes() {
    let notes = [];
    for (let i = 0; i < db_array.length; i++) {
      if (rootFolderName == db_array[i][0]) {
        // only from foot folder, add "notes" from root folder
        if (db_array[i][1] && rootFolderName === folderName) {
          db_array[i][1].forEach((item) => notes.push(item));
        }
        if (db_array[i][2]) {
          for (let a = 0; a < db_array[i][2].length; a++) {
            // only from root folder, add all "notes"
            if (db_array[i][2][a][1] && rootFolderName === folderName) {
              db_array[i][2][a][1].forEach((item) => notes.push(item));
            }
            // only from sub folder, add only "notes" from within the sub folder
            if (db_array[i][2][a][1] && db_array[i][2][a][0] === folderName) {
              db_array[i][2][a][1].forEach((item) => notes.push(item));
            }
          }
        }
      }
    }
    return notes.sort();
  }

  // list of notes which are contained within the folder
  let noteList = folderNotes();

  return (
    <>
      <Toaster />

      <Button
        title={""}
        tip={`delete "${folderName}" and its notes`}
        padding="pl-1 pr-1 pb-0 pt-0"
        margin="m-1 mr-2"
        callBack={openModal}
        iconLeft={
          <Image
            loader={myLoader}
            src={icon_delete_folder}
            alt={`icon`}
            width={20}
            height={20}
            className="inline-block"
          />
        }
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 flex justify-center"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full sm:w-[500px]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all bg-[#fff]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                    <h3>
                      Delete &#34;
                      <span className="underline decoration-double">
                        {folderName}
                      </span>
                      &#34; folder.
                    </h3>
                    <Button
                      style={4}
                      title={"close"}
                      tip={"close form"}
                      aria={"close login or sign-up form"}
                      callBack={closeModal}
                    />
                  </Dialog.Title>
                  <hr className="text-neutral-300" />
                  {noteList[0] && (
                    <>
                      <p className=" text-neutral-400 text-sm mt-4">
                        You can <span className="font-black">NOT delete</span>{" "}
                        the folder, because there are still note(s) inside.
                        <br />
                        Delete first manually every note in the folder &#34;
                        {folderName}&#34;.
                      </p>
                      <div className="text-center mb-4">
                        {noteList.map((note) => (
                          <span
                            key={note}
                            className="bg-primary-200 pl-1 pr-1 inline-block text-center ml-2 mt-1 text-neutral-400"
                          >
                            {note}{" "}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  <hr className="text-neutral-300" />
                  <Button
                    title="delete folder"
                    tip={"Delete the folder and its content."}
                    callBack={() => deleteFolderDB(path)}
                    style={5}
                    // only allow to delete the folder if there are no notes contained within
                    disable={noteList[0] ? true : false}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
