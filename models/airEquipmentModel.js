const mongoose = require("mongoose");

const airEquipementSchema = new mongoose.Schema({
    marque: String,
    modele: String,
    nom: String,
    puissance_max: Number,
    debit: Number,
    puissancemoteur: Number,
    nserie: Number,
    pressioncharge: Number,
    pressiondecharge: Number,
    anneefabrication: Number,
    type: String,
    alertentretien: String,
    dossier: String,
    adresseip: String,
    equipementair: String,
    superviseur: String,
    date_entretien: String,
    dateperiodesecheur: String,
    nbrhprochain: Number,
    hfonctionnement: Number,
    remarque: String,
    niveauprobleme: String,
    dateajout: String,
    datemodif: String,
    datesuppression: String,
    suppression: Boolean,
}); 


module.exports = mongoose.model("AirEquipement", airEquipementSchema);
