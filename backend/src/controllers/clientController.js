const ClientModel = require('../models/clientModel');

class ClientController {
  static async create(req, res) {
    try {
      const newId = await ClientModel.create(req.body);
      return res.status(201).json({ success: true, insertId: newId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const { Codigo, Nome, CEP, Cidade } = req.query;
      const filters = { Codigo, Nome, CEP, Cidade };
      const clients = await ClientModel.findAll(filters);
      return res.json(clients);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const client = await ClientModel.findById(id);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      return res.json(client);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const affectedRows = await ClientModel.update(id, req.body);
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Client not found' });
      }
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const affectedRows = await ClientModel.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Client not found' });
      }
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ClientController;
