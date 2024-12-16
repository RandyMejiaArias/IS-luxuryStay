import soap from 'soap';

export const checkSoapAvailability = async (room_type, start_date, end_date) => {
  return new Promise((resolve, reject) => {
    
    const url = 'http://soap-service:3000/wsdl';

    const args = {
      startDate: start_date,
      endDate: end_date,
      roomType: room_type  
    };

    soap.createClient(url, (err, client) => {
      if (err) {
        return reject('Error al crear el cliente SOAP: ' + err);
      }

      client.CheckAvailability(args, (err, result) => {
        if (err) {
          return reject('Error en la llamada al servicio SOAP: ' + err);
        }

        const { availableRooms } = result.availableRooms;

        resolve(availableRooms);
      });
    });
  });
};
