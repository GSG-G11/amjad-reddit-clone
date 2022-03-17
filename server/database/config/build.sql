BEGIN;
DROP TABLE IF EXISTS users,
posts,
comments,
votes CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) unique,
  avatar varchar(255),
  password VARCHAR(255) NOT NULL
);
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date varchar(255),
  image_url TEXT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date varchar(255),
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  type CHAR(4) NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO users (username, email, password, avatar)
VALUES (
    'amjad',
    'amjad@gmail.com',
    '$2a$10$SncprmtVMyHnBMXvuOFzeOpaY1eK6IDci45ySdgjZKeqDNwDeoPYi',
    'https://randomuser.me/api/portraits/lego/1.jpg'
  );
INSERT INTO users (username, email, password, avatar)
VALUES (
    'mohamad',
    'mohamad@gmail.com',
    '$2a$10$SncprmtVMyHnBMXvuOFzeOpaY1eK6IDci45ySdgjZKeqDNwDeoPYi',
    'https://randomuser.me/api/portraits/lego/2.jpg'
  );
COMMIT;