FROM node:22-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV API_PROXY_TARGET=http://backend:3333
EXPOSE 5173

# `vite preview` serve o build e encaminha /api para o backend (API_PROXY_TARGET)
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
