FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY angular.json tsconfig.json tsconfig.app.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist/tp-angular ./dist/tp-angular
USER node
EXPOSE 4000
CMD ["node", "dist/tp-angular/server/server.mjs"]
