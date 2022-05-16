FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY prisma/schema.prisma .

RUN yarn prisma:generate

COPY . .

RUN yarn build

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]
