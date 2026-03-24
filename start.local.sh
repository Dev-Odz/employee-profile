#!/bin/sh

echo "⏳ Waiting for DB (local)..."
node wait-for-db.js

echo "🚀 Running migrations..."
npx sequelize-cli db:migrate

# ✅ SAME .seeded logic
if [ ! -f ".seeded" ]; then
  echo "🌱 Seeding data..."
  npx sequelize-cli db:seed:all
  touch .seeded
else
  echo "✅ Seed already done. Skipping..."
fi

echo "🔥 Starting app (local)..."
npm run dev