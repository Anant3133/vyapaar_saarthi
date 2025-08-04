const app = require('./app');
const db = require('./models'); // Imports all models + sequelize instance

const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return db.sequelize.sync(); // Use { alter: true } or { force: true } during dev only
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
