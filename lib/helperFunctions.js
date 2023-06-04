/**
 * The purpose of the function is to convert the json object which contains
 * the structure of the "firebase file storage" into an JavaScript array.
 * @param {*} json object from the "firebase realtime database"
 * @returns JavaScript array
 */
export function createJsonArray(json) {
  let jsonArray = [];
  // create an array of the first folder names
  const note_folder = Object.keys(json);

  // loop through all first folders and create from
  // it links and subfolder if there are any
  for (let i = 0; i < note_folder.length; i++) {
    let folder_name = note_folder[i];
    let folder_links;
    let sub_folder_names;
    let sub_folder_links = [];

    // create array of links from 1st folder
    if (json[folder_name].Notes) {
      folder_links = Object.keys(json[folder_name].Notes);
    } else {
      folder_links = null;
    }

    // create array of subfolder names
    if (json[folder_name].SubFolder) {
      sub_folder_names = Object.keys(json[folder_name].SubFolder);
    } else {
      sub_folder_names = null;
    }

    // create array of links if there are any subfolders and if they have any links
    if (sub_folder_names) {
      let temp;
      for (
        let sub_folder = 0;
        sub_folder < sub_folder_names.length;
        sub_folder++
      ) {
        if (json[folder_name].SubFolder[sub_folder_names[sub_folder]].Notes) {
          temp = Object.keys(
            json[folder_name].SubFolder[sub_folder_names[sub_folder]].Notes
          );
          sub_folder_links.push([sub_folder_names[sub_folder], temp]);
        } else {
          // new line, it there are no notes but a folder should still exist
          sub_folder_links.push([sub_folder_names[sub_folder], null]);
        }
      }
    } else {
      sub_folder_links = null;
    }

    // add all Arrays of the first folders into one Array
    jsonArray.push([folder_name, folder_links, sub_folder_links]);
  }
  return jsonArray;
}

/**
 * Returns the "first folder" names in an array.
 * @param {*} json from "real database"
 * @returns array of (first) folder names
 */
export function firstFolderNames(json) {
  return Object.keys(json);
}

/**
 * Returns the "subfolder" names in an array based on the
 * provided first folder name. If there is no subfolders or
 * the first folder does nor exist, the return is "false".
 * @param {*} json from "real database"
 * @param {string} folder name of the first folder as sting
 * @returns array of subfolders or "false" if there are non
 */
export function SubFolderInFolder(json, folder) {
  return json[folder].SubFolder ? Object.keys(json[folder].SubFolder) : false;
}

/**
 * Returns all the names of all the folders (first and sub folder)
 * in an array.
 * @param {*} json from "real database"
 * @returns array of all folder names
 */
export function allFolderNames(json) {
  let firstFolder = Object.keys(json);
  let secondFolder = [];

  for (let i = 0; i < firstFolder.length; i++) {
    if ("SubFolder" in json[firstFolder[i]]) {
      secondFolder = secondFolder.concat(
        Object.keys(json[firstFolder[i]].SubFolder)
      );
    }
  }
  return firstFolder.concat(secondFolder);
}

/**
 * Returns all note names from all the folders, in an array.
 * @param {*} json from "real database"
 * @returns array of all note names
 */
export function allNoteNames(json) {
  let firstFolder = Object.keys(json);
  let secondFolder = [];
  let firstNotes = [];
  let secondNotes = [];

  for (let i = 0; i < firstFolder.length; i++) {
    if ("SubFolder" in json[firstFolder[i]]) {
      secondFolder = secondFolder.concat(
        Object.keys(json[firstFolder[i]].SubFolder)
      );
    }
  }

  for (let i = 0; i < firstFolder.length; i++) {
    if ("Notes" in json[firstFolder[i]]) {
      firstNotes = firstNotes.concat(Object.keys(json[firstFolder[i]].Notes));
    }
  }

  for (let first = 0; first < firstFolder.length; first++) {
    for (let second = 0; second < secondFolder.length; second++) {
      if ("SubFolder" in json[firstFolder[first]]) {
        if (secondFolder[second] in json[firstFolder[first]].SubFolder) {
          if (
            "Notes" in json[firstFolder[first]].SubFolder[secondFolder[second]]
          ) {
            secondNotes = secondNotes.concat(
              Object.keys(
                json[firstFolder[first]].SubFolder[secondFolder[second]].Notes
              )
            );
          }
        }
      }
    }
  }

  return firstNotes.concat(secondNotes);
}

/**
 * Add id tag to every heading in the dom. The id is made up of
 * the title but empty spaces are replaced with "-".
 * e.g. the heading "I am a heading" gets an id of id="I-am-a-heading"
 * and can be linked through md with [link](#I-am-a-heading)
 */
export function handleHeadingId() {
  // get all dom elements which are contained in the class "js-md"
  // "js-md" class needs to be given to <ReactMarkdown className="js-md">
  if (typeof window !== "undefined") {
    let markdownClass = document.getElementsByClassName("js-md")[0];

    if (typeof markdownClass != "undefined" && markdownClass != null) {
      // get a HTML collection of all the heading elements
      let h1Elements = markdownClass.getElementsByTagName("h1");
      let h2Elements = markdownClass.getElementsByTagName("h2");
      let h3Elements = markdownClass.getElementsByTagName("h3");
      let h4Elements = markdownClass.getElementsByTagName("h4");
      let h5Elements = markdownClass.getElementsByTagName("h5");
      let h6Elements = markdownClass.getElementsByTagName("h6");

      /**
       * Gives a id tag to each element of the HTML collection which
       * has been passed as argument.
       * The id is made up of the title but empty spaces are replaced with "-"
       * @param htmlCollection
       */
      function addHeadingId(htmlCollection) {
        for (let i = 0; i < htmlCollection.length; i++) {
          let headingId = htmlCollection[i].innerText.trim().replace(/ /g, "-");
          htmlCollection[i].setAttribute("id", headingId);
        }
      }
      addHeadingId(h1Elements);
      addHeadingId(h2Elements);
      addHeadingId(h3Elements);
      addHeadingId(h4Elements);
      addHeadingId(h5Elements);
      addHeadingId(h6Elements);
    }
  }
}
