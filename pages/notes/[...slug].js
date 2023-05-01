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
import { storage, fs_ref } from "../../lib/firebase";
import { useEffect, useState } from "react";

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
  const [isLoading, setLoading] = useState(null);
  // console.log(slug ? slug[0] : "wait");
  // const slug = (router.query.slug as string[]) || []

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
      <main className="bg-gradient-to-bl from-indigo-100 via-green-100 to-primary-100">
        <div className="flex flex-col items-center text-logo-red mb-4 pb-2 relative">
          <Image
            alt="Mountains"
            src={bg_paper}
            placeholder="blur"
            quality={100}
            fill
            // sizes="100vw"
            // style={{
            //   objectFit: "cover",
            // }}
            className="object-fill opacity-30"
          />
          {/* title */}
          {data.data.title && (
            <div className="border-b-[1px] border-neutral-400 grid grid-cols-5 w-full">
              <span className="text-right text-logo-blue text-xs self-end mb-2">
                Note :
              </span>
              <h1 className="col-span-4 ml-2 font-audiowide text-xl text-logo-red my-1">
                {data.data.title}
              </h1>
            </div>
          )}
          {/* description */}
          {data.data.description && (
            <p className="border-b-[1px] border-neutral-400 w-full text-center italic opacity-90">
              {data.data.description}
            </p>
          )}
          {/* author */}
          {data.data.author && (
            <div className=" grid grid-cols-5 w-full">
              <span className="text-right text-logo-blue text-xs self-end opacity-80">
                author :
              </span>
              <div className="col-span-3 flex items-baseline font-audiowide font-thin">
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
                <span className="ml-2 opacity-80"> {data.data.author}</span>
              </div>
            </div>
          )}
          {/* created  */}
          {data.data.created && (
            <div className=" grid grid-cols-5 w-full">
              <span className="text-right text-logo-blue text-xs self-end opacity-70">
                created :
              </span>
              <span className="col-span-4 ml-2 text-xs opacity-70">
                {" "}
                {data.data.created}
              </span>
            </div>
          )}
          {/* updated  */}
          {data.data.updated && (
            <div className=" grid grid-cols-5 w-full">
              <span className="text-right text-logo-blue text-xs self-end opacity-60">
                updated :
              </span>
              <span className="col-span-4 ml-2 text-xs opacity-60">
                {" "}
                {data.data.updated}
              </span>
            </div>
          )}
          {/* words  */}
          {data.data.words && (
            <div className=" grid grid-cols-5 w-full">
              <span className="text-right text-logo-blue text-xs self-end opacity-50">
                words :
              </span>
              <span className="col-span-4 ml-2 text-xs opacity-50">
                {" "}
                {data.data.words}
              </span>
            </div>
          )}
          {/* time to read  */}
          {data.data.timeToRead && (
            <div className=" grid grid-cols-5 w-full">
              <span className="text-right text-logo-blue text-xs self-end opacity-40">
                time to read :
              </span>
              <span className="col-span-4 ml-2 text-xs opacity-40">
                {" "}
                {data.data.timeToRead}
              </span>
            </div>
          )}
          {/* hero image */}
          {data.data.hero_image && (
            <div className="w-[300px] h-[200px] relative my-1">
              <Image
                src={data.data.hero_image}
                alt={`random image`}
                // width={300}
                // height={200}
                fill
                className="object-fill saturate-200"
              />
            </div>
          )}
        </div>
        {data.content && (
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={data.content}
            remarkPlugins={[remarkGfm]}
            className="markdown-view"
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
