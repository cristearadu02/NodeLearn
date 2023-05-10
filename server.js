/*

------> CREEARE SERVER HELLO WORLD <------

const http = require('http');

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World!");
});

server.listen(port, host, () => { 
    console.log(`Server running at http://${host}:${port}/`);
});
*/


/*
// ----> CITIRE / SCRIERE DE PE DISC <----

const fs = require('fs'); // file system

fs.readFile("test.txt", (error, data) => {

    if (error) {
        console.log(error);
        return;
    } else {
        console.log(data.toString());
    }
});

fs.writeFile("test.txt", "\nSalut din cod!", {flag: "a"},(error) => {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Fisierul a fost scris cu succes!");
    }
});

fs.rename("test.txt", "test2.txt", (error) => {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Fisierul a fost redenumit cu succes!");
    }
});

fs.unlink("test2.txt", (error) => {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Fisierul a fost sters cu succes!");
    }
});
*/

// ----> ROUTING <----

const http = require('http');
const fs = require('fs');
const db = require('./db').connect();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3005;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    switch (req.url) {
        case "/":
            res.end("Welcoe to my node API!");
            break;
        case "/about":
            res.end("About page");
            break;
        case "/contact":
            res.end("Contact page");
            break;
        case "/person":
            if(req.method == "GET") {
                fs.readFile(db , (error, data) => {
                    if (error) {
                        res.statusCode = 500;
                        res.end("Internal server error");
                        return;
                    } else {
                        res.end(data);
                    }
                });
            }
            else if (req.method == "POST") {
                req.statusCode = 201;
                fs.readFile(db , (error, data) => {
                    if (error) {
                        res.statusCode = 500;
                        res.end("Internal server error");
                        return;
                    } else {
                        const people = JSON.parse(data.toString());
                        req.on("data", (chunk) => {
                                const json = JSON.parse(chunk.toString());
                                people.push(json);
                                const allPeople = JSON.stringify(people);
                                fs.writeFile(db, allPeople, (error) => {
                                    if (error) {
                                        res.statusCode = 500;
                                        res.end("Internal server error");
                                        return;
                                    } else {
                                        res.end(allPeople);
                                    }
                                });
                            });
                        }
                    });
            }
            break;
        default:
            res.end("Page not found");
            break;
    }
   
});

server.listen(port, host, () => { 
    console.log(`Server running at http://${host}:${port}/`);
});

/*
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_mysql_database',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database!');

  // Insert data into table
  const data = { name: 'John Doe', email: 'john.doe@example.com' };
  const insertSql = 'INSERT INTO users SET ?';
  connection.query(insertSql, data, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL database: ', err);
      return;
    }
    console.log('Data inserted successfully!');
    console.log('Result: ', result);
  });
});
*/
