// controllers/ComplianceController.js
const { ComplianceAction, ComplianceReminder, Business } = require('../models');

module.exports = {
  async getComplianceActions(req, res) {
    try {
      const actions = await ComplianceAction.findAll({ include: Business });
      res.json(actions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching compliance actions', error });
    }
  },

  async getComplianceReminders(req, res) {
    try {
      const reminders = await ComplianceReminder.findAll({ include: Business });
      res.json(reminders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching compliance reminders', error });
    }
  },

  async createComplianceAction(req, res) {
    try {
      const { business_id, action_description, due_date } = req.body;
      const action = await ComplianceAction.create({ business_id, action_description, due_date });
      res.status(201).json(action);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create compliance action', error });
    }
  },

  async createComplianceReminder(req, res) {
    try {
      const { business_id, reminder_message, remind_on } = req.body;
      const reminder = await ComplianceReminder.create({ business_id, reminder_message, remind_on });
      res.status(201).json(reminder);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create compliance reminder', error });
    }
  },
};
