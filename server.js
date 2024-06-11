const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const readJsonFile = () => {
  const data = fs.readFileSync('repertorio.json', 'utf8');
  return JSON.parse(data);
};

const writeJsonFile = (data) => {
  fs.writeFileSync('repertorio.json', JSON.stringify(data, null, 2), 'utf8');
};

// Muestra las canciones
app.get('/canciones', (req, res) => {
  const canciones = readJsonFile();
  res.json(canciones);
});



// agrega canciones
app.post('/canciones', (req, res) => {
  const canciones = readJsonFile();
  const newCancion = req.body;
  canciones.push(newCancion);
  writeJsonFile(canciones);
  res.status(201).send('Canción agregada');
});




// Edita canciones
app.put('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir id a número
    const updatedCancion = req.body;
    let canciones = readJsonFile();
    const index = canciones.findIndex((c) => c.id === id);
    if (index !== -1) {
      canciones[index] = { ...canciones[index], ...updatedCancion };
      writeJsonFile(canciones);
      res.send('Canción actualizada');
    } else {
      res.status(404).send('Canción no encontrada');
    }
  });
  


//borra canciones
app.delete('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    let canciones = readJsonFile();
    canciones = canciones.filter((c) => c.id != id);
    writeJsonFile(canciones);
    res.send('Canción eliminada');
  });



// crea la pagina
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
