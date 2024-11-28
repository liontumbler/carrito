const express =  require('express');
const app = express();

app.get('/', async (req, res) => {
    let token = null;
    if (req.headers['authorization']) {
        token = req.headers['authorization']
    }
    const res = await service(url, method, req.body, token)
    res.send('hola mundo');
});

app.listen(3000, () => {
    console.log('corriendo');
})

function service(url, method, data = null, token = null) {
    let parametros = {
        method: method, 
        headers: {
            "Content-Type": "application/json"
        },
    }

    if (token)
        parametros.headers['Authorization'] = token; //`Bearer ${token}`

    if (data && JSON.stringify(data) != JSON.stringify({}))
        parametros['body'] = JSON.stringify(data)

    return fetch(url, parametros)
    .then((res) => res.json())
    .catch((error) => {
        console.error("Error:", error) 
        return error;
    })
}