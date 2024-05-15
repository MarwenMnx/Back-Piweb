import mongoose from 'mongoose';
const { Schema } = mongoose;

// Create schema
const AirAlarmeSchema = new Schema({

  typealarmeId: {
    type: Number,
    required: true,
  },
  equipementairId: {
    type: Number,
    required: true, 
  },
  dateAlarme: {
    type: Date,
    required: true,
  },
  heureAlarme: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  etatvu: {
    type: Boolean,
    required: true,
  },
});

const AirAlarme = mongoose.model('AirAlarme', AirAlarmeSchema);

export default AirAlarme;
