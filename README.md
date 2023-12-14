# To-Do-List
To-Do List developed to the Web Systems Development 1 at Digital Metropole Institute.

# Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express

# Getting Started

- Install `npm` 
- Download the project: `git clone https://github.com/CaioVitorDM/To-Do-List.git`
- Configure a MySQL database
  - Name: todolist
  - Username: root
  - Password: 123456
  - Tables:
    
  ```
   CREATE TABLE todolist.users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(250) NOT NULL,
      email VARCHAR(250) NOT NULL,
      password VARCHAR(250) NOT NULL,
      PRIMARY KEY (`id`)
    );
    ```
    ```
    CREATE TABLE todolist.tasks (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(45) NOT NULL,
      dueDate VARCHAR(45) NOT NULL,
      urgency VARCHAR(45) NOT NULL,
      userId INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );
    ```
- Run `node server.js`
- The project will open here: http://localhost:3000/
