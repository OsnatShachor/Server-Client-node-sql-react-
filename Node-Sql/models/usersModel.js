const pool = require('../DB.js');

async function getAllUsers() {
  try {
    const sql = 'SELECT userID, userName, name, email, phone, company,password,street,city,zipcode FROM addresses NATURAL JOIN users NATURAL JOIN passwords';
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByUserName(userName) {
  try {
    const sql = 'SELECT userID, userName, name, email, phone, company,password,street,city,zipcode FROM addresses INNER JOIN users ON addresses.addressID = users.addressID INNER JOIN passwords ON users.passwordID = passwords.passwordID WHERE users.userName = ?';
    const [rows, fields] = await pool.query(sql, [userName]);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByNamePassword(userName) {
  try {
    const sql = 'SELECT userID, userName, name, email, phone, company,password,street,city,zipcode FROM addresses INNER JOIN users ON addresses.addressID = users.addressID INNER JOIN passwords ON users.passwordID = passwords.passwordID WHERE users.userName = ? ';
    const [rows, fields] = await pool.query(sql, [userName]);
    console.log(rows[0]);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function createUser(userName, password) {
  try {
  const insertPasswordSql = 'INSERT INTO passwords (password) VALUES (?)';
  const insertPasswordResult = await pool.query(insertPasswordSql, [password]);//הכנסת סיסמא לטבלה
  const sql1 = 'SELECT passwordID FROM passwords WHERE password = ?';
  const [passwordResult] = await pool.query(sql1, [password]);
  const passwordID = passwordResult[0].passwordID;// passwordID קבלת 
  //יצירת USER חדש עם כל הנתונים
  const sql = `INSERT INTO users (userName, passwordID) VALUES (?, ?)`;
  const [rows, fields] = await pool.query(sql, [userName, passwordID]);
  //לקבלת USER שנוצר
  const insertId = rows.insertId;
  // עכשיו תבצע שאילתה כדי להביא את המשתמש שנוצר על ידי ה-ID שלו
  const getUserSql = `SELECT * FROM users WHERE userID = ?`;
  const [userRows, userFields] = await pool.query(getUserSql, [insertId]);
  return userRows[0];
}
 catch (err) {
  throw err;
}
}


async function updateUser(userName, name, email, phone, company, street, city, zipcode) {
  try {
    // הוספת כתובת חדשה
    const insertAddressSql = 'INSERT INTO addresses (street, city, zipcode) VALUES (?, ?, ?)';
    await pool.query(insertAddressSql, [street, city, zipcode]);

    // קבלת ה-ID של הכתובת החדשה
    const getAddressIdSql = 'SELECT LAST_INSERT_ID() as addressID';
    const [addressResult] = await pool.query(getAddressIdSql);
    const addressID = addressResult[0].addressID;

    // עדכון המשתמש
    const updateUserSql = 'UPDATE users SET name=?, email=?, phone=?, addressID=?, company=? WHERE userName = ?';
    await pool.query(updateUserSql, [name, email, phone, addressID, company, userName]);

    // קבלת המשתמש לאחר העדכון
    const getUserSql = 'SELECT * FROM users WHERE userName = ?';
    const [userRows] = await pool.query(getUserSql, [userName]);
    return userRows[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
  
module.exports = { getAllUsers, getUserByUserName, createUser, getUserByNamePassword, updateUser }  