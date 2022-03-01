FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN ln -s /etc/hostname ./hostname
COPY ./hostname /etc/hostname
RUN npm install -g typescript
COPY . .
RUN tsc