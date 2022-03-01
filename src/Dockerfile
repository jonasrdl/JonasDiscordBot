FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY /etc/hostname /etc/hostname
RUN npm install -g typescript
COPY . .
RUN tsc