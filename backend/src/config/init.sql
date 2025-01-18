CREATE DATABASE IF NOT EXISTS database_quality;

CREATE USER IF NOT EXISTS 'user_quality'@'%' IDENTIFIED BY 'pass_quality';
GRANT ALL PRIVILEGES ON *.* TO 'user_quality'@'%';

FLUSH PRIVILEGES;
