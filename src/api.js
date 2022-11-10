const client = import("./connection.js");
const express = import("express");
const app = express();

app.listen(3000, () => {
  console.log("Sever is now listening at port 3000");
});

client.connect();

export function getTable(tableName) {
  app.get(`/${tableName}`, (req, res) => {
    client.query(`Select * from ${tableName}`, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
    client.end;
  });
}

// getTable("users");

export function getElem(tableName, userID) {
  app.get(`/${tableName}/:id`, (req, res) => {
    client.query(
      `Select * from ${tableName} where id=${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
    client.end;
  });
}

// getElem("users", 1);

const bodyParser = import("body-parser");
app.use(bodyParser.json());

export function addElem(tableName, info) {
  app.post(`/${tableName}`, (req, res) => {
    const user = info;
    let insertQuery = `insert into users(id, name, email)
                       values(${user.id}, '${user.name}', '${user.email}')`;

    client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send("Insertion was successful");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  });
}

// addElem("users", {
//   id: 4,
//   name: "alex3",
//   email: "alex3@example.com",
// });

export function updateElem(tableName, info) {
  app.put(`/${tableName}/:id`, (req, res) => {
    let user = info;
    let updateQuery = `update ${tableName}
                       set name = '${user.name}',
                       email = '${user.email}'
                       where id = ${user.id}`;

    client.query(updateQuery, (err, result) => {
      if (!err) {
        res.send("Update was successful");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  });
}

// updateElem("users", {
//   id: 4,
//   name: "alex123",
//   email: "alex123@example.com",
// });

export function deleteElem(tableName, userID) {
  app.delete(`/${tableName}/:id`, (req, res) => {
    let insertQuery = `delete from ${tableName} where id=${userID}`;

    client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send("Deletion was successful");
      } else {
        console.log(err.message);
      }
    });
    client.end;
  });
}

// deleteElem("users", 4);

module.exports = { getElem, getTable, deleteElem, updateElem, addElem };
