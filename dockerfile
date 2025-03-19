FROM oven/bun:1.2.4-alpine AS base
RUN bun add -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/client/package.json apps/client/
COPY apps/server/package.json apps/server/

COPY packages/trpc/package.json packages/trpc/
COPY packages/types/package.json packages/types/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:alpine AS client
COPY --from=build /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80

FROM oven/bun:1.2.4-alpine AS server
WORKDIR /app
COPY --from=build /app/apps/server/dist .
EXPOSE 3000
CMD ["bun", "run", "index.js"]
