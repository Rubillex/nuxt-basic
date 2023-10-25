ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /app

# Build
FROM base as build

COPY package*.json ./

RUN npm install --production=false

COPY . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /app /app

CMD [ "node", ".output/server/index.mjs" ]
