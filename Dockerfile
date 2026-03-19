# 1️⃣ Base image (MUST BE FIRST)
FROM node:18

# 2️⃣ Set working directory
WORKDIR /usr/src/app

# 3️⃣ Copy package.json first
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of project
COPY . .

# 6️⃣ Copy start script (optional since COPY . . already includes it)
# COPY start.sh .

# 7️⃣ Make script executable
RUN chmod +x start.sh

# 8️⃣ Expose port
EXPOSE 3000

# 9️⃣ Start app
CMD ["sh", "start.sh"]