// models/airLocalCompresseur.js
import mongoose from 'mongoose';

const airLocalCompresseurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  dossier: {
    type: String,
    default: null
  },
  dossierprod: {
    type: String,
    default: null
  }
});

const AirLocalCompresseur = mongoose.model('AirLocalCompresseur', airLocalCompresseurSchema);

export default AirLocalCompresseur;
