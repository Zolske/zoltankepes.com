import Image from "next/image";
import list_sublist from "../assets/images/doc_images/markdown_guide/list_sublist.png";
import unordered_list from "../assets/images/doc_images/markdown_guide/unordered_list.png";
import task_list from "../assets/images/doc_images/markdown_guide/task_list.png";
import code_highlight from "../assets/images/doc_images/markdown_guide/code_highlight.png";
import no_code_highlight from "../assets/images/doc_images/markdown_guide/no_code_highlight.png";
import table_image from "../assets/images/doc_images/markdown_guide/table.png";

// process images from url
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function MarkdownGuide() {
  return (
    <>
      {/* >>> markdown guide */}
      <details>
        <summary>Markdown Guide</summary>
        <div className="ml-4 mb-2">
          {/* Headings IDs and links */}
          <details>
            <summary className="italic font-light hover:bg-primary-100 w-fit pr-2">
              Headings & Heading Links
            </summary>
            <div className="ml-4 mb-4 pt-2 border-t-[1px] border-neutral-300">
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={2}>Headings</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <mark>#</mark> H1<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>or</i>
                      <br></br>
                      H1<br></br>
                      <mark>=</mark>
                    </td>
                    <td>
                      <h1>H1</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <mark>##</mark> H2<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>or</i>
                      <br></br>
                      H2<br></br>
                      <mark>-</mark>
                    </td>
                    <td>
                      <h2>H2</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <mark>###</mark> H3
                    </td>
                    <td>
                      <h3>H3</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <mark>####</mark> H4
                    </td>
                    <td>
                      <h4>H4</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <mark>#####</mark> H5
                    </td>
                    <td>
                      <h5>H5</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <mark>#######</mark> H6
                    </td>
                    <td>
                      <h6>H6</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={3}>Heading Links</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                    <th>comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      # A h1 heading<br></br>
                      [link to heading](#A-h1-heading)
                    </td>
                    <td>
                      <h1>A h1 heading</h1>
                      <a>link to heading</a>
                    </td>
                    <td>
                      - works with all headings (h1-h6)<br></br>- a JavaScript
                      function adds an id to all headings
                      <br></br>
                      - empty &quot; &quot; spaces are replaced with
                      &quot;-&quot;
                      <br />- e.g. the heading &quot;2 is more&quot; can be
                      linked through &quot;2-is-more&quot;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
          {/* Emphasis */}
          <details>
            <summary className="italic font-light hover:bg-primary-100 w-fit pr-2">
              Emphasis
            </summary>
            <div className="ml-4 mb-4 pt-2 border-t-[1px] border-neutral-300">
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={2}>Emphasis</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Emphasis, aka italics, with <mark>*</mark>
                      asterisks<mark>*</mark> or <mark>_</mark>
                      underscores<mark>_</mark>.
                    </td>
                    <td>
                      Emphasis, aka italics, with <em>asterisks</em> or&nbsp;
                      <em>underscores</em>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Strong emphasis, aka bold, with <mark>**</mark>
                      asterisks<mark>**</mark> or&nbsp;
                      <mark>__</mark>underscores<mark>__</mark>.
                    </td>
                    <td>
                      Strong emphasis, aka bold, with <b>asterisks</b> or{" "}
                      <b>underscores</b>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Combined emphasis with <mark>**</mark>
                      asterisks and <mark>_</mark>underscores
                      <mark>_</mark>
                      <mark>**</mark>.
                    </td>
                    <td>
                      Combined emphasis with <b>asterisks and</b>
                      &nbsp;
                      <em>underscores</em>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Strikethrough uses two tildes. <mark>~~</mark>
                      Scratch this.<mark>~~</mark>
                    </td>
                    <td>
                      Strikethrough uses two tildes. <s>Scratch this.</s>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      &gt; Blockquotes are very handy in email to emulate reply
                      text.<br></br>
                      &gt; This line is part of the same quote.
                    </td>
                    <td>
                      <blockquote>
                        Blockquotes are very handy in email to emulate reply
                        text. This line is part of the same quote.
                      </blockquote>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
          {/* Lists */}
          <details>
            <summary className="italic font-light hover:bg-primary-100 w-fit pr-2">
              Lists
            </summary>
            <div className="ml-4 mb-4 pt-2 border-t-[1px] border-neutral-300">
              <em>
                * <mark>&#9645;</mark> stands for an <b>empty space</b>
              </em>
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={3}>Lists</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                    <th>comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      1.<mark>&#9645;</mark>First ordered list item
                      <br></br>2.
                      <mark>&#9645;</mark>Another item
                      <br></br>
                      <mark>&#9645;&#9645;&#9645;</mark>1.
                      <mark>&#9645;</mark>sublist item
                      <mark>&#9645;&#9645;</mark>
                      <br></br>
                      under sublist
                      <br></br>
                      <mark>&#9645;&#9645;&#9645;</mark>3.
                      <mark>&#9645;</mark>sublist item
                      <br></br>
                      <mark>&#9645;&#9645;&#9645;&#9645;&#9645;&#9645;</mark>
                      1.<mark>&#9645;</mark>sublist item
                      <mark>&#9645;&#9645;</mark>
                      <br></br>
                      under subsublist
                      <br></br>
                      4.<mark>&#9645;</mark>Third item
                    </td>
                    <td>
                      {" "}
                      <Image
                        loader={myLoader}
                        src={list_sublist}
                        alt={`rendered list`}
                        className="inline-block"
                      />
                    </td>
                    <td rowSpan={2}>
                      - leave <b>3 spaces at the beginning</b>
                      <br></br>of a new list item for every indentation block
                      <br></br>
                      <br></br>- every ordered sublist has to start with{" "}
                      <b>1.</b>
                      <br></br>
                      <br></br>- the following number&apos;s can be any number
                      <br></br>and will be rendered as <b>B, C, ... .</b>{" "}
                      <br></br>
                      <br></br>- leave <b>2 trailing spaces</b> after the list
                      item,
                      <br></br>if you want to continue under the previous point
                      <br></br> (<i>no number or ordered list items</i>)
                      <br></br>
                      <br></br>- for unordered list&apos;s use: <b>- + *</b>{" "}
                      <br></br>
                      <br></br>- unordered and ordered lists can be mixed
                    </td>
                  </tr>
                  <tr>
                    <td>
                      -<mark>&#9645;</mark>First unordered list item
                      <br></br>-<mark>&#9645;</mark>Second unordered list item
                      <br></br>
                      <mark>&#9645;&#9645;&#9645;</mark>-<mark>&#9645;</mark>
                      Unordered sub-list.
                      <mark>&#9645;&#9645;</mark>
                      <br></br>
                      something under
                      <br></br>
                      <mark>&#9645;&#9645;&#9645;&#9645;&#9645;&#9645;</mark>-
                      <mark>&#9645;</mark>Unordered subsub-list.
                      <br></br>
                      <mark>
                        &#9645;&#9645;&#9645;&#9645;&#9645;&#9645;&#9645;&#9645;&#9645;
                      </mark>
                      -<mark>&#9645;</mark>Unordered subsubsub-list.
                      <mark>&#9645;&#9645;</mark>
                      <br></br>
                      something under
                      <br></br>
                      <mark>&#9645;&#9645;&#9645;&#9645;&#9645;&#9645;</mark>+
                      <mark>&#9645;</mark>plus
                      <br></br>
                      <mark>&#9645;&#9645;&#9645;</mark>*<mark>&#9645;</mark>
                      star
                    </td>
                    <td>
                      <Image
                        loader={myLoader}
                        src={unordered_list}
                        alt={`unordered rendered list`}
                        className="inline-block"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      *<mark>&#9645;</mark>[x]<mark>&#9645;</mark>
                      Completed task<br></br>*<mark>&#9645;</mark>[ ]
                      <mark>&#9645;</mark>Unfinished task<br></br>
                      <mark>&#9645;&#9645;</mark>*<mark>&#9645;</mark>[x]
                      <mark>&#9645;</mark>
                      Nested task<br></br>
                    </td>
                    <td>
                      <Image
                        loader={myLoader}
                        src={task_list}
                        alt={`unordered rendered list`}
                        className="inline-block"
                      />
                    </td>
                    <td>- is only rendered correctly in gfm markdown</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
          {/* New Line & Horizontal Rule*/}
          <details>
            <summary className="italic font-light hover:bg-primary-100 w-fit pr-2">
              New Line & Horizontal Rule
            </summary>
            <div className="ml-4 mb-4 pt-2 border-t-[1px] border-neutral-300">
              <em>
                * <mark>&#9166;</mark> stands for <b>ENTER</b>
                <br></br>* <mark>&#9645;</mark> stands for an <b>empty space</b>
              </em>
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={3}>New Line</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                    <th>comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      1 something <mark>&#9166;</mark>
                      <br></br>2 something
                    </td>
                    <td>1 something&nbsp;2 something</td>
                    <td>
                      separating words with <b>ENTER</b> will NOT create a new
                      line
                    </td>
                  </tr>
                  <tr>
                    <td>
                      1 something <mark>&#9645;&#9645;&#9166;</mark>
                      <br></br>2 something
                    </td>
                    <td>
                      1 something<br></br>2 something
                    </td>
                    <td>
                      separating words with <b>two spaces</b> and <b>ENTER</b>{" "}
                      will create a new line
                    </td>
                  </tr>
                  <tr>
                    <td>
                      1 something <mark>&#9645;&#9645;&#9166;</mark>
                      <br></br>
                      <mark>&#9166;</mark>
                      <br></br>2 something
                    </td>
                    <td>
                      1 something<br></br>
                      <br></br>2 something
                    </td>
                    <td>
                      separating words with <b>two spaces</b> and{" "}
                      <b>two ENTER</b>&apos;s<br></br>will create a new line
                      with one empty line in between
                    </td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={3}>Horizontal Rule</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                    <th>comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Hyphens<br></br>
                      <mark>&#9166;</mark>
                      <br></br>
                      ---
                    </td>
                    <td rowSpan={3}>
                      <hr />
                    </td>
                    <td rowSpan={3}>
                      - make sure you leave a blank<br></br>line above the line
                      with the <b>---</b>
                      <br></br>
                      otherwise it becomes a heading
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Asterisks<br></br>
                      <mark>&#9166;</mark>
                      <br></br>
                      ***
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Underscores<br></br>
                      <mark>&#9166;</mark>
                      <br></br>
                      ___
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
          {/* Code and Syntax Highlighting */}
          <details>
            <summary className="italic font-light hover:bg-primary-100 w-fit pr-2">
              Code and Syntax Highlighting
            </summary>
            <div className="ml-4 mb-4 pt-2 border-t-[1px] border-neutral-300">
              <em>
                * <mark>`</mark> stands for an <b>back-tick</b>
              </em>
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={2}>Code and Syntax Highlighting</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Inline <mark>`</mark>code<mark>`</mark> has back-ticks
                      around it.
                    </td>
                    <td>
                      Inline <code>code</code> has back-ticks around it.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <mark>```</mark>
                      <br></br>
                      No language indicated, so no syntax highlighting.<br></br>
                      s = &quot;There is no highlighting for this.&quot;
                      <br></br>
                      <mark>```</mark>
                    </td>
                    <td>
                      <Image
                        loader={myLoader}
                        src={no_code_highlight}
                        alt={`rendered list`}
                        className="inline-block"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <mark>```</mark>javascript<br></br>
                      var s = &quot;JavaScript syntax highlighting&quot;;
                      <br></br>
                      alert(s);<br></br>
                      <mark>```</mark>
                      <br></br>
                      <br></br>
                      <mark>```</mark>python<br></br>
                      def function():<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;#indenting works just fine in the
                      fenced code block<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;s = &quot;Python syntax
                      highlighting&quot;<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;print s<br></br>
                      <mark>```</mark>
                      <br></br>
                      <br></br>
                      <mark>```</mark>ruby<br></br>
                      require &apos;redcarpet&apos;<br></br>
                      markdown = Redcarpet.new(&quot;Hello World!&quot;)
                      <br></br>
                      puts markdown.to_html<br></br>
                      <mark>```</mark>
                    </td>
                    <Image
                      loader={myLoader}
                      src={code_highlight}
                      alt={`rendered list`}
                      className="inline-block"
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
          {/* Links & Images */}
          <details>
            <summary className="italic font-light hover:bg-primary-100 w-fit pr-2">
              Links & Images
            </summary>
            <div className="ml-4 mb-4 pt-2 border-t-[1px] border-neutral-300">
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={2}>Links</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      [I&apos;m an inline-style link](https://www.google.com)
                    </td>
                    <td>
                      <a href="https://www.google.com">
                        I&apos;m an inline-style link
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      [I&apos;m a reference-style link][Arbitrary
                      case-insensitive reference text]<br></br>
                      <br></br>
                      <i>... some other text ...</i>
                      <br></br>
                      <br></br>
                      [arbitrary case-insensitive reference text]:
                      https://www.mozilla.org
                    </td>
                    <td>
                      <a href="https://www.mozilla.org">
                        I&apos;m a reference-style link
                      </a>
                      <br></br>
                      <br></br>
                      <i>... some other text ...</i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      [You can use numbers for reference-style link
                      definitions][1]
                      <br></br>
                      <br></br>
                      <i>... some other text ...</i>
                      <br></br>
                      <br></br>
                      [1]: http://slashdot.org
                    </td>
                    <td>
                      <a href="http://slashdot.org">
                        You can use numbers for reference-style link definitions
                      </a>
                      <br></br>
                      <br></br>
                      <i>... some other text ...</i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Or leave it empty and use the [link text itself][]
                      <br></br>
                      <br></br>
                      <i>... some other text ...</i>
                      <br></br>
                      <br></br>
                      [link text itself]: http://www.reddit.com
                    </td>
                    <td>
                      Or leave it empty and use the&nbsp;
                      <a href="http://www.reddit.com">link text itself</a>
                      <br></br>
                      <br></br>
                      <i>... some other text ...</i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              {/* images */}
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={2}>Images</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Inline-style: ![alt text](https://picsum.photos/200)
                    </td>
                    <td>
                      Inline-style:
                      <Image
                        loader={myLoader}
                        src={"https://picsum.photos/200"}
                        width={100}
                        height={100}
                        alt={`rendered list`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Reference-style: ![alt text1][logo]
                      <br></br>
                      <br></br>
                      <i>... some other text ...</i>
                      <br></br>
                      <br></br>
                      [logo]: https://picsum.photos/200
                    </td>
                    <td>
                      Reference-style:
                      <Image
                        loader={myLoader}
                        src={"https://picsum.photos/200"}
                        width={100}
                        height={100}
                        alt={`rendered list`}
                      />
                      <br></br>
                      <br></br>
                      <i>... some other text ...</i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <em className="markdown-view">
                Note: at the time of writing only image with an link to
                <br></br>
                <a
                  href="https://cloudinary.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cloudinary.com
                </a>{" "}
                and{" "}
                <a
                  href="https://picsum.photos/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  picsum.photos
                </a>{" "}
                are working at the side.<br></br>To add other sources, update
                the{" "}
                <a
                  href="https://github.com/Zolske/zoltankepes.com/blob/main/next.config.js"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  next.config.js
                </a>{" "}
                file.<br></br>For more info see{" "}
                <a
                  href="https://nextjs.org/docs/messages/next-image-unconfigured-host"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  next/image Un-configured Host
                </a>
                .
              </em>
            </div>
          </details>
          {/* Tables */}
          <details>
            <summary className="italic font-light hover:bg-primary-100 w-fit pr-2">
              Tables
            </summary>
            <div className="ml-4 mb-4 pt-2 border-t-[1px] border-neutral-300">
              <table className="markdown-view">
                <thead>
                  <tr>
                    <th colSpan={3}>Tables</th>
                  </tr>
                  <tr>
                    <th>gfm markdown</th>
                    <th>rendered output</th>
                    <th>comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      |default|left side|centre|right side|<br></br>
                      |-| :- | :-: |-: |<br></br>
                      |cell 1|cell 2|cell 3|cell 4|<br></br>
                      |`cell 5`|~cell 6~|*cell 7*|**cell 8**|<br></br>
                    </td>
                    <td>
                      <Image
                        loader={myLoader}
                        src={table_image}
                        alt={`rendered list`}
                        className="inline-block"
                      />
                    </td>
                    <td>
                      - empty spaces and hyphens can be added<br></br>to the
                      markdown to make the table syntax<br></br>more readable,
                      but they have no impact on<br></br>the rendered table
                      <br></br>- styles can be applied to the table as well
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </details>
    </>
  );
}
