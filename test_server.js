import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';

// Pfad zu Ihrer C++-executable Datei
const executablePath = './test'; // oder './myprogram.exe' unter Windows




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'obsidian_with_position.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
    update_obsidian();
  } catch (error) {
    console.error('Fehler beim Lesen der Datei:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

function update_obsidian(){
    exec(executablePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Fehler beim Ausführen des Programms: ${error.message}`);
            return;
        }
    
        if (stderr) {
            console.error(`Fehlerausgabe: ${stderr}`);
            return;
        }
    
        // Ausgabe des Programms
        console.log(`Ausgabe: ${stdout}`);
    });
}