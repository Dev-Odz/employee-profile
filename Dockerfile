# 1️⃣ Use official Node image
FROM node:18

# 2️⃣ Set working directory inside container
WORKDIR /usr/src/app

# 3️⃣ Copy package.json first
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy the rest of the project
COPY . .

# 6️⃣ Expose port (match your Express port)
EXPOSE 3000

# 7️⃣ Start the app
CMD ["npm", "start"]