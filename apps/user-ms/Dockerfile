# ===== STAGE 1: Build =====
FROM node:20 AS builder
WORKDIR /app

COPY . .
RUN npm ci
RUN npx nx run @tweet/user-ms:build

# ===== STAGE 2: Runtime =====
FROM node:20-slim
WORKDIR /app

# Copy compiled output and generated package.json
COPY --from=builder /app/dist/apps/user-ms ./dist

# Install only runtime dependencies
WORKDIR /app/dist
RUN npm install --omit=dev --ignore-scripts

# Switch back to /app so we can use relative path like dist/main.js when starting
WORKDIR /app

# Expose and run
EXPOSE 3000
CMD ["node", "dist/main.js"]
