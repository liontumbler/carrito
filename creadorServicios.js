const fs = require('fs');

//consulta la tabla donde 

function createExpressAppFile(url, method) {
    const fileContent = `
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    const response = await service('${url}', '${method}', req.body);
    res.send('hola mundo');
});

app.listen(3000, () => {
    console.log('corriendo');
});
`;

    // Escribimos el contenido en un archivo llamado 'app.js'
    fs.writeFile('app.js', fileContent, (err) => {
        if (err) {
            console.error('Error al crear el archivo:', err);
        } else {
            console.log('Archivo app.js creado con éxito');
        }
    });
}

//console.log('arranco');


// Obtenemos los parámetros desde la línea de comandos
const url = process.argv[2];  
const method = process.argv[3];

// Validamos que se hayan proporcionado ambos parámetros
if (url && method) {
    createExpressAppFile(url, method);
} else {
    console.log('Por favor proporciona una URL y un método HTTP.');
    console.log('Ejemplo: node createFile.js https://example.com/api POST');
}