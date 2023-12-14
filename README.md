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
    CREATE TABLE `users` (
      `id` int NOT NULL AUTO_INCREMENT,
      `name` varchar(250) NOT NULL,
      `email` varchar(250) NOT NULL,
      `password` varchar(250) NOT NULL,
      PRIMARY KEY (`id`),
      UNIQUE KEY `username_UNIQUE` (`email`),
      UNIQUE KEY `idUsers_UNIQUE` (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    ```
    ```
    CREATE TABLE `tasks` (
      `id` int NOT NULL AUTO_INCREMENT,
      `title` varchar(250) NOT NULL,
      `dueDate` varchar(45) NOT NULL,
      `urgency` varchar(45) NOT NULL,
      `userId` int NOT NULL,
      PRIMARY KEY (`id`),
      UNIQUE KEY `id_UNIQUE` (`id`),
      KEY `userId_idx` (`userId`),
      CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    ```
- Run `node server.js`
- The project will open here: http://localhost:3000/
