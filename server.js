const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.none());
app.use(cookieParser());


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login-page.html'));
});

app.use('/auth', userRoutes); 
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
