const pool = require('../DB.js');

async function getAllComments() {
    try {
      const sql = 'SELECT * FROM comments';
      const [rows, fields] = await pool.query(sql);
      return rows;
    } catch (err) {
      console.log(err);
    }
}

async function getComment(ID) {
  try {
      const sql = 'SELECT * FROM comments where postID=?';
      const result = await pool.query(sql, [ID]);
      const comments = result[0]; // גישה לנתונים מתוך תוצאת השאילתה
      return comments;
  } catch (err) {
      console.log(err);
  }
}

async function createComment(postID, body, email, commentName) {
  try {
    const sqlInsert = `INSERT INTO comments (postID, body, email, commentName) VALUES (?, ?, ?, ?)`;
    await pool.query(sqlInsert, [postID, body, email, commentName]);
    const sqlSelect = `SELECT * FROM comments WHERE postID = ? AND body = ? AND email = ? AND commentName = ?`;
    const [rows, fields] = await pool.query(sqlSelect, [postID, body, email, commentName]);
    if (rows.length > 0) {
      return rows[0]; 
    } else {
      throw new Error('Comment not found'); 
    }
  } catch (err) {
    throw err;
  }
}

   async function deleteComment(commentID) {
    try {
        const checkExistence = await pool.query('SELECT COUNT(*) AS count FROM comments WHERE commentID = ?', [commentID]);
        if (checkExistence[0][0].count === 0)
            { return false;}
        else{
             const sql = `DELETE FROM comments WHERE commentID = ?`;
        const result = await pool.query(sql, [commentID]);
         return result[0][0];}
    } catch (err) {
      console.error('Error deleting comment:', err);
      throw err;
    }
  }


  async function updateComment(commentID,postID, body, email,commentName) {
    try {
      const sql = `UPDATE comments SET postID = ?, body = ?, email = ?, commentName = ? WHERE commentID = ?`;
      const result = await pool.query(sql, [postID, body, email,commentName,commentID]);
      return result[0][0];
    } catch (err) {
      console.error('Error updating Comment:', err);
      throw err;
    }
  }
  
module.exports = {getAllComments, getComment, createComment, deleteComment, updateComment}  
