import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect, Fragment, useState, useRef } from "react";
import { db, storage } from "../lib/firebase";
import { ref, set } from "firebase/database";
// "file storage database", change ref to alias (fs_ref) to avoid conflict with other refs
import {
  uploadBytes,
  getStorage,
  getDownloadURL,
  getBlob,
  getBytes,
  ref as fs_ref,
} from "firebase/storage";
import Image from "next/image";
import icon_correct from "../assets/images/icons/check.png";
import icon_wrong from "../assets/images/icons/cross.png";
import { allNoteNames } from "../lib/helperFunctions";
import toast, { Toaster } from "react-hot-toast";
import icon_update_note from "../assets/images/icons/update_note.png";
import { handleHeadingId } from "@/lib/helperFunctions";
import MarkdownGuide from "./MarkdownGuide";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import matter from "gray-matter";
import { title } from "process";

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function UpdateNote({
  path,
  pathFileStorage,
  db_array,
  noteName,
}) {
  const [data, setData] = useState({ data: "", content: "" });
  const [markdownTextFile, setMarkdownTextFile] = useState("");

  const [markdownText, setMarkdownText] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaAuthor, setMetaAuthor] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaHero, setMetaHero] = useState("");
  const [metaCreated, setMetaCreated] = useState("");
  const [metaUpdated, setMetaUpdated] = useState("");
  const [metaWords, setMetaWords] = useState("");
  const [metaTimeToRead, setMetaTimeToRead] = useState("");

  let created = useRef("");
  let updated;
  let words;
  let timeToRead;

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setMarkdownText("");
    setMetaTitle("");
    setMetaAuthor("");
    setMetaDescription("");
    setMetaHero("");
    setMetaCreated("");
    setMetaUpdated("");
    setMetaWords("");
    setMetaTimeToRead("");
  }

  function openModal() {
    setIsOpen(true);
  }

  /**
   * Convert number to string if input is a number.
   * E.g. 197 is converted to 3:17 if 197 is a number.
   * @param number
   * @returns
   */
  function convert_timeToRead(number) {
    if (typeof number === "number") {
      let seconds = (number % 60).toString();
      let minutes = parseInt((number / 60).toString()).toString();
      return `${minutes}:${seconds}`;
    }
    return number;
  }

  useEffect(() => {
    const fs_path = fs_ref(storage, `notes_markdown/${noteName}.md`);
    getDownloadURL(fs_path)
      .then((url) => {
        fetch(url).then((res) => {
          res.blob().then((blob) => {
            blob.text().then((md_text) => {
              let md_data = matter(md_text);
              setMarkdownText(md_data.content);
              setMetaTitle(md_data.data.title);
              setMetaAuthor(md_data.data.author);
              setMetaDescription(md_data.data.description);
              setMetaHero(md_data.data.hero_image);
              created.current = md_data.data.created;
              setMetaUpdated(md_data.data.updated);
              setMetaWords(md_data.data.words);
              setMetaTimeToRead(convert_timeToRead(md_data.data.timeToRead));
              // console.log(`
              // title: ${metaTitle}
              // Author: ${metaAuthor}
              // Description: ${metaDescription}
              // Hero: ${metaHero}
              // Created: ${metaCreated}
              // Updated: ${metaUpdated}
              // Words: ${metaWords}
              // TimeToRead: ${metaTimeToRead}
              // `);
              console.log("I am still running");
            });
          });
        });
      })
      .catch((error) => {
        console.log(`not such file in file storage: ${error}`);
      });
  }, [isOpen, noteName]);

  function addMetaData() {
    const nowDate = new Date();
    let nowDateString = nowDate.toUTCString();

    let metaText = "---\n";
    if (noteName) {
      metaText = metaText.concat(`title: ${noteName}\n`);
    }
    if (metaAuthor) {
      metaText = metaText.concat(`author: ${metaAuthor}\n`);
    }
    if (metaDescription) {
      metaText = metaText.concat(`description: ${metaDescription}\n`);
    }
    if (metaHero) {
      metaText = metaText.concat(`hero_image: ${metaHero}\n`);
    }
    if (created.current) {
      metaText = metaText.concat(`created: ${created.current}\n`);
    } else {
      metaText = metaText.concat(`created: ${nowDateString}\n`);
      created.current = nowDateString;
    }

    metaText = metaText.concat(`updated: ${nowDateString}\n`);
    updated = nowDateString;

    if (markdownText) {
      const spacesCount = markdownText.split(" ").length - 1;
      metaText = metaText.concat(`words: ${spacesCount}\n`);
      words = spacesCount;
      let min = Math.trunc(spacesCount / 200);
      let minStr = min.toString();
      let sec = (((spacesCount / 200) % 1) * 0.6).toFixed(2);
      let secNum = parseFloat(sec) * 100;
      let secStr = secNum.toString();
      metaText = metaText.concat(`timeToRead: ${minStr}:${secStr}\n`);
      timeToRead = `${minStr}:${secStr}`;
    }
    metaText = metaText.concat(`---\n`);
    metaText = metaText.concat(markdownText);
    return Promise.resolve(metaText);
  }

  function createMarkdownInCloud(markdownMeta) {
    // Create a reference to the file to delete
    const storageRef = fs_ref(storage, `notes_markdown/${noteName}.md`);
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
        description: metaDescription,
        author: metaAuthor,
        title: noteName,
        created: created.current,
        updated: updated,
        words: words,
        "time to read": timeToRead,
      },
    })
      .then(() => {
        // Data updated successfully!
        toast.success(
          `The note "${noteName}" was successfully updated under "${pathFileStorage}".`,
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
        tip={`update a note`}
        padding="pl-1 pr-1 pb-0 pt-0"
        margin="m-1"
        callBack={openModal}
        iconLeft={
          <Image
            loader={myLoader}
            src={icon_update_note}
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
                    Update the note &#34;{noteName}
                    &#34;.
                    <Button
                      style={4}
                      title={"close"}
                      tip={"close form"}
                      aria={"close login or sign-up form"}
                      callBack={closeModal}
                    />
                  </Dialog.Title>
                  <hr className="text-neutral-300" />
                  <details>
                    <summary>Meta Data</summary>
                    <div className="email-input mt-4 mb-4">
                      {/* note author */}
                      <label htmlFor="author" className="label-text">
                        author:
                      </label>
                      <input
                        name="author"
                        placeholder=" name of the author"
                        type="text"
                        onChange={(e) => setMetaAuthor(e.target.value)}
                        value={metaAuthor}
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
                        onChange={(e) => setMetaDescription(e.target.value)}
                        value={metaDescription}
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
                        onChange={(e) => setMetaHero(e.target.value)}
                        value={metaHero}
                        autoComplete="true"
                        className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder mb-3 w-full"
                      />
                    </div>
                  </details>
                  <hr className="text-neutral-300" />
                  {/* guide how to use markdown */}
                  <MarkdownGuide />
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
                          onChange={(e) => {
                            setMarkdownText(e.target.value);
                            handleHeadingId();
                          }}
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
                        <div
                          className="markdown-container"
                          onClick={() => handleHeadingId()}
                        >
                          <ReactMarkdown
                            // eslint-disable-next-line react/no-children-prop
                            children={markdownText}
                            remarkPlugins={[remarkGfm]}
                            className="markdown-view js-md"
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
                        </div>
                      </div>
                    </div>
                  </details>
                  <hr className="text-neutral-300" />
                  <Button
                    title="update note"
                    style={7}
                    tip={"Update note."}
                    callBack={() => sendData()}
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
