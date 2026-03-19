#!/bin/sh  
  
echo "⏳ Waiting for DB..."  
node wait-for-db.js  
  
echo "🚀 Running migrations..."  
npx sequelize-cli db:migrate  
  
echo "🌱 Seeding data..."  
npx sequelize-cli db:seed:all  
  
echo "🔥 Starting app..."  
npm start