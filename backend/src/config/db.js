const mysql = require('mysql2/promise');

const {
  DB_HOST = 'localhost',
  DB_USER = 'user_quality',
  DB_PASSWORD = 'pass_quality',
  DB_NAME = 'database_quality',
  DB_PORT = '3306',
} = process.env;

let pool;

async function getDBConnection() {
  if (!pool) {
    pool = await mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

async function initDB() {
  const pool = await getDBConnection();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
      ID BIGINT PRIMARY KEY AUTO_INCREMENT,
      idUsuario BIGINT,
      DataHoraCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
      Codigo VARCHAR(15),
      Nome VARCHAR(150),
      CPF_CNPJ VARCHAR(20),
      CEP INT,
      Logradouro VARCHAR(100),
      Endereco VARCHAR(120),
      Numero VARCHAR(20),
      Bairro VARCHAR(50),
      Cidade VARCHAR(60),
      UF VARCHAR(2),
      Complemento VARCHAR(150),
      Fone VARCHAR(15),
      LimiteCredito FLOAT,
      Validade DATE
    );
  `);
}

module.exports = {
  getDBConnection,
  initDB
};
