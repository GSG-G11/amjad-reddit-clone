BEGIN;
DROP TABLE IF EXISTS users,
posts,
comments,
likes CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) unique,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date date,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date date,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  count INT,
  post_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO users (username, email, password)
VALUES (
    'amjad',
    'amjad@gmail.com',
    '$2a$10$SncprmtVMyHnBMXvuOFzeOpaY1eK6IDci45ySdgjZKeqDNwDeoPYi'
  );

INSERT INTO users (username, email, password)
VALUES (
    'mohamad',
    'mohamad@gmail.com',
    '$2a$10$SncprmtVMyHnBMXvuOFzeOpaY1eK6IDci45ySdgjZKeqDNwDeoPYi'
  );

INSERT INTO posts (content, date, user_id)
VALUES (
    'good morning everyone!',
    '1/2/2022',
    '1'
  );

INSERT INTO comments (content, date, user_id, post_id)
VALUES (
    'good morning to you too',
    '1/2/2022',
    '2',
    '1'
  );

INSERT INTO likes (count, post_id)
VALUES (
    '5',
    '1'
  );
COMMIT;