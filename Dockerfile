FROM node:20 as build

ENV NG_CLI_ANALYTICS="false"

COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build

FROM node:20

COPY --from=build /app/dist/ai-horde-website /app
ENTRYPOINT ["node", "/app/server/server.mjs"]
