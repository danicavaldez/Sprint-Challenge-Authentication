const db = require("../database/dbConfig")

module.exports = {
  add,
  findBy,
  findById
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first()
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}