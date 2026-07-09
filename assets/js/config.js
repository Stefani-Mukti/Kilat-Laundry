/* ==========================================================================
   Global site configuration
   Edit values here to update the whole site (name, WA number, hours, etc.)
   ========================================================================== */
window.SITE_CONFIG = {
  brandName: "KilatLaundry",
  tagline: "Laundry Antar-Jemput",
  whatsappNumber: "6281234567890", // format internasional tanpa "+"
  email: "halo@kilatlaundry.id",
  address: "Jl. Kaliurang KM 5 No. 12, Sleman, Yogyakarta",
  hoursWeekday: "07.00 – 21.00",
  hoursWeekend: "08.00 – 20.00",
  instagram: "https://instagram.com/kilatlaundry",
  facebook: "https://facebook.com/kilatlaundry",
  tiktok: "https://tiktok.com/@kilatlaundry",

  waMessage(context) {
    const messages = {
      default: "Halo KilatLaundry, saya ingin tanya-tanya soal layanan antar-jemput laundry.",
      order: "Halo KilatLaundry, saya ingin jadwalkan penjemputan laundry. Alamat saya: ",
      pricing: "Halo KilatLaundry, saya ingin tanya soal harga paket laundry.",
      services: "Halo KilatLaundry, saya ingin tanya soal layanan laundry yang tersedia.",
      coverage: "Halo KilatLaundry, saya ingin cek apakah area saya masuk jangkauan antar-jemput.",
      contact: "Halo KilatLaundry, saya ingin menghubungi tim CS.",
    };
    return messages[context] || messages.default;
  },

  waLink(context) {
    const text = encodeURIComponent(this.waMessage(context));
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  },
};
