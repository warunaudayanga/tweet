# ===== STAGE 1: Build =====
FROM node:20 AS builder
WORKDIR /app

COPY . .
RUN npm ci
RUN npx nx run @tweet/tweet-gateway:build

# ===== STAGE 2: Runtime =====
FROM node:20-slim
WORKDIR /app

# Copy compiled output and generated package.json
COPY --from=builder /app/dist/apps/tweet-gateway ./dist

# Install only runtime dependencies
WORKDIR /app/dist
RUN npm install --omit=dev --ignore-scripts

# Expose and run
EXPOSE 3000
CMD ["node", "main.js"]
