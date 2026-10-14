import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./index.js";

export async function runMigrations(maxRetries = 5, retryDelayMs = 2000) {
  console.log("⏳ Menjalankan migrasi database...");
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await migrate(db, { migrationsFolder: "./drizzle" });
      console.log("✅ Migrasi database berhasil dijalankan!");
      return;
    } catch (error) {
      console.warn(`⚠️ Percobaan migrasi ke-${attempt} gagal:`, (error as Error).message);
      if (attempt === maxRetries) {
        console.error("❌ Gagal menjalankan migrasi setelah batas maksimal percobaan.");
        throw error;
      }
      console.log(`Menunggu ${retryDelayMs / 1000} detik sebelum mencoba lagi...`);
      await new Promise((res) => setTimeout(res, retryDelayMs));
    }
  }
}

// Jalankan otomatis jika dipanggil langsung via CLI/node
if (process.argv[1]?.endsWith("migrate.ts") || process.argv[1]?.endsWith("migrate.js")) {
  runMigrations()
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(1);
    });
}
