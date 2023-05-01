import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { db } from "../lib/firebase";
import { ref, set } from "firebase/database";
import Image from "next/image";
import icon_correct from "../assets/images/icons/check.png";
import icon_wrong from "../assets/images/icons/cross.png";
import { allFolderNames } from "../lib/helperFunctions";
import toast, { Toaster } from "react-hot-toast";
import icon_create_folder from "../assets/images/icons/subfolder.png";

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function CreateNoteFolder({ db_json, parent_name = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const [check_empty, setCheck_empty] = useState(false);
  const [check_dot, setCheck_dot] = useState(true);
  const [check_pound, setCheck_pound] = useState(true);
  const [check_percent, setCheck_percent] = useState(true);
  const [check_dollar, setCheck_dollar] = useState(true);
  const [check_sbleft, setCheck_sbleft] = useState(true);
  const [check_sbright, setCheck_sbright] = useState(true);
  const [check_name, setCheck_name] = useState(true);

  const [namesListFolder, setNamesListFolder] = useState(
    allFolderNames(db_json).sort()
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    // create array with all folder names from json
    setNamesListFolder(allFolderNames(db_json).sort());
    // set folderName back to an empty sting when Modal opens
    setFolderName("");
    // set description back to an empty sting when Modal opens
    setDescription("");
    // set path to image icon back to an empty sting when Modal opens
    setIcon("");
    // set empty sting check back to false which can be true from the
    // previous value
    setCheck_empty(false);
  }

  // const handleChange = (e: { target: { name: any; value: any } }) => {
  //   setInput((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  //   console.log(input.icon);
  // };

  function checkFolderName(name) {
    // set folder name, is also used to update output field
    setFolderName(name);
    // check if string is empty
    setCheck_empty(name ? true : false);
    // check if string contains "."
    setCheck_dot(name.search(/\./) === -1 ? true : false);
    // check if string contains "#"
    setCheck_pound(name.search(/\#/) === -1 ? true : false);
    // check if string contains "$"
    setCheck_dollar(name.search(/\$/) === -1 ? true : false);
    // check if string contains "%"
    setCheck_percent(name.search(/\%/) === -1 ? true : false);
    // check if string contains "["
    setCheck_sbleft(name.search(/\[/) === -1 ? true : false);
    // check if string contains "]"
    setCheck_sbright(name.search(/\]/) === -1 ? true : false);
    // check if a folder already exist with the same name in upper and lower case
    setCheck_name(
      !namesListFolder.map((x) => x.toLowerCase()).includes(name.toLowerCase())
    );
  }

  function createFolderDB(parent_name = "") {
    parent_name = parent_name ? parent_name + "/SubFolder/" : "";
    // set(ref(db, "markdown_note_index/" + parent_name + folderName), {
    set(ref(db, `markdown_note_index/${parent_name}/${folderName}`), {
      MetaData: {
        description: description,
        icon: icon,
        title: folderName,
      },
    })
      .then(() => {
        // Data saved successfully!
        if (parent_name) {
          toast.success(
            `The folder "${folderName}" was successfully created under "${parent_name}".`,
            { duration: 4000 }
          );
        } else {
          toast.success(
            `The folder "${folderName}" was successfully created.`,
            { duration: 4000 }
          );
        }
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

  return (
    <>
      <Toaster />
      {!parent_name && (
        <Button
          title="create folder"
          tip={"Create a new folder for notes."}
          callBack={openModal}
        />
      )}
      {parent_name && (
        <Button
          title=""
          tip={`create a new subfolder for "${parent_name}"`}
          padding="pl-1 pr-1 pb-0 pt-0"
          margin="m-1"
          callBack={openModal}
          iconLeft={
            <Image
              loader={myLoader}
              src={icon_create_folder}
              alt={`icon`}
              width={20}
              height={20}
              className="inline-block"
            />
          }
        />
      )}

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
                    {!parent_name && <h3>Create folder.</h3>}
                    {parent_name && (
                      <>
                        <h3>
                          Create subfolder in &#34;
                          <span className="underline decoration-double">
                            {parent_name}
                          </span>
                          &#34;.
                        </h3>
                      </>
                    )}
                    <Button
                      style={4}
                      title={"close"}
                      tip={"close form"}
                      aria={"close login or sign-up form"}
                      callBack={closeModal}
                    />
                  </Dialog.Title>
                  <hr className="text-neutral-300" />
                  <div className="email-input mt-4 mb-4">
                    <label htmlFor="folderName" className="label-text">
                      folder name
                      <span
                        className="text-logo-red"
                        title="a value in this field is required"
                      >
                        *
                      </span>
                      :
                    </label>
                    <input
                      name="folderName"
                      placeholder=" name of the folder"
                      type="text"
                      // onChange={handleChange}
                      // value={input.folderName}
                      // onChange={(e) => setFolderName(e.target.value)}
                      onChange={(e) => checkFolderName(e.target.value)}
                      value={folderName}
                      required
                      autoComplete="true"
                      className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-1 w-full"
                    />
                    <p className=" text-neutral-400 text-sm">
                      Note: The folder name can NOT ...
                    </p>
                    <ul className=" text-neutral-400 text-sm ml-2 mb-3">
                      <li>
                        {" "}
                        <Image
                          loader={myLoader}
                          src={check_empty ? icon_correct : icon_wrong}
                          alt={`icon`}
                          width={15}
                          height={15}
                          className="inline-block mr-1"
                        />
                        be a empty string
                      </li>
                      <li>
                        <Image
                          loader={myLoader}
                          src={
                            check_dot &&
                            check_pound &&
                            check_dollar &&
                            check_percent &&
                            check_sbleft &&
                            check_sbright
                              ? icon_correct
                              : icon_wrong
                          }
                          alt={`icon`}
                          width={15}
                          height={15}
                          className="inline-block mr-1"
                        />
                        contain the character:{" "}
                        <span
                          className={`${
                            check_dot ? "bg-green-300" : "bg-red-300"
                          } w-4 inline-block text-center text-neutral-600`}
                        >
                          .
                        </span>{" "}
                        <span
                          className={`${
                            check_pound ? "bg-green-300" : "bg-red-300"
                          } w-4 inline-block text-center text-neutral-600`}
                        >
                          #
                        </span>{" "}
                        <span
                          className={`${
                            check_dollar ? "bg-green-300" : "bg-red-300"
                          } w-4 inline-block text-center text-neutral-600`}
                        >
                          $
                        </span>{" "}
                        <span
                          className={`${
                            check_percent ? "bg-green-300" : "bg-red-300"
                          } w-4 inline-block text-center text-neutral-600`}
                        >
                          %
                        </span>{" "}
                        <span
                          className={`${
                            check_sbleft ? "bg-green-300" : "bg-red-300"
                          } w-4 inline-block text-center text-neutral-600`}
                        >
                          [
                        </span>{" "}
                        <span
                          className={`${
                            check_sbright ? "bg-green-300" : "bg-red-300"
                          } w-4 inline-block text-center text-neutral-600`}
                        >
                          ]
                        </span>
                      </li>
                      <li>
                        <Image
                          loader={myLoader}
                          src={check_name ? icon_correct : icon_wrong}
                          alt={`icon`}
                          width={15}
                          height={15}
                          className="inline-block mr-1"
                        />
                        have the same name as one of the folders which already
                        exist.
                        <details className="ml-5 italic">
                          <summary>list of taken names</summary>
                          <p>
                            {namesListFolder &&
                              namesListFolder.map((folder) => (
                                <>
                                  <span
                                    key={folder}
                                    className="bg-primary-200 pl-1 pr-1 inline-block text-center"
                                  >
                                    {folder}
                                  </span>
                                  <span> , </span>
                                </>
                              ))}
                          </p>
                        </details>
                      </li>
                    </ul>
                    <label htmlFor="description" className="label-text">
                      folder description:
                    </label>
                    <textarea
                      name="description"
                      placeholder=" describe what kind of notes the folder will hold"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      required
                      autoComplete="true"
                      className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-3 w-full"
                      rows={4}
                      cols={30}
                    ></textarea>
                    <label htmlFor="icon" className="label-text">
                      Icon url:
                    </label>
                    <input
                      name="icon"
                      placeholder=" url to icon image"
                      type="text"
                      onChange={(e) => setIcon(e.target.value)}
                      value={icon}
                      autoComplete="true"
                      className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-3 w-full"
                    />
                  </div>
                  <hr className="text-neutral-300" />
                  <Button
                    title="create folder"
                    style={7}
                    tip={"Create a new folder for notes."}
                    callBack={() => createFolderDB(parent_name)}
                    disable={
                      check_empty &&
                      check_dot &&
                      check_pound &&
                      check_dollar &&
                      check_percent &&
                      check_sbleft &&
                      check_sbright &&
                      check_name
                        ? false
                        : true
                    }
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
