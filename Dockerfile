# ==========================================
# Stage 1: Build stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Salin manifest dependensi
COPY package*.json ./

# Install seluruh dependensi untuk build TypeScript
RUN npm install

# Salin konfigurasi dan source code
COPY tsconfig.json ./
COPY drizzle.config.ts ./
COPY drizzle ./drizzle
COPY src ./src

# Kompilasi TypeScript ke JavaScript (dist)
RUN npm run build

# ==========================================
# Stage 2: Production runtime stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Atur environment produksi
ENV NODE_ENV=production
ENV PORT=8080

# Salin file package dan install hanya dependensi production
COPY package*.json ./
RUN npm install --omit=dev

# Salin hasil build dan migration files dari stage builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle

# Expose port aplikasi backend
EXPOSE 8080

# Jalankan aplikasi (menjalankan auto-migrasi lalu start server)
CMD ["npm", "start"]
