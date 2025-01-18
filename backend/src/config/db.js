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
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      idUsuario BIGINT,
      dataHoraCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
      codigo VARCHAR(15),
      nome VARCHAR(150),
      cpf_cnpj VARCHAR(20),
      cep INT,
      logradouro VARCHAR(100),
      endereco VARCHAR(120),
      numero VARCHAR(20),
      bairro VARCHAR(50),
      cidade VARCHAR(60),
      uf VARCHAR(2),
      complemento VARCHAR(150),
      fone VARCHAR(15),
      limiteCredito FLOAT,
      validade DATE
    );
  `);
}

module.exports = {
  getDBConnection,
  initDB
};
