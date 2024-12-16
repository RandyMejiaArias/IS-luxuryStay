# Caso Sistema de Gestión de Reservas para un Hotel
El sistema consta de 3 aplicaciones distintas, cada una se encuentra en su respectivo directorio.

## Contrucción y ejecucion
Se puede construir los 3 proyectos en conjunto usando docker con el archivo docker-compose ubicado en la raíz del proyecto.

Las 3 aplicaciones son hechas con NodeJs, para construirlas independientemente se puede ejecutar el comando npm install en la raíz de cada proyecto.

Y para ejecutarlos, para desarrollo se puede usar el comando npm run dev y para correrlos para producción npm start.

# Ejecución
## Microservicio
El microservicio sirve para registrar nuevas aplicaciones y actualizar el estado de las mismas.

El microservicio corre en el puerto 4000 por lo que su ruta base sería:

```localhost:4000/```

### Crear Habitacion
#### Método:
    POST
#### Ruta: 
> /rooms
#### Datos enviados
##### body:
    {
        "room_number": 8,
        "room_type": "Suite"
    }
#### Respuesta
##### Exitoso - 201:
    {
        "message": "Room created successfully",
        "data": {
            "room_id": 9,
            "room_number": 8,
            "room_type": "Suite",
            "room_status": "available"
        }
    }
##### Errores
    - 400 : Room already exists.
    - 500 : Error interno del servidor.
### Actualizar estado de la habitación
#### Método:
    PATCH
#### Ruta: 
> /rooms/:room_id
#### Datos enviados
##### body:
    {
        "room_status": "maintenance",
    }
#### Respuesta
##### Exitoso - 200:
    {
        "message": "Room updated successfull",
    }
##### Errores
    - 404 : Room not exist.
    - 500 : Error interno del servidor.
---
### Listar Habitaciones
#### Método:
    GET
#### Ruta: 
> /rooms
#### Respuesta
##### Exitoso - 200:
    [
      {
          "room_id": 1,
          "room_number": "1",
          "room_type": "Single",
          "room_status": "available"
      },
      {
          "room_id": 2,
          "room_number": "2",
          "room_type": "Single",
          "room_status": "available"
      }
    ]
##### Errores
    - 500 : Error interno del servidor.
---
## Servicio SOAP
El servicio SOAP sirve para listar las habitaciones que esten disponibles, recibiendo como parámetros la fecha de inicio, fecha de fin y tipo de habitación. Esté servicio devolverá una lista de habitaciones que estén disponibles en las fechas consultadas.

Para esto se conecta al microservicio definido anteriormente, específicamente al endpoint de listar habitaciones.

El servicio corre en el puerto 3000, la ruta para acceder a el es:

```localhost:3000/wsdl```

---
## API
El api sirve para registrar nuevas reservas, así como obtener información de una reserva en específico o cancelar la misma.

El api corre en el puerto 4001 por lo que su ruta base sería:

```localhost:4000/```

### Crear Reserva
#### Método:
    POST
#### Ruta: 
> /reservations
#### Datos enviados
##### body:
    {
        "room_number": 8,
        "customer_name": "Randy Mejia",
        "start_date: "2024-12-20",
        "end_date": "2024-12-22"
    }
#### Respuesta
##### Exitoso - 201:
    {
        "message": "Reservation created successfully",
        "data": {
            "reservation_id": 1,
            "room_number": 8,
            "customer_name": "Randy Mejia",
            "start_date": "2024-12-20T00:00:00.000Z",
            "end_date": "2024-12-22T00:00:00.000Z"
            "status": "pending"
        }
    }
##### Errores
    - 400 : Room are not available
    - 404 : Room not found
    - 500 : Error interno del servidor.
### Obtener Reserva
#### Método:
    GET
#### Ruta: 
> /reservations/:reservationId
#### Datos enviados
##### params:
    reservationId
#### Respuesta
##### Exitoso - 201:
    {
        "reservation_id": 1,
        "room_number": 8,
        "customer_name": "Randy Mejia",
        "start_date": "2024-12-20T00:00:00.000Z",
        "end_date": "2024-12-22T00:00:00.000Z"
        "status": "pending"
    }
##### Errores
    - 404 : Reservation not found
    - 500 : Error interno del servidor.
### Cancelar Reserva
#### Método:
    DELETE
#### Ruta: 
> /reservations/:reservationId
#### Datos enviados
##### params:
    reservationId
#### Respuesta
##### Exitoso - 200:
    {
        "message": "Reservation cancelled successfully",
    }
##### Errores
    - 404 : Reservation not found
    - 500 : Error interno del servidor.
---
