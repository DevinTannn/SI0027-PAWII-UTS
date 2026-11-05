// TODO A: Rancang Schema & Model Buku sesuai tabel skema pada README.md
//
// Ketentuan:
//   judul      String, wajib diisi, spasi di awal/akhir dibuang
//   isbn       String, wajib, UNIK, harus tepat 13 digit angka
//   penulis    Array of String (EMBEDDED), minimal 1 penulis
//   penerbit   Subdocument (EMBEDDED, tanpa _id sendiri):
//                nama  String, wajib
//                tahun Number, 1900 s.d. tahun berjalan
//   kategoriId ObjectId (REFERENCING ke model "Kategori"), wajib
//   stok       Number, default 0, tidak boleh negatif
//   createdAt  Date, default waktu saat ini
//
// Petunjuk: lihat models/kategoriModel.js sebagai contoh sintaks dasar,
// dan materi Pertemuan 9-10 (embedding vs referencing).

const mongoose = require("mongoose");

// TODO A1: buat schema subdocument penerbit
// TODO A2: buat bukuSchema
// TODO A3: export model dengan nama "Buku"
const penerbitSchema = new mongoose.Schema({
  nama: { 
    type: String, 
    required: [true, "Nama penerbit wajib diisi"],
  },
  tahun: { 
    type: Number,
    min: [1900, "Minimal terbit Tahun 1900"],
    max: [2026, "Maximal Tahun Sekarang"],
  }
}, { _id: false });

const bukuSchema = new mongoose.Schema({
  judul: { 
    type: String, 
    required: [true, "Nama Buku wajib diisi"],
    trim: true 
  },
  isbn: { 
    type: String, 
    required: [true, "Kode wajib diisi"],
    unique: true,
    match: [/^UN-\d{13}$/]
  },
  penulis: {
    type: [String],
    required: [true, "Buku wajib diisi"],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "Minimal harus ada 1 nama penulis"
    }
  },
  penerbit: {
    type: penerbitSchema,
    required: [true, "Informasi penerbit wajib diisi"]
  },
  kategoriId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "kategori", 
    required: [true, "Kategori ID wajib diisi"] 
  },
  stok: {
    type: Number,
    default: 0,
    min: [0, "Stok tidak boleh mines"],
  }
}, { 
  timestamps: true // Otomatis membuat createdAt dan updatedAt
});

module.exports = mongoose.model("Buku", bukuSchema);
