# TODO

-   User Home page where all the User files are listed.
    o Can add restrictions on types of files that will be supported for uploads.
-   A button / experience using which User can upload new file.
-   Click on a file to view the file contents in a new page.
    o Can restrict to well-known file formats – txt, jpg, png, json etc.

GET "/files" - get all files
GET "/files/:id" - get single file info
POST "/files/upload" - upload new file

database MongoDB schema
FileSchema : {

-   id: String,
-   name: String,
-   location: String
    }
