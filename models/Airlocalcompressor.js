import mongoose from 'mongoose';

const { Schema } = mongoose;

const airLocalCompresseurSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
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
