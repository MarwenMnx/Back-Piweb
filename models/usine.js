import  mongoose from 'mongoose';

const { Schema } = mongoose;
const UsineSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  objectifUsine: {
    type: String,
    required: true,
  },
});
const Usine = mongoose.model('Usine', UsineSchema);

export default Usine;