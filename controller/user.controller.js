const db = require("../db");

class UserController {
  async createUser(req, res) {
    const { id, XML, JSON } = req.body;
    const newDiagram = await db.query(
      "INSERT INTO diagram (id, XML, JSON) values ($1,$2,$3) RETURNING *",
      [id, XML, JSON]
    );
    res.json(newDiagram.rows[0]);
  }
  async getUsers(req, res) {
    const users = await db.query("SELECT * from diagram");
    res.json(users.rows);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const users = await db.query("SELECT * from diagram where id = $1", [id]);
    res.json(users.rows[0]);
  }
  async updateUser(req, res) {
    const { id, XML, JSON } = req.body;
    const user = await db.query(
      "UPDATE diagram set XML = $1, JSON = $2 where id = $3 RETURNING *",
      [XML, JSON, id]
    );
    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const users = await db.query("DELETE from diagram where id = $1", [id]);
    res.json(users.rows[0]);
  }
}

module.exports = new UserController();
