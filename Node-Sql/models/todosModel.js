const pool = require('../DB.js');


async function getAllTodos() {
  try {
    const sql = 'SELECT * FROM todos';
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getTodo(ID) {
  try {
    const sql = 'SELECT * FROM todos where todoID=?';
    const result = await pool.query(sql, [ID]);
    console.log("result", result);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function getTodoByUser(userID) {
  try {
    const sql = 'SELECT * FROM todos where userID=?';
    const [rows, fields] = await pool.query(sql, [userID]);
    return rows;

  } catch (err) {
    console.log(err);
  }
}
async function createTodo(userID, title, completed) {
  try {
    const sql = `INSERT INTO todos (userID, title, completed) VALUES (?, ?, ?)`;
    const [result] = await pool.query(sql, [userID, title, completed]);
    const newTodoID = result.insertId;
    const fetchSql = `SELECT * FROM todos WHERE todoID = ?`;
    const [rows] = await pool.query(fetchSql, [newTodoID]);
    if (rows.length > 0) {
      return rows[0]; // Return the newly created todo object
    } else {
      throw new Error('Failed to fetch the newly created todo');
    }
  } catch (err) {
    throw err;
  }
}

async function deleteTodo(todoID) {
  try {
    // בדיקה אם קיים todoID
    const checkExistence = await pool.query('SELECT COUNT(*) AS count FROM todos WHERE todoID = ?', [todoID]);
    if (checkExistence[0][0].count === 0) {
      return false;
    } else {
      const sql = `DELETE FROM todos WHERE todoID = ?`;
      const result = await pool.query(sql, [todoID]);
      return result[0][0];
    }
  } catch (err) {
    console.error('Error deleting todo:', err);
    throw err;
  }
}
async function updateTodo(todoID, userID, title, completed) {
  try {
    const sql = `UPDATE todos SET userID = ?, title = ?, completed = ? WHERE todoID = ?`;
    const result = await pool.query(sql, [userID, title, completed, todoID]);
    return result[0][0];
  } catch (err) {
    console.error('Error updating todo:', err);
    throw err;
  }
}
module.exports = { getAllTodos, getTodo, createTodo, deleteTodo, updateTodo, getTodoByUser }  