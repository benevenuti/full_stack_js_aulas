var http = require('http');
var Cliente = require('./Cliente');
var Funcionario = require('./Funcionario');
var cliente = new Cliente();
cliente.nome = 'Filipe B';
var funcionario = new Funcionario();
funcionario.nome = 'Funcionario F';
http.createServer(function (request, response) {
    response.write(200, { "Content-Type": "text/html" });
    response.write("Cliente : " + cliente.nome + " - Funcion\u00E1rio : " + funcionario.nome);
    response.end();
}).listen(8000);
