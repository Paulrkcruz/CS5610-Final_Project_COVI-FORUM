CREATE TABLE IF NOT EXISTS boards (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  published tinyint(1) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE roles (
  id int NOT NULL,
  name varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE user_roles (
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roleId int NOT NULL,
  userId int NOT NULL,
  PRIMARY KEY (roleId,userId),
  KEY userId (userId),
  CONSTRAINT user_roles_ibfk_1 FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_roles_ibfk_2 FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
