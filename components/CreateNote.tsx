import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { db, storage } from "../lib/firebase";
import { ref, set } from "firebase/database";
// "realtime database", change ref to alias to avoid conflict with other refs
import { uploadBytes, ref as rt_ref } from "firebase/storage";
import Image from "next/image";
import icon_correct from "../assets/images/icons/check.png";
import icon_wrong from "../assets/images/icons/cross.png";
import { allNoteNames } from "../lib/helperFunctions";
import toast, { Toaster } from "react-hot-toast";
import icon_create_note from "../assets/images/icons/create_file.png";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function CreateNote({
  path,
  pathFileStorage,
  db_json,
  folderName,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [noteName, setNoteName] = useState("");
  const [description, setDescription] = useState("");
  const [hero, setHero] = useState("https://picsum.photos/200/300");
  const [author, setAuthor] = useState("");
  const [markdownText, setMarkdownText] = useState("");

  let created;
  let updated;
  let words;
  let timeToRead;

  const [check_empty, setCheck_empty] = useState(false);
  const [check_dot, setCheck_dot] = useState(true);
  const [check_pound, setCheck_pound] = useState(true);
  const [check_dollar, setCheck_dollar] = useState(true);
  const [check_percent, setCheck_percent] = useState(true);
  const [check_sbleft, setCheck_sbleft] = useState(true);
  const [check_sbright, setCheck_sbright] = useState(true);
  const [check_name, setCheck_name] = useState(true);

  const [namesListNotes, setNamesListNotes] = useState(
    allNoteNames(db_json).sort()
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    // create array with all folder names from json
    setNamesListNotes(allNoteNames(db_json).sort());
    // set noteName back to an empty sting when Modal opens
    setNoteName("");
    // set the name of the author back to an empty string
    setAuthor("");
    // set description back to an empty sting when Modal opens
    setDescription("");
    // set path to image icon back to an empty sting when Modal opens
    setHero("");
    // set empty sting check back to false which can be true from the
    // previous value
    setCheck_empty(false);
    // console.log(pathFileStorage);
  }

  function checkNoteName(name) {
    // set folder name, is also used to update output field
    setNoteName(name);
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
    // check if a note already exist with the same name in upper and lower case
    setCheck_name(
      !namesListNotes.map((x) => x.toLowerCase()).includes(name.toLowerCase())
    );
  }

  function addMetaData() {
    const nowDate = new Date();
    let nowDateString = nowDate.toUTCString();

    let metaText = "---\n";
    if (noteName) {
      metaText = metaText.concat(`title: ${noteName}\n`);
    }
    if (author) {
      metaText = metaText.concat(`author: ${author}\n`);
    }
    if (description) {
      metaText = metaText.concat(`description: ${description}\n`);
    }
    if (hero) {
      metaText = metaText.concat(`hero_image: ${hero}\n`);
    } else {
      metaText = metaText.concat(`hero_image: https://picsum.photos/200/300\n`);
    }
    if (created) {
      metaText = metaText.concat(`created: ${created}\n`);
    } else {
      metaText = metaText.concat(`created: ${nowDateString}\n`);
      created = nowDateString;
    }

    metaText = metaText.concat(`updated: ${nowDateString}\n`);
    updated = nowDateString;

    if (markdownText) {
      const spacesCount = markdownText.split(" ").length - 1;
      metaText = metaText.concat(`words: ${spacesCount}\n`);
      words = spacesCount;
      const min = Math.trunc(spacesCount / 200);
      let sec = (((spacesCount / 200) % 1) * 0.6).toFixed(2);
      let secNum = parseFloat(sec) * 100;
      metaText = metaText.concat(`timeToRead: ${min}:${secNum}\n`);
      timeToRead = `${min}:${secNum}`;
    }
    metaText = metaText.concat(`---\n`);
    metaText = metaText.concat(markdownText);
    return Promise.resolve(metaText);
  }

  function createMarkdownInCloud(markdownMeta) {
    // Create a reference to the file to delete
    const storageRef = rt_ref(
      storage,
      "notes_markdown/" + pathFileStorage + "/" + noteName + ".md"
    );
    // Create a blog object with the file content which you want to add to the file
    const blob = new Blob([markdownMeta], { type: "text/markdown" });
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
      // Data saved successfully!
      toast.success(
        `The note "${noteName}" was successfully uploaded to the "firebase file storage".`,
        {
          duration: 4000,
        }
      );
    });
    return Promise.resolve("Ok");
  }

  function createNoteDB(path) {
    set(ref(db, `markdown_note_index/${path}/${noteName}`), {
      MetaData: {
        description: description,
        author: author,
        title: noteName,
        created: created,
        updated: updated,
        words: words,
        "time to read": timeToRead,
      },
    })
      .then(() => {
        // Data saved successfully!
        toast.success(
          `The note "${noteName}" was successfully created under "${folderName}".`,
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

  async function sendData() {
    // calls all 3 main functions in the correct order when the "create note" button is clicked
    addMetaData()
      .then((markdownMeta) => createMarkdownInCloud(markdownMeta))
      .then(() => createNoteDB(path));
  }

  return (
    <>
      <Toaster />
      <Button
        title=""
        tip={`create a note`}
        padding="pl-1 pr-1 pb-0 pt-0"
        margin="m-1"
        callBack={openModal}
        iconLeft={
          <Image
            loader={myLoader}
            src={icon_create_note}
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

          <div className="fixed top-1 overflow-y-auto w-full h-screen">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full sm:w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all bg-[#fff]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                    <h3>Create a note under &#34;{pathFileStorage}&#34;.</h3>

                    <Button
                      style={4}
                      title={"close"}
                      tip={"close form"}
                      aria={"close login or sign-up form"}
                      callBack={closeModal}
                    />
                  </Dialog.Title>
                  <hr className="text-neutral-300" />
                  <details open>
                    <summary>Meta Data</summary>
                    <div className="email-input mt-4 mb-4">
                      <label htmlFor="noteName" className="label-text">
                        name
                        <span
                          className="text-logo-red"
                          title="a value in this field is required"
                        >
                          *
                        </span>
                        :
                      </label>
                      <input
                        name="noteName"
                        placeholder=" name of the note"
                        type="text"
                        onChange={(e) => checkNoteName(e.target.value)}
                        value={noteName}
                        required
                        autoComplete="true"
                        className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-1 w-full"
                      />
                      <p className=" text-neutral-400 text-sm">
                        Note: The note name can NOT ...
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
                          contain the character:{"  "}
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
                          have the same name as one of the notes which already
                          exist.
                          <details className="ml-5 italic">
                            <summary>list of taken names</summary>
                            <p>
                              {namesListNotes &&
                                namesListNotes.map((note) => (
                                  <>
                                    <span
                                      key={note}
                                      className="bg-primary-200 pl-1 pr-1 inline-block text-center"
                                    >
                                      {note}
                                    </span>
                                    <span> , </span>
                                  </>
                                ))}
                            </p>
                          </details>
                        </li>
                      </ul>
                      {/* note author */}
                      <label htmlFor="author" className="label-text">
                        author:
                      </label>
                      <input
                        name="author"
                        placeholder=" name of the author"
                        type="text"
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                        autoComplete="true"
                        className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-3 w-full"
                      />
                      {/* >>> note description */}
                      <label htmlFor="description" className="label-text">
                        description:
                      </label>
                      <textarea
                        name="description"
                        placeholder=" describe what the note is about"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        autoComplete="true"
                        className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-3 w-full"
                        rows={4}
                        cols={30}
                      ></textarea>
                      <label htmlFor="hero" className="label-text">
                        hero image url:
                      </label>
                      <input
                        name="hero"
                        placeholder=" https://picsum.photos/200/300"
                        type="text"
                        onChange={(e) => setHero(e.target.value)}
                        value={hero}
                        autoComplete="true"
                        className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-3 w-full"
                      />
                    </div>
                  </details>
                  <hr className="text-neutral-300" />
                  {/* >>> markdown note text */}
                  <details open>
                    <summary>Markdown</summary>
                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                      <div>
                        <label htmlFor="markdown" className="label-text">
                          <h3>Markdown Editor:</h3>
                        </label>
                        <textarea
                          name="markdown"
                          placeholder=" write markdown"
                          onChange={(e) => setMarkdownText(e.target.value)}
                          value={markdownText}
                          required
                          autoComplete="true"
                          className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-3 w-full"
                          rows={31}
                          cols={30}
                        ></textarea>
                      </div>
                      <div>
                        <h3 className="label-text">Markdown Preview:</h3>
                        <div className="markdown-container">
                          <ReactMarkdown
                            // eslint-disable-next-line react/no-children-prop
                            children={markdownText}
                            remarkPlugins={[remarkGfm]}
                            className="markdown-view"
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    {...props}
                                    // eslint-disable-next-line react/no-children-prop
                                    children={String(children).replace(
                                      /\n$/,
                                      ""
                                    )}
                                    // style={}
                                    language={match[1]}
                                    PreTag="div"
                                    showLineNumbers
                                  />
                                ) : (
                                  <code {...props} className={className}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          />
                          ,
                        </div>
                      </div>
                    </div>
                  </details>
                  <hr className="text-neutral-300" />
                  <Button
                    title="create note"
                    style={7}
                    tip={"Create a new note."}
                    callBack={() => sendData()}
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
