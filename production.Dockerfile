# Global args, set before the first FROM, shared by all stages
ARG PORT=5678
ARG NODE_ENV="production"
ARG ROOT_URL="http://localhost:${PORT}"
ARG TARGET="server"

################################################################################
# Build stage 1 - `yarn build`

FROM node:12-alpine as builder
# Import our shared args
ARG NODE_ENV
ARG ROOT_URL

# Cache node_modules for as long as possible
COPY lerna.json package.json yarn.lock /app/
COPY @dum/ /app/@dum/
WORKDIR /app/
RUN yarn install --frozen-lockfile --production=false --no-progress

COPY tsconfig.json /app/
# Folders must be copied separately, files can be copied all at once
COPY scripts/ /app/scripts/
COPY data/ /app/data/

# Finally run the build script
RUN yarn run build

################################################################################
# Build stage 2 - COPY the relevant things (multiple steps)

FROM node:12-alpine as clean
# Import our shared args
ARG NODE_ENV
ARG ROOT_URL

# Copy over selectively just the tings we need, try and avoid the rest
COPY --from=builder /app/lerna.json /app/package.json /app/yarn.lock /app/
COPY --from=builder /app/@dum/config/ /app/@dum/config/
COPY --from=builder /app/@dum/db/ /app/@dum/db/
COPY --from=builder /app/@dum/client/package.json /app/@dum/client/package.json
COPY --from=builder /app/@dum/client/assets/ /app/@dum/client/assets/
COPY --from=builder /app/@dum/client/src/next.config.js /app/@dum/client/src/next.config.js
COPY --from=builder /app/@dum/client/.next /app/@dum/client/.next
COPY --from=builder /app/@dum/server/package.json /app/@dum/server/
COPY --from=builder /app/@dum/server/postgraphile.tags.jsonc /app/@dum/server/
COPY --from=builder /app/@dum/server/dist/ /app/@dum/server/dist/
COPY --from=builder /app/@dum/worker/package.json /app/@dum/worker/
COPY --from=builder /app/@dum/worker/templates/ /app/@dum/worker/templates/
COPY --from=builder /app/@dum/worker/dist/ /app/@dum/worker/dist/
COPY --from=builder /app/data/amazon-rds-ca-cert.pem /app/data/amazon-rds-ca-cert.pem

# Shared args shouldn't be overridable at runtime (because they're baked into
# the built JS).
#
# Further, they aren't available in ENTRYPOINT (because it's at runtime), so
# push them to a .env file that we can source from ENTRYPOINT.
RUN echo -e "NODE_ENV=$NODE_ENV\nROOT_URL=$ROOT_URL" > /app/.env

RUN rm -Rf /app/node_modules /app/@dum/*/node_modules

################################################################################
# Build stage FINAL - COPY everything, once, and then do a clean `yarn install`

FROM node:12-alpine

EXPOSE $PORT
WORKDIR /app/
# Copy everything from stage 2, it's already been filtered
COPY --from=clean /app/ /app/

# Install yarn ASAP because it's the slowest
RUN yarn install --frozen-lockfile --production=true --no-progress

# Import our shared args
ARG PORT
ARG NODE_ENV
ARG ROOT_URL
ARG TARGET

LABEL description="My PostGraphile-powered $TARGET"

# You might want to disable GRAPHILE_TURBO if you have issues
ENV GRAPHILE_TURBO=1 TARGET=$TARGET PORT=$PORT
ENV DATABASE_HOST="pg"
ENV DATABASE_NAME="graphile_starter"
ENV DATABASE_OWNER="${DATABASE_NAME}"
ENV DATABASE_VISITOR="${DATABASE_NAME}_visitor"
ENV DATABASE_AUTHENTICATOR="${DATABASE_NAME}_authenticator"

# Entrypoint last so that we can run `sh` in previous build steps for debugging
ENTRYPOINT yarn "${TARGET}" start
