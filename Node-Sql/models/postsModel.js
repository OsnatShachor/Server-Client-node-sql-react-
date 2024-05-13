const pool = require('../DB.js');

async function getAllPosts() {
  try {
    const sql = 'SELECT * FROM posts';
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getPost(ID) {
  try {
    const sql = 'SELECT * FROM posts where postID=?';
    const result = await pool.query(sql, [ID]);
    return result[0][0];
  } catch (err) {
    console.log(err);
  }
}

async function getPostByUser(userID) {
  try {
    const sql = 'SELECT * FROM posts where userID=?';
    const [rows, fields] = await pool.query(sql, [userID]);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function createPost(userID, title, body) {
  try {
    const sqlInsert = `INSERT INTO posts (userID, title, body) VALUES (?, ?, ?)`;
    await pool.query(sqlInsert, [userID, title, body]);
    const sqlSelect = `SELECT * FROM posts WHERE userID = ? AND title = ? AND body = ?`;
    const [rows, fields] = await pool.query(sqlSelect, [userID, title, body]);
    if (rows.length > 0) {
      return rows[0]; 
    } else {
      throw new Error('Post not found');
    }
  } catch (err) {
    throw err;
  }
}

async function deletePost(postID) {
  try {
      const commentsExist = await pool.query(`SELECT * FROM comments WHERE postID = ?`, [postID]);
      if (commentsExist.length > 0) {
          // מחיקת כל הקומנטים המשויכים לפוסט
          await pool.query(`DELETE FROM comments WHERE postID = ?`, [postID]);
      }
      // מחיקת הפוסט
      const sql = `DELETE FROM posts WHERE postID = ?`;
      const result = await pool.query(sql, [postID]);
      return result[0][0];
  } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
  }
}

async function updatePost(postID, userID, title, body) {
  try {
    const sql = `UPDATE posts SET userID = ?, title = ?, body = ? WHERE postID = ?`;
    const result = await pool.query(sql, [userID, title, body, postID]);
    return result[0][0];
  } catch (err) {
    console.error('Error updating post:', err);
    throw err;
  }
}

module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost,getPostByUser }  