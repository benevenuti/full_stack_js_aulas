import http = require('http')
import Cliente = require('./Cliente')
import Funcionario = require('./Funcionario')

var cliente = new Cliente()
cliente.nome = 'Filipe B'

var funcionario = new Funcionario()
funcionario.nome = 'Funcionario F'

http.createServer(function(request, response){
    response.write(200, {"Content-Type": "text/html"})
    response.write(`Cliente : ${cliente.nome} - Funcionário : ${funcionario.nome}`)
    response.end()
}).listen(8000)