import { useRouter } from "next/router";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark, okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import {
  getStorage,
  ref,
  getDownloadURL,
  getBlob,
  getBytes,
} from "firebase/storage";
import Image from "next/image";
import matter from "gray-matter";
// import { bali_Ref } from "../../assets/images/background/paper_background.webp";
import bg_paper from "../../assets/images/background/paper_background.webp";
import image_pin from "../../assets/images/background/pin.webp";
import { storage, fs_ref } from "../../lib/firebase";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { TbFileDownload } from "react-icons/tb";
import { GoMarkdown } from "react-icons/go";
import { IconContext } from "react-icons";

// export async function getStaticProps(context) {
//   // get and save the url link to the markdown document in firebase
//   const md_link = await getDownloadURL(bali_Ref);
//   // fetch the data from the firebase link
//   const res = await fetch(md_link);
//   // convert data into blob (text/markdown)
//   const blob = await res.blob();
//   // save the text which is contained in the blob
//   let md_text = await blob.text();
//   // split the markdown body from the frontmatter
//   const md_data = matter(md_text);

//   return {
//     props: {
//       frontmatter: md_data.data,
//       markdownBody: md_data.content,
//     },
//   };
// }

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function SubNote() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState({ data: false, content: false });
  const [markdownTextFile, setMarkdownTextFile] = useState(false);
  const [isLoading, setLoading] = useState(null);
  // console.log(slug ? slug[0] : "wait");
  // const slug = (router.query.slug as string[]) || []

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
    setLoading(true);
    if (slug) {
      if (slug.length === 2 || slug.length === 3) {
        getDownloadURL(markdownRef(slug))
          .then((url) => {
            // console.log(`url : ${url}`);
            fetch(url).then((res) => {
              // console.log(`res : ${res}`);
              res.blob().then((blob) => {
                // console.log(`blob : ${blob}`);
                blob.text().then((md_text) => {
                  setMarkdownTextFile(md_text);
                  // console.log(`md_text : ${md_text}`);
                  // let md_data = matter(md_text);
                  setData(matter(md_text));
                  data.data
                    ? setLoading(false)
                    : console.log("loading data ...");
                  // data.data
                  //   ? console.log(`data : ${data.data["title"]}`)
                  //   : false;
                  // console.log(`content : ${data.content}`);
                  // convert the number from the matter function to the correct format
                  if (data.data.timeToRead) {
                    data.data.timeToRead = convert_timeToRead(
                      data.data.timeToRead
                    );
                  }
                  console.log("I am still running");
                });
              });
            });
          })
          .catch((error) => {
            console.log(`not such file in file storage: ${error}`);
          });
      }
    }
  }, [slug, data.data]);

  /**
   * Returns the markdown file reference from the "firebase storage".
   * If the slug has only 2 or 3 elements otherwise "false" is returned.
   * @param {*} slug
   * @returns markdown ref if 2 or 3 slugs after "notes" otherwise false
   */
  function markdownRef(slug) {
    if (slug.length === 2) {
      return ref(storage, `notes_markdown/${slug[0]}/${slug[1]}.md`);
    }
    if (slug.length === 3) {
      return ref(storage, `notes_markdown/${slug[0]}/${slug[1]}/${slug[2]}.md`);
    }
    return false;
  }

  /**
   * create a downloadable markdown file.
   * https://www.tutorialspoint.com/how-to-create-and-save-text-file-in-javascript
   */
  function createMdURL() {
    const link = document.createElement("a");
    const file = new Blob([markdownTextFile], { type: "text/markdown" });
    link.href = URL.createObjectURL(file);
    link.download = `${data.data.title}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <>
      {/* <h1>Hello from test sub</h1> */}
      {/* {slug[0]} */}
      {/* <p>slug note name: {slug[1] ? "true" : "false"}</p> */}
      {/* {slug ? <p>{`The name of the 1st slug is: ${slug[0]}`} </p> : false}
      {slug ? <p>{`The name of the 2nd slug is: ${slug[1]}`} </p> : false}
      {slug ? <p>{`The name of the 3rd slug is: ${slug[2]}`} </p> : false} */}
      {/* {slug ? slug[1] : false && <p>The name of the 2nd slug is: {slug[1]}</p>}
      {slug ? slug[2] : false && <p>The name of the 3rd slug is: {slug[2]}</p>} */}
      <main className="bg-gradient-to-bl from-indigo-100 via-green-100 to-primary-100 max-w-[800px] m-auto">
        <div className="text-logo-red mb-4 pb-4 relative">
          <Image
            alt="paper background image"
            src={bg_paper}
            placeholder="blur"
            quality={100}
            fill
            // sizes="100vw"
            // style={{
            //   objectFit: "cover",
            // }}
            className="object-fill opacity-100"
          />
          {/* title */}
          {data.data.title && (
            <div className=" mt-2 grid grid-cols-12 md:grid-cols-8">
              <span className="text-right col-span-3 md:col-span-1 text-logo-blue text-xs self-end mb-2 z-10">
                note :
              </span>
              <h1 className="col-span-9 md:col-span-6 md:text-center z-10 ml-2 font-audiowide text-xl sm:text-3xl md:text-4xl text-logo-red my-1">
                <div className="bg-primary-100/20 px-1 rounded-xl inline-block">
                  {data.data.title}
                </div>
              </h1>
            </div>
          )}
          {/* description */}
          {data.data.description && (
            <div className="flex flex-col items-center">
              <hr className="bg-logo-blue text-logo-blue opacity-10 mt-1 h-[2px] w-9/12 z-10" />
              <hr className="bg-logo-blue text-logo-blue opacity-20 mt-1 h-[2px] w-10/12 z-10" />
              <hr className="bg-logo-blue text-logo-blue opacity-25 mt-1 mb-2 h-[2px] w-11/12 z-10" />
              <p className="text-center italic opacity-90 mx-2 z-10 bg-primary-100/20 px-1 rounded-xl">
                {data.data.description}
              </p>
              <hr className="bg-logo-blue text-logo-blue opacity-25 mt-2 h-[2px] w-11/12 z-10" />
              <hr className="bg-logo-blue text-logo-blue opacity-20 mt-1 h-[2px] w-10/12 z-10" />
              <hr className="bg-logo-blue text-logo-blue opacity-10 mt-1 mb-2 h-[2px] w-9/12 z-10" />
            </div>
          )}
          {/* container for the "Meta div" and the "hero image div" */}
          <div className="flex flex-col md:flex-row md:mt-4">
            {/* "Meta div" */}
            <div className=" w-full grid grid-cols-12 h-fit pt-2 pb-4">
              {/* author */}
              {data.data.author && (
                <>
                  <span className="col-start-1 col-end-4 text-right text-logo-blue text-xs opacity-80 self-end">
                    author :
                  </span>
                  {/* <div className="col-start-4 col-end-13 sm:col-end-10 flex items-baseline font-audiowide text-sm self-end"> */}
                  <div className="col-start-4 col-end-13 sm:col-end-10 sm:text-center md:col-end-13 font-audiowide text-sm self-end">
                    {data.data.author_image && (
                      // author image if exists
                      <Image
                        src={data.data.author_image}
                        alt={`image of the author ${data.data.author}`}
                        width={25}
                        height={25}
                        className="rounded-full my-1 ml-2 mr-2 inline-block"
                      />
                    )}
                    <span className="ml-2 opacity-70 bg-primary-100/20 px-1 rounded-xl">
                      {" "}
                      {data.data.author}
                    </span>
                  </div>
                </>
              )}
              {/* created  */}
              {data.data.created && (
                <>
                  <span className="col-start-1 col-end-4 text-right text-logo-blue text-xs self-end opacity-70">
                    created :
                  </span>
                  <span className="col-start-4 col-end-13 sm:col-end-10 sm:text-center md:col-end-13 ml-2 text-xs opacity-70 self-end">
                    <div className="bg-primary-100/20 px-1 rounded-xl inline-block">
                      {data.data.created}
                    </div>
                  </span>
                </>
              )}
              {/* updated  */}
              {data.data.updated && data.data.updated !== data.data.created && (
                <>
                  <span className="col-start-1 col-end-4 text-right text-logo-blue text-xs self-end opacity-60">
                    updated :
                  </span>
                  <span className="col-start-4 col-end-13 sm:col-end-10 sm:text-center md:col-end-13  ml-2 text-xs opacity-60 self-end">
                    {" "}
                    <div className="bg-primary-100/20 px-1 rounded-xl inline-block">
                      {data.data.updated}
                    </div>
                  </span>
                </>
              )}
              {/* words  */}
              {data.data.words && (
                <>
                  <span className="col-start-1 col-end-4 text-right text-logo-blue text-xs self-end opacity-50">
                    words :
                  </span>
                  <span className="col-start-4 col-end-13 sm:col-end-10 sm:text-center md:col-end-13  ml-2 text-xs opacity-50 self-end">
                    {" "}
                    <div className="bg-primary-100/20 px-1 rounded-xl inline-block">
                      {data.data.words}
                    </div>
                  </span>
                </>
              )}
              {/* time to read  */}
              {data.data.timeToRead && (
                <>
                  <span className="col-start-1 col-end-4 text-right text-logo-blue text-xs self-end opacity-40">
                    time :
                  </span>
                  <span className="col-start-4 col-end-13 sm:col-end-10 sm:text-center md:col-end-13  ml-2 text-xs opacity-50 self-end ">
                    {" "}
                    <div className="bg-primary-100/30 px-1 rounded-xl inline-block">
                      {data.data.timeToRead}min
                    </div>
                  </span>
                </>
              )}
            </div>
            {/* hero image */}
            {data.data.hero_image && (
              // "hero image div"
              <div className=" w-full flex justify-center md:justify-start py-2">
                <div className="w-[240px] h-[200px] relative ml-4">
                  <Image
                    src={data.data.hero_image}
                    alt={`random image`}
                    // width={300}
                    // height={200}
                    fill
                    className="object-cover origin-top-left saturate-200 border-[#fff] border-2 border-b-[20px] rotate-3 hover:rotate-6 transition ease-in-out duration-300"
                  />
                  <Image
                    src={image_pin}
                    alt={`random image`}
                    width={25}
                    height={25}
                    // fill
                    className="absolute -top-[20px] left-[5px]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* download markdown button */}
        {data.data.title && (
          <div className="flex justify-center">
            <Button
              callBack={() => createMdURL()}
              title="download markdown file"
              tip="download markdown file to your local computer"
              iconLeft={
                <IconContext.Provider
                  value={{ className: "text-2xl inline mr-2" }}
                >
                  <GoMarkdown />
                </IconContext.Provider>
              }
              iconRight={
                <IconContext.Provider
                  value={{ className: "text-2xl inline ml-2" }}
                >
                  <TbFileDownload />
                </IconContext.Provider>
              }
            />
          </div>
        )}

        {data.content && (
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={data.content}
            remarkPlugins={[remarkGfm]}
            className="markdown-view p-2"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    // style={okaidia}
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
        )}
      </main>
    </>
  );
}
