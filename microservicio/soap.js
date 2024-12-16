import express from 'express';
import soap from 'soap';
import { sequelize } from './database/index.js';
import { checkAvailability } from './services/availabilityService.js';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Sincronizar la base de datos
sequelize.sync({ alter: true }).then(() => console.log('Database synchronized'));

// Configurar SOAP
const wsdlPath = path.resolve('src/wsdl/availability.wsdl');
const service = {
  AvailabilityService: {
    AvailabilityPort: {
      CheckAvailability: checkAvailability
    }
  }
};

soap.listen(app, '/wsdl', service, wsdlPath, () => {
  console.log(`SOAP service running on http://localhost:${PORT}/wsdl`);
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
