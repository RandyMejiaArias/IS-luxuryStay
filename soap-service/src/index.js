import { app } from './app.js';
import { service } from './soap/service.js';
import fs from 'fs';
import soap from 'soap';

const wsdl = fs.readFileSync('./src/soap/wsdl.xml', 'utf8');

async function main () {
  // Servicio SOAP
  app.listen(3000, () => {
    soap.listen(app, '/wsdl', service, wsdl);
    console.log('SOAP service listening on http://localhost:3000/wsdl');
  });
}

main();



