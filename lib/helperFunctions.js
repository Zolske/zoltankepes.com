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
