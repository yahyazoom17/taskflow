# =============================================================================
# Stage 1: Install dependencies (all — including devDependencies)
# =============================================================================
FROM node:20-alpine AS deps

# libc6-compat is required by some native Node addons on Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

# npm ci installs everything (prod + dev) when NODE_ENV is not "production".
# devDependencies such as @tailwindcss/postcss and TypeScript are needed at
# build time, so we must NOT set NODE_ENV=production here.
RUN npm ci

# =============================================================================
# Stage 2: Build the application
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Bring in all dependencies (prod + dev) from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

# DO NOT set NODE_ENV=production in this stage — it causes npm/Node to ignore
# devDependencies at runtime, which breaks build tools like @tailwindcss/postcss.
# NODE_ENV=production is only set in the final runner stage.
ENV NEXT_TELEMETRY_DISABLED=1

# Give Node extra heap; the default ~512 MB can OOM on larger Next.js builds.
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Next.js 16 defaults to Turbopack, which has known issues with Docker's
# overlay filesystem (TurbopackInternalError: Failed to write app endpoint).
# Force the stable webpack bundler instead.
RUN npx next build --no-turbopack

# =============================================================================
# Stage 3: Production runner (lean image)
# =============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run as a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only the artifacts needed to run the app
COPY --from=builder /app/public         ./public
COPY --from=builder /app/.next          ./.next
COPY --from=builder /app/node_modules   ./node_modules
COPY --from=builder /app/package.json   ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copy the local JSON database and give the app user write access.
# Mount a named volume here to persist task data across container restarts:
#   docker run -v taskflow_db:/app/db ...
COPY --from=builder /app/db ./db
RUN chown -R nextjs:nodejs /app/db

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "start"]