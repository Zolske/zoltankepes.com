import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { db, storage } from "../lib/firebase";
import { ref, remove } from "firebase/database";
import { deleteObject, ref as rt_ref } from "firebase/storage";
import Image from "next/image";
import icon_correct from "../assets/images/icons/check.png";
import icon_wrong from "../assets/images/icons/cross.png";
import { allFolderNames } from "../lib/helperFunctions";
import toast, { Toaster } from "react-hot-toast";
import icon_delete_note from "../assets/images/icons/delete_note.png";

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function DeleteNote({
  path,
  db_array,
  noteName,
  pathFileStorage,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function deleteMarkdownInCloud() {
    // const storageRef = rt_ref(
    //   storage,
    //   "notes_markdown/" + pathFileStorage + "/" + noteName + ".md"
    // );
    // Create a reference to the file to delete
    const storageRef = rt_ref(storage, "notes_markdown/" + noteName + ".md");

    // Delete the file
    deleteObject(storageRef)
      .then(() => {
        // File deleted successfully
        toast.success(
          `The note "${noteName}" was successfully deleted to the "firebase file storage".`,
          {
            duration: 4000,
          }
        );
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        toast.error(`see console log for error: "${error}"`, {
          duration: 4000,
        });
        console.log(error);
      });
  }

  function deleteFolderDB(path) {
    const pathToFolder = ref(db, `markdown_note_index/${path}`);
    remove(pathToFolder)
      .then(() => {
        // Data saved successfully!
        toast.success(
          `The note "${noteName}", was successfully deleted fom the database.`,
          {
            duration: 4000,
          }
        );
      })
      .catch((error) => {
        // The failed to delete ...
        toast.error(`see console log for error: "${error}"`, {
          duration: 4000,
        });
        console.log(error);
      });
    // delete note in "firebase cloud file" storage
    deleteMarkdownInCloud();
    // close the menu after
    closeModal();
  }

  return (
    <>
      <Toaster />

      <Button
        title={""}
        tip={`delete the note "${noteName}"`}
        padding="pl-1 pr-1 pb-0 pt-0"
        margin="m-1 mr-2"
        callBack={openModal}
        iconLeft={
          <Image
            loader={myLoader}
            src={icon_delete_note}
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
                      Delete the &#34;
                      <span className="underline decoration-double">
                        {noteName}
                      </span>
                      &#34; note.
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
                  {/* {noteList[0] && (
                    <>
                      <p className=" text-neutral-400 text-sm mt-4">
                        Note: Deleting the following note(s):
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
                  )} */}
                  <hr className="text-neutral-300" />
                  <Button
                    title="delete note"
                    tip={"Delete the note."}
                    callBack={() => deleteFolderDB(path)}
                    style={5}
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
