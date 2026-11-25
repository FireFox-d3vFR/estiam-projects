FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM dependencies AS api
WORKDIR /app/data
RUN chown node:node .
COPY --chown=node:node assets/db.json ./db.json
USER node
EXPOSE 3000
CMD ["/app/node_modules/.bin/json-server", "db.json", "--host", "0.0.0.0", "--port", "3000"]

FROM dependencies AS build
COPY angular.json tsconfig.json tsconfig.app.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:22-alpine AS web
WORKDIR /app
COPY --from=build /app/dist/gestion-cours ./dist/gestion-cours
USER node
EXPOSE 4000
CMD ["node", "dist/gestion-cours/server/server.mjs"]
