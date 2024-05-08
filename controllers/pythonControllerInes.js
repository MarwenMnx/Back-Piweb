// pythonRoutes.js


import express from 'express';
import path from 'path';
/*onst app = express();*/

// Définir le point de terminaison pour l'application Dash
export const getIA = async (req, res) => {
/*app.get('/dashboard', (req, res) => {*/
  // Transmettre le chemin du fichier Dash
  res.sendFile(path.join(__dirname, '../ines.py'));
};

// Définir les autres points de terminaison ou middleware si nécessaire

// Démarrer le serveur
/*const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/

/*import express from 'express';
//import { exec } from 'child_process';
import { spawn } from 'child_process';

export const getPython = async (req, res) => {
  let data1 ;
  const pythonOne = spawn ('pythone',['ines.py']);
  pythonOne.stdout.on('data', function(data){
    data1 = data.toString();
  })
  pythonOne.on('close',(code)=>{
    console.log("code", code)
    res.send(data1);
  })
}*/


/*export const getPython = async (req, res) => {
// Endpoint pour exécuter le script Python

    // Utilisez child_process pour exécuter le script Python
    exec('python ines.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur d'exécution du script Python: ${error.message}`);
            return res.status(500).send('Une erreur s\'est produite lors de l\'exécution du script Python.');
        }
        if (stderr) {
            console.error(`Erreur de sortie standard: ${stderr}`);
            return res.status(500).send('Une erreur s\'est produite lors de l\'exécution du script Python.');
        }
        console.log(`Résultat du script Python: ${stdout}`);
        res.send('Script Python exécuté avec succès.');
    });
};*/


