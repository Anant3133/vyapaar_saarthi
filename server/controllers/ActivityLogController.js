// controllers/ActivityLogController.js
const { ActivityLog, User } = require('../models');

module.exports = {
  async getAllLogs(req, res) {
    try {
      const logs = await ActivityLog.findAll({ include: User });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch logs', error });
    }
  },

  async getUserLogs(req, res) {
    try {
      const userId = req.params.userId;
      const logs = await ActivityLog.findAll({ where: { user_id: userId } });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user logs', error });
    }
  },

  async createLog(req, res) {
    try {
      const { action, description, metadata } = req.body;
      const log = await ActivityLog.create({
        user_id: req.user.id, 
        action,
        description,
        metadata,
      });
      res.status(201).json(log);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create log', error });
    }
  },

  async updateLog(req, res) {
    try {
      const logId = req.params.id;
      const { action, description, metadata } = req.body;

      const log = await ActivityLog.findByPk(logId);
      if (!log) {
        return res.status(404).json({ message: 'Log not found' });
      }

      await log.update({ action, description, metadata });
      res.json(log);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update log', error });
    }
  },
};

