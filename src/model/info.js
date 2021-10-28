const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const InfoSchema = Schema(
  {
    id: { type: String, required: true, trim: true, unique: true },
    nombre: {
      type: String,
      trim: true,
    },
    tipoDocumento: {
      type: String,
      trim: true,
    },
    fechaNacimiento: {
      type: String,
      trim: true,
    },
    fechaAfiliacion: {
      type: String,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    nivelAfiliado: {
      type: String,
      trim: true,
    }
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Info", InfoSchema);
