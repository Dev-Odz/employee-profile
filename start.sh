#!/bin/sh

echo "⏳ Waiting for DB..."
node wait-for-db.js

echo "🚀 Running migrations..."
npx sequelize-cli db:migrate

echo "🔍 Checking if seed is needed..."

SEED_COUNT=$(node -e "
const { Sequelize } = require('sequelize');
require('./src/config/config');

(async () => {
  const sequelize = require('./src/models');
  const count = await sequelize.Users.count();
  console.log(count);
  process.exit();
})();
")

if [ "$SEED_COUNT" = "0" ]; then
  echo "🌱 Seeding data..."
  npx sequelize-cli db:seed:all
else
  echo "✅ Data already exists. Skipping seed..."
fi

echo "🔥 Starting app..."
exec node src/server.js