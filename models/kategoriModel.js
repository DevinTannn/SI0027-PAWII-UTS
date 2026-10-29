const mongoose = require("mongoose");

const kategoriSchema = new mongoose.Schema({
  nama: { type: String, required: true, unique: true, trim: true },
  deskripsi: { type: String, default: "" },
});

module.exports = mongoose.model("Kategori", kategoriSchema);
