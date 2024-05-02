import mongoose from 'mongoose';

const { Schema } = mongoose;

const consomglobalSchema = new Schema({
  local_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AirLocalCompresseur',
    default: null
  },
  pression_1: {
    type: Number,
    default: null
  },
  heurefonction: {
    type: Number,
    default: null
  },
  pression_2: {
    type: Number,
    default: null
  },
  temperature: {
    type: Number,
    default: null
  },
  pointderose: {
    type: Number,
    default: null
  },
  tauxdecharge: {
    type: Number,
    default: null
  },
  debit: {
    type: Number,
    default: null
  },
  production: {
    type: Number,
    default: null
  },
  date: {
    type: Date,
    default: null
  },
  heure: {
    type: String,
    default: null
  },
  productionpression: {
    type: Number,
    default: null
  }
});

consomglobalSchema.path('local_id').validate(async function(value) {
  if (value !== null) {
    const airLocalCompresseur = await mongoose.model('AirLocalCompresseur').findById(value);
    if (!airLocalCompresseur) {
      throw new Error('AirLocalCompresseur does not exist');
    }
  }
}, 'Invalid AirLocalCompresseur ID');

const Consomglobal = mongoose.model('Consomglobal', consomglobalSchema);

export default Consomglobal;
