FROM node:18.17.1

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm -v

RUN pnpm install

RUN pnpm run build

CMD ["pnpm", "run", "start"]