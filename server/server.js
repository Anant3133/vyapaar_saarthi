const app = require('./app');
const db = require('./models'); // imports all models + sequelize instance

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models - be cautious with force/alter in production
    await db.sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Exit if DB connection fails
  }
})();
