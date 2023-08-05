CREATE USER IF NOT EXISTS 'basecamp_dev'@'localhost' IDENTIFIED BY 'basecamp_dev_pwd';
CREATE DATABASE IF NOT EXISTS basecamp_db;
GRANT ALL PRIVILEGES ON `basecamp_db`.* TO 'basecamp_dev'@'localhost';
GRANT SELECT ON `perfomance_schema`.* TO 'basecamp_dev'@'localhost';
FLUSH PRIVILEGES;
