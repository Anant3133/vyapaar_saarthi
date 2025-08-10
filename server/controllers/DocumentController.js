const { Document, User } = require('../models');

// Upload a new document (business_owner only)
const uploadDocument = async (req, res) => {
  try {
    if (req.user.role !== 'business_owner') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { document_type, expiry_date } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const url = `/uploads/${req.file.filename}`;

    const document = await Document.create({
      user_id: req.user.id,
      document_type,
      url,
      expiry_date,
    });

    res.status(201).json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload document' });
  }
};

// Get all documents for current user
const getMyDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      where: { user_id: req.user.id },
    });

    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
};

// Admin or gov_employee can get documents for a specific user
const getUserDocuments = async (req, res) => {
  try {
    if (req.user.role !== 'gov_employee' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { userId } = req.params;

    const documents = await Document.findAll({
      where: { user_id: userId },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user documents' });
  }
};

// Delete a document (only by owner)
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await document.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete document' });
  }
};

module.exports = {
  uploadDocument,
  getMyDocuments,
  getUserDocuments,
  deleteDocument,
};
