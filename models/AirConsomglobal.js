// models/AirConsomglobal.js
import mongoose from 'mongoose';

const AirConsomglobalSchema = new mongoose.Schema({
  local_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AirLocalCompresseur'
  },
  pression_1: Number,
  heurefonction: Number,
  pression_2: Number,
  temperature: Number,
  pointderose: Number,
  tauxdecharge: Number,
  debit: Number,
  production: Number,
  date: Date,
  heure: String,
  productionpression: Number
});
const AirConsomglobal = mongoose.model('AirConsomglobal',  AirConsomglobalSchema);

export default AirConsomglobal;
