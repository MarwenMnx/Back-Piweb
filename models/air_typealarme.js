import  mongoose from 'mongoose';
const { Schema } = mongoose;


const AirTypeAlarmeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const AirTypeAlarme = mongoose.model('AirTypeAlarme', AirTypeAlarmeSchema);

export default AirTypeAlarme;