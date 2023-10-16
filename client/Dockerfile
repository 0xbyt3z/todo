FROM node:18-alpine as deps

RUN npm install -g pnpm

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build



FROM node:18-alpine

RUN mkdir -p /app
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm","start"]
