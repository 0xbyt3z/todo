FROM node:18-alpine as deps

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma/schema.prisma ./

RUN npm install

COPY . .


FROM node:18-alpine as build
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/package*.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=deps /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=deps /usr/src/app/ ./

RUN npx prisma generate

RUN npm run build


FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=build /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=build /usr/src/app/dist ./dist

CMD [ "npm","run","start:prod"]
