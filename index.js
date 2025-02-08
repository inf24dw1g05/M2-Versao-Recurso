/*'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

*/

'use strict';

const path = require('path');
const http = require('http');
const oas3Tools = require('oas3-tools');
const serverPort = 8080;
const db = require('./db/config');

// Teste de conexão com o banco de dados
async function testDatabaseConnection() {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
        process.exit(1);
    }
}

// Configuração do Swagger
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// Inicializar o servidor após testar a conexão com o banco
testDatabaseConnection().then(() => {
    http.createServer(app).listen(serverPort, function () {
        console.log('Servidor escutando na porta %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui disponível em http://localhost:%d/docs', serverPort);
    });
});