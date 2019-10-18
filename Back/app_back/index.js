const express = require('express');
// const request = require('request');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');


const server = express();

//...
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());

server.get("/", function(req, res) {
    console.log("API Rodando")
})

server.post("/calculo", function(req, res) {
    const nome = req.body.nome;
    const cep = req.body.cep;
    const renda = req.body.renda;
    const dependentes = req.body.dependentes;
    if (!renda || !dependentes || !nome) {
        return res.status(400).json({ error: "Parametros informados são inválidos" })
    }
    const calculoTotal = (parseInt(renda) / (parseInt(dependentes) + 1));
    // request.post({
    //     headers: {
    //         'content-type': 'application/json',
    //         'referer': '*'
    //     },
    //     url: `https://viacep.com.br/ws/${cep}/json`,
    // }, function(error, response, body){
    //     if(error || response.statusCode == 400){
    //         return res.status(400).json({error:"CEP Inválido"})
    //     }
    //     console.log(body);
    //     const cidade = JSON.parse(body).localidade;
    //     const logradouro = JSON.parse(body).logradouro || undefined;
    //     const bairro = JSON.parse(body).bairro || undefined;
    //     res.json({ nome, cep, renda, dependentes, cidade, bairro, logradouro, calculoTotal })
    // })
    axios.get(`https://viacep.com.br/ws/${cep}/json`).then(function(response) {
        if (response.status == 400) {
            return res.status(400).json({ error: "Dados invalidos no formulario" })
        }
        const cidade = response.data.localidade;
        const logradouro = response.data.logradouro || "Sem informações";
        const bairro = response.data.bairro || "Sem informações";
        res.json({ nome, cep, renda, dependentes, cidade, bairro, logradouro, calculoTotal })
    }).catch(function() {
        return res.status(400).json({ error: "Requisição falhou" })
    })

})

server.listen(3000, function() {
    console.log("API Rodando");
});