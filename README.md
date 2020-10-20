The entry point for the app is in app.js

<h3>NOTE:</h3> DO NOT write your code here (APP.JS).  create new files(in folders) then export and use them in app.js. 

Take a look at the comment ``use Custom routes`` in app.js
for example I have Created 2 files inside this folder (all_requests/demo).
one inserts answers into the table and
one selects  all records from the table then,
I import them in app.js and use them like so

```
    app.use(insertAnswers)
    app.use(readAllAnswers)
```

create all your files inside a folder in the `all_requests` folder

Assets which would be uploaded should be added to `uploads` folder

You may need to check the file => mysql_connection/connections.js to see if the username and password of the db would work on your system

*File and Folder Structure*

 * Create folders and put the files you create in them
 * Folder names should describe what is inside them
 * File names should describe what is inside them

*Database* 

For the database in this project, we would be using mySQL
(Assuming we're using localhost)I would put the neccessary SQl queries in `w2_database.sql` inside the main folder. run them to create your database and tables locally


*using mysql in node js*

check this on
[HOW TO USE mysql PACKAGE IN NODE JS]()
For the the sake of saving time i have created the method for connecting the database (*I am assuming we would be developing locally until I further communicate with Dr.*) in a folder called `mysql_connection`/connections.js

