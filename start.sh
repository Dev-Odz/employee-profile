#!/bin/sh

echo "⏳ Waiting for DB..."
node wait-for-db.js

echo "🚀 Running migrations..."
npx sequelize-cli db:migrate

echo "🔍 Checking if seed is needed..."

SEED_COUNT=""

for i in 1 2 3 4 5
do
  SEED_COUNT=$(node scripts/seed-check.js | tail -n 1 | tr -d '[:space:]')

  if [ -n "$SEED_COUNT" ]; then
    break
  fi

  echo "Retrying count... ($i)"
  sleep 1
done

if [ "$SEED_COUNT" = "0" ]; then
  npx sequelize-cli db:seed --seed initialdata.js
else
  echo "✅ Data already exists. Skipping seed..."
fi

echo "🔥 Starting app..."
exec node src/server.js