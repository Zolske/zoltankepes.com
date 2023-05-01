import { useRouter } from "next/router";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  getStorage,
  ref,
  getDownloadURL,
  getBlob,
  getBytes,
} from "firebase/storage";
import Image from "next/image";
import matter from "gray-matter";
import { bali_Ref } from "../../lib/firebase";
import { storage, fs_ref } from "../../lib/firebase";
import { useEffect, useState } from "react";

import remarkGfm from "remark-gfm";

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

export default function SubNote() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // console.log(slug ? slug[0] : "wait");
  // const slug = (router.query.slug as string[]) || []

  useEffect(() => {
    setLoading(true);
    // console.log("async")
    // only run function if slug is true, if dose not work
    // slug ? console.log(slug) : false;
    // slug ? console.log(markdownRef(slug)) : false;
    // return () => {
    //   connection.disconnect();
    // };
    slug
      ? getDownloadURL(markdownRef(slug))
          .then((url) => {
            console.log(`url : ${url}`);
            fetch(url).then((res) => {
              // console.log(`res : ${res}`);
              res.blob().then((blob) => {
                // console.log(`blob : ${blob}`);
                blob.text().then((md_text) => {
                  // console.log(`md_text : ${md_text}`);
                  // let md_data = matter(md_text);
                  setData(matter(md_text));
                  setLoading(false);
                  // console.log(`data : ${md_data.data}`);
                  // console.log(`content : ${md_data.content}`);
                });
              });
            });
          })
          .catch((error) => {
            console.log(`fuck ${error}`);
            // md_data.data = false;
            // md_data.content = false;
          })
      : console.log("waiting for slug");
  }, [slug]);

  /**
   * Returns the markdown file reference from the "firebase storage".
   * If the slug has only 2 or 3 elements otherwise "false" is returned.
   * @param {*} slug
   * @returns markdown ref if 2 or 3 slugs after "notes" otherwise false
   */
  function markdownRef(slug) {
    if (!slug[2]) {
      return ref(storage, `notes_markdown/${slug[0]}/${slug[1]}.md`);
    }
    if (slug[2] && !slug[3]) {
      return ref(storage, `notes_markdown/${slug[0]}/${slug[1]}/${slug[2]}.md`);
    }
    return false;
  }

  return (
    <>
      <h1>Hello from test sub</h1>
      {/* {slug[0]} */}
      {/* <p>slug note name: {slug[1] ? "true" : "false"}</p> */}
      {slug ? <p>{`The name of the 1st slug is: ${slug[0]}`} </p> : false}
      {slug ? <p>{`The name of the 2nd slug is: ${slug[1]}`} </p> : false}
      {slug ? <p>{`The name of the 3rd slug is: ${slug[2]}`} </p> : false}
      {/* {slug ? slug[1] : false && <p>The name of the 2nd slug is: {slug[1]}</p>}
      {slug ? slug[2] : false && <p>The name of the 3rd slug is: {slug[2]}</p>} */}
    </>
  );
}
