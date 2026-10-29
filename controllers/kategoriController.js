const Kategori = require("../models/kategoriModel");

exports.getAll = async (req, res) => {
  const data = await Kategori.find().sort({ nama: 1 });
  res.json(data);
};

exports.create = async (req, res) => {
  const kategori = await Kategori.create(req.body);
  res.status(201).json(kategori);
};
