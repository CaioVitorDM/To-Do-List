const User = require('../models/userModel');
const bcrypt = require('bcrypt');

function registerUser(req, res) {

  const { nameSignUp, emailSignUp, passwordSignUp } = req.body;
  
  User.findByEmail(emailSignUp, (err, existingUser) => {
   if (err) {
     res.status(500).json({ error: 'Erro interno do servidor' });
     return;
   }
   if (existingUser) {
     res.status(400).json({ message: 'Nome de usuário já existe' });
     return;
   }

   const newUser = new User(null, nameSignUp, emailSignUp, passwordSignUp);

    User.create(newUser, (err, createdUser) => {
    if (err) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
        return;
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: createdUser });
    });
  });
}

function loginUser(req, res) {
    
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    if (!user) {
      res.status(401).json({ message: 'E-mail ou senha inválidos' });
      return;
    }
  
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        res.status(401).json({ message: 'E-mail ou senha inválidos' });
        return;
      }
  
      res.status(200).json({ message: 'Login realizado com sucesso', user });
    });
  });
}

module.exports = {
    registerUser,
    loginUser
};