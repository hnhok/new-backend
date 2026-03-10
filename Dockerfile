# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies and Prisma client
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# Copy source
COPY . .
RUN npx prisma generate
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Using sqlite for now, but in a real prod env this might be PG/MySQL
ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

CMD ["node", "dist/main"]
