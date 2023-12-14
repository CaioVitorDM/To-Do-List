const db = require('../config/db.js');

class User {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    getName() {
      return this.name;
    }
  
    setName(name) {
      this.name = name;
    }

    static create(newUser, callback) {
      db.query('INSERT INTO todolist.users SET ?', newUser, (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }

        newUser.id = result.insertId;
        callback(null, newUser);
      });
    }
  
    static findByEmail(email, callback) {
      db.query('SELECT * FROM todolist.users WHERE email = ?', [email], (err, rows) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, rows[0]);
      });
    }
  }
  
  module.exports = User;
  