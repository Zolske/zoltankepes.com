[&#X21e7; back to the "README" &#X21e7;](../../../README.md)

# How to set CORS origin for browser accesses

1. [install the gsutil](https://cloud.google.com/storage/docs/gsutil_install#install)
2. initialize the tool on the command line:
   - `gcloud init`
3. authenticate yourself (_follow prompt instructions_)
4. manipulate the json document for the "bucket" you want to set the permission for. [link to google doc](https://cloud.google.com/storage/docs/gsutil/commands/cors#synopsis)
   - to see the setting run : `gsutil cors get gs://<BUCKET_NAME>`
   - to change the settings create a json file e.g. :

```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

- Note: the star in the "origin" setting would allow access to from any site! You can set a array of addresses e.g. : `["https://zoltankepes.com", "http://localhost:3000" , "https://zoltankepes-com.vercel.app"]`
- name the file `cors-json-file`
- change into the directory in which you have saved the json
- run the command to apply the settings `gsutil cors get gs://<bucket_name>`
- to remove any of the settings and to return to the default save an empty array in the json file and submit it
