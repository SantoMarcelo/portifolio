FROM node:22-slim
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

ENV PORT=3333 \
    DATABASE_URL=file:/data/loja.db
EXPOSE 3333

# Cria/atualiza o schema do SQLite, carrega o seed (idempotente) e sobe a API
CMD ["sh", "-c", "npx prisma db push --skip-generate && npm run db:seed && node dist/server.js"]
