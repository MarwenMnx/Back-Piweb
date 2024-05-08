import mongoose from 'mongoose';


const { Schema } = mongoose;




const airSuperviseurSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  poste: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
 
});


const AirSuperviseur = mongoose.model('AirSuperviseur', airSuperviseurSchema);

export default AirSuperviseur;