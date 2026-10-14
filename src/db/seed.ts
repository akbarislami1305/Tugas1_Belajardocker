import "dotenv/config";
import { db, pool } from "./index.js";
import { spots } from "./schemas/spots.schema.js";

export const defaultSpots = [
  // C001 - Kopi Kenangan Fatmawati
  {
    name: "Kopi Kenangan Fatmawati",
    description: "Kopi Kenangan adalah cafe yang menawarkan berbagai minuman kopi dan non-kopi dengan konsep grab-and-go. Tempat ini juga cocok untuk bekerja santai, meeting ringan, maupun sekadar menikmati waktu sendiri dengan suasana yang nyaman dan kekinian.",
    facilities: "Cafe",
    spotType: "indoor" as const,
    crowdedness: "high" as const,
    atmosphere: "busy" as const,
    visitType: "group" as const,
    mood: "focused" as const,
  },
  // C002 - Lima Mangkok Bistro
  {
    name: "Lima Mangkok Bistro",
    description: "Bistro yang nyaman dengan desain interior estetik, menyajikan aneka rice bowl dan kopi. Cocok untuk makan siang produktif maupun kerja santai.",
    facilities: "Cafe",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "relaxed" as const,
  },
  // C003 - Foreword Library
  {
    name: "Foreword Library",
    description: "Perpustakaan privat dengan suasana homey dan estetik. Tempat ini sangat menjaga ketenangan, sehingga cocok untuk kamu yang butuh konsentrasi penuh tanpa gangguan suara.",
    facilities: "Perpustakaan",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "focused" as const,
  },
  // C004 - Erasmus Huis
  {
    name: "Erasmus Huis",
    description: "Perpustakaan pusat kebudayaan Belanda dengan desain interior minimalis serba putih. Suasananya sangat dingin, tenang, dan memberikan kesan profesional untuk membaca atau mengerjakan tugas.",
    facilities: "Perpustakaan",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "focused" as const,
  },
  // C005 - Urban Forest Cipete
  {
    name: "Urban Forest Cipete",
    description: "Area terbuka hijau di tengah kota yang asri. Cocok untuk kamu yang bosan di dalam ruangan dan ingin mengerjakan tugas dengan suasana santai sambil menikmati udara segar di bawah pepohonan.",
    facilities: "Taman",
    spotType: "outdoor" as const,
    crowdedness: "high" as const,
    atmosphere: "busy" as const,
    visitType: "group" as const,
    mood: "relaxed" as const,
  },
  // C006 - WŌRK-UNUSUAL JAKARTA
  {
    name: "WŌRK-UNUSUAL JAKARTA",
    description: "Kafe minimalis dengan area open space yang asri. Dikenal sebagai spot favorit untuk WFC karena suasana yang tenang dan fasilitas penunjang kerja yang lengkap.",
    facilities: "Cafe",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "focused" as const,
  },
  // C007 - Tebet Eco Park
  {
    name: "Tebet Eco Park",
    description: "Taman modern dengan jembatan ikonik yang menghubungkan dua area hijau. Sangat pas untuk kamu yang ingin menyegarkan pikiran di tengah kota, jalan santai di antara pepohonan, atau sekadar duduk tenang menikmati suasana asri.",
    facilities: "Taman",
    spotType: "outdoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "relaxed" as const,
  },
  // C008 - TierSpace
  {
    name: "TierSpace",
    description: "Coworking space yang didesain agar terasa seperti rumah sendiri. Memiliki area indoor dan semi-outdoor yang seimbang, cocok untuk bekerja dengan suasana yang tidak terlalu kaku namun tetap produktif.",
    facilities: "Coworking Space",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "group" as const,
    mood: "focused" as const,
  },
  // C009 - Cinere Garden Food Street
  {
    name: "Cinere Garden Food Street",
    description: "Pusat kuliner outdoor yang asri dengan banyak pilihan jajanan. Pas banget buat kamu yang ingin cari makan malam bareng teman atau keluarga sambil menikmati udara terbuka dan suasana yang santai.",
    facilities: "Pusat Kuliner, Food Court, Area Terbuka",
    spotType: "outdoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "group" as const,
    mood: "relaxed" as const,
  },
  // C010 - Perpustakaan Freedom
  {
    name: "Perpustakaan Freedom",
    description: "Menawarkan rak buku tinggi yang ikonik dan area duduk yang sangat luas. Tempat ini adalah pilihan utama bagi mahasiswa atau peneliti yang mencari referensi buku sekaligus tempat kerja yang sunyi.",
    facilities: "Perpustakaan",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "focused" as const,
  },
  // C011 - Galeri Salihara
  {
    name: "Galeri Salihara",
    description: "Galeri seni kontemporer dengan desain arsitektur yang unik dan modern. Tempat ini sangat menjaga ketenangan, sehingga cocok untuk kamu yang butuh konsentrasi penuh atau ingin menikmati pameran seni tanpa gangguan suara.",
    facilities: "Galeri Seni, Pusat Kebudayaan",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "focused" as const,
  },
  // C012 - GoWork Fatmawati
  {
    name: "GoWork Fatmawati",
    description: "Ruang kerja komersial dengan fasilitas premium. Sangat ideal jika kamu membutuhkan koneksi internet yang sangat stabil dan lingkungan kerja yang dikelilingi oleh profesional lainnya.",
    facilities: "Coworking Space",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "group" as const,
    mood: "focused" as const,
  },
  // C013 - Dia.Lo.Gue Artspace
  {
    name: "Dia.Lo.Gue Artspace",
    description: "Galeri seni kontemporer dengan desain interior minimalis serba putih yang ikonik. Suasananya memberikan kesan profesional namun santai, sangat pas untuk kamu yang ingin membaca, mengerjakan tugas, atau sekadar mencari inspirasi di antara karya seni.",
    facilities: "Galeri Seni, Pusat Kebudayaan, Kafe",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "focused" as const,
  },
  // C014 - Museum Layang-layang Indonesia
  {
    name: "Museum Layang-layang Indonesia",
    description: "Museum unik yang menyimpan koleksi ribuan layang-layang dari berbagai penjuru nusantara dan dunia. Suasananya yang homey dan tradisional sangat pas untuk kamu yang ingin belajar sejarah sambil mencoba workshop membuat layang-layang sendiri.",
    facilities: "Museum, Edukasi",
    spotType: "indoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "group" as const,
    mood: "relaxed" as const,
  },
  // C015 - Taman Cempaka
  {
    name: "Taman Cempaka",
    description: "Area terbuka hijau di tengah kota yang asri. Cocok untuk kamu yang bosan di dalam ruangan dan ingin mengerjakan tugas dengan suasana santai sambil menikmati udara segar di bawah pepohonan yang rindang.",
    facilities: "Taman",
    spotType: "outdoor" as const,
    crowdedness: "low" as const,
    atmosphere: "quiet" as const,
    visitType: "alone" as const,
    mood: "relaxed" as const,
  },
];

export async function runSeed() {
  try {
    const existingSpots = await db.select().from(spots);
    if (existingSpots.length === 0) {
      console.log("🌱 Database kosong, memasukkan data default 15 spots...");
      await db.insert(spots).values(defaultSpots);
      console.log("✅ Seeding selesai! 15 spots berhasil dimasukkan.");
    } else {
      console.log(`ℹ️ Data spots sudah tersedia (${existingSpots.length} spots).`);
    }
  } catch (error) {
    console.error("❌ Gagal saat menjalankan seeding:", error);
  }
}

if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  runSeed()
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Error saat seeding:", err);
      pool.end();
      process.exit(1);
    });
}
