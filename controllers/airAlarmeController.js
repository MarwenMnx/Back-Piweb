
import nodemailer from 'nodemailer';
import AirAlarme from '../models/airAlarme.js';
import twilio from 'twilio';


// Configure Twilio with your account SID and auth token
const accountSid = 'AC5bbe5cc844aa';
const authToken = '32c28d0999f005c9';
const client = twilio(accountSid, authToken,);
 // Route pour envoyer un SMS
 export const postSms = async (req, res) => {

  const { destinataire, message } = req.body;

  client.messages
      .create({
          body: message,
          to: '+21694489044', // Numéro de téléphone de destination
          from: '+19073122726' // Numéro Twilio de l'appelant
      })
      .then(message => {
          console.log('Message envoyé avec succès:', message.sid);
          res.send('Message envoyé avec succès');
      })
      .catch(error => {
          console.error('Erreur lors de l\'envoi du message:', error);
          res.status(500).send('Erreur lors de l\'envoi du message');
      });
};

// Route pour initier l'appel
export const postCall = async (req, res) => {

  const { to, from, url } = req.body; // Assuming you'll send 'to', 'from', and 'url' in the request body
  
  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml', // URL du TwiML avec les instructions pour l'appel
      to: '+21623671593', // Numéro de téléphone à appeler
      from: '+18583337752' // Votre numéro Twilio
    })
    .then(call => {
      console.log(call.sid); // ID de l'appel
      res.send('Appel en cours...'); // Réponse à la demande HTTP
    })
    .catch(err => {
      console.error(err); // Gérer les erreurs
      res.status(500).send('Erreur lors de l\'appel.');
    });
};
/******* */
// Contrôleur ou gestionnaire de routage pour la création d'une nouvelle alarme (partie back-end)
export const post = async (req, res) => {
  try {
    const { typealarmeId, equipementairId, dateAlarme, heureAlarme, description, etatvu } = req.body;

    // Créer une nouvelle instance de l'alarme
    const airAlarme = new AirAlarme({ typealarmeId, equipementairId, dateAlarme, heureAlarme, description, etatvu });

    // Enregistrer la nouvelle alarme
    const savedAirAlarme = await airAlarme.save();

    // Vérifier si la date de l'alarme est dans un jour à partir de la date actuelle
    const oneDayInMillis = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans un jour
    const alarmDate = new Date(dateAlarme);
    const currentDate = new Date();
    if (alarmDate.getTime() - currentDate.getTime() <= oneDayInMillis) {
      // Si oui, envoyer un e-mail
      const mailOptions = {
        from: 'lachkhemines70@gmail.com',
        to: 'lachkhemines70@gmail.com',
        subject: 'Alarme sur la machine d\'air comprimé',
        text: 'Il reste juste un jour pour l\'entretien. Veuillez vérifier.',
        attachments: [{
          filename: "image.jpeg",
          path: "https://abcradio.fm/happy-to-work-with-you-quotes/"
        }]
      };
      // Envoyer l'e-mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('E-mail envoyé: ' + info.response);
        }
      });
    }

    // Répondre avec l'alarme ajoutée et le code de statut 201 (Créé)
    res.status(201).json(savedAirAlarme);
  } catch (error) {
    // Gérer les erreurs en renvoyant un message d'erreur et un code de statut 400 (Requête incorrecte)
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/******* */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'lachkhemines70@gmail.com',
      pass: 'spnu nlvj ashp efmv'
  }
});
/*export const postEmail = async (req, res) => {

  const mailOptions = {
      from: 'lachkhemines70@gmail.com',
      to: 'lachkhemines70@gmail.com',
      subject: 'Alarme sur la machine d\'air comprimé',
      text: 'Il reste juste un jour pour l\'entretien . Veuillez vérifier.',
      attachments: [{
        filename:"image.jpeg",
        path: "https://abcradio.fm/happy-to-work-with-you-quotes/ ",
      },],
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
    } else {
        console.log('E-mail envoyé: ' + info.response);
        res.send('E-mail envoyé avec succès');
    }
});
};*/


/*export const post = async (req, res) => {
  try {
    // Validate request body (optional but recommended)
    const {  typealarmeId, equipementairId, dateAlarme, heureAlarme, description, etatvu } = req.body;
    const airAlarme = new AirAlarme({ typealarmeId, equipementairId, dateAlarme, heureAlarme, description, etatvu });

    // Save the new air alarm document
    const savedAirAlarme = await airAlarme.save();
    res.status(201).json(savedAirAlarme); // Respond with created air alarm and status code 201 (Created)
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ error: error.message }); // Respond with error message and status code 400 (Bad Request)
  }
};*/

// **READ (GET)**

// Get all air alarms
export const get = async (req, res) => {
  try {
    const airalarmes = await AirAlarme.find();
    res.json(airalarmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching air alarms' }); // Respond with generic error message and status code 500 (Internal Server Error)
  }
};

// Get air alarm by ID
export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const airAlarmes = await AirAlarme.findById(id);
    if (!airAlarmes) {
      return res.status(404).json({ error: 'Air alarm not found' }); // Respond with error message and status code 404 (Not Found)
    }
    res.json(airAlarmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching air alarm' });
  }
};

// **UPDATE (PUT)**
export const putById = async (req, res) => {

  try {
    const {  typealarmeId, equipementairId, dateAlarme, heureAlarme, description, etatvu } = req.body;
    const updatedAirAlarme = await AirAlarme.findByIdAndUpdate(
      req.params.id,
      { id, typealarmeId, equipementairId, dateAlarme, heureAlarme, description, etatvu },
      { new: true } // Return the updated document
    );
    if (!updatedAirAlarme) {
      return res.status(404).json({ error: 'Air alarm not found' });
    }
    res.json(updatedAirAlarme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating air alarm' });
  }
};

// **DELETE (DELETE)**
export const deleteById = async (req, res) => {

  try {
    const deletedAirAlarme = await AirAlarme.findByIdAndDelete(req.params.id);
    if (!deletedAirAlarme) {
      return res.status(404).json({ error: 'Air alarm not found' });
    }
    res.json({ message: 'Air alarm deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting air alarm' });
  }
};
//Obtenir les alarmes d'air comprimé associées à un équipement spécifique
export const getByEquipementId = async (req, res) => {

  try {
    const equipementId = req.params.equipementId;
    const alarmes = await AirAlarme.find({ equipementairId: equipementId });
    res.status(200).json(alarmes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des alarmes d\'air comprimé pour cet équipement.' });
  }
};
//Marquer une alarme d'air comprimé comme vue (changement de l'état "etatvu") 
export const putIdVue = async (req, res) => {

  try {
    const alarme = await AirAlarme.findByIdAndUpdate(req.params.id, { etatvu: true }, { new: true });
    if (!alarme) {
      return res.status(404).json({ error: 'Alarme d\'air comprimé non trouvée.' });
    }
    res.status(200).json(alarme);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'état vue de l\'alarme d\'air comprimé.' });
  }
};

