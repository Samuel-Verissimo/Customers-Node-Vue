const { getDBConnection } = require('../config/db');

class ClientModel {
  static async create(data) {
    const pool = await getDBConnection();

    const sql = `
      INSERT INTO clients (
        Codigo, Nome, CPF_CNPJ, CEP, Logradouro,
        Endereco, Numero, Bairro, Cidade, UF, Complemento, Fone, LimiteCredito, Validade
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.Codigo || null,
      data.Nome || null,
      data.CPF_CNPJ || null,
      data.CEP || null,
      data.Logradouro || null,
      data.Endereco || null,
      data.Numero || null,
      data.Bairro || null,
      data.Cidade || null,
      data.UF || null,
      data.Complemento || null,
      data.Fone || null,
      data.LimiteCredito || 0,
      data.Validade || null
    ];

    const [result] = await pool.query(sql, values);
    return result.insertId;
  }

  static async findAll(filters = {}) {
    const pool = await getDBConnection();

    let whereClauses = [];
    let values = [];

    if (filters.Codigo) {
      whereClauses.push('Codigo LIKE ?');
      values.push(`%${filters.Codigo}%`);
    }
    if (filters.Nome) {
      whereClauses.push('Nome LIKE ?');
      values.push(`%${filters.Nome}%`);
    }
    if (filters.CEP) {
      whereClauses.push('CEP = ?');
      values.push(filters.CEP);
    }
    if (filters.Cidade) {
      whereClauses.push('Cidade LIKE ?');
      values.push(`%${filters.Cidade}%`);
    }

    let whereString = '';
    if (whereClauses.length > 0) {
      whereString = 'WHERE ' + whereClauses.join(' AND ');
    }

    const sql = `SELECT * FROM clients ${whereString} ORDER BY ID DESC`;
    const [rows] = await pool.query(sql, values);
    return rows;
  }

  static async findById(id) {
    const pool = await getDBConnection();
    const sql = 'SELECT * FROM clients WHERE ID = ?';
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  }

  static async update(id, data) {
    const pool = await getDBConnection();
    const sql = `
      UPDATE clients
      SET
        Codigo = ?,
        Nome = ?,
        CPF_CNPJ = ?,
        CEP = ?,
        Logradouro = ?,
        Endereco = ?,
        Numero = ?,
        Bairro = ?,
        Cidade = ?,
        UF = ?,
        Complemento = ?,
        Fone = ?,
        LimiteCredito = ?,
        Validade = ?
      WHERE ID = ?
    `;

    const values = [
      data.Codigo || null,
      data.Nome || null,
      data.CPF_CNPJ || null,
      data.CEP || null,
      data.Logradouro || null,
      data.Endereco || null,
      data.Numero || null,
      data.Bairro || null,
      data.Cidade || null,
      data.UF || null,
      data.Complemento || null,
      data.Fone || null,
      data.LimiteCredito || 0,
      data.Validade || null,
      id
    ];

    const [result] = await pool.query(sql, values);
    return result.affectedRows;
  }

  static async delete(id) {
    const pool = await getDBConnection();
    const sql = 'DELETE FROM clients WHERE ID = ?';
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
  }
}

module.exports = ClientModel;
