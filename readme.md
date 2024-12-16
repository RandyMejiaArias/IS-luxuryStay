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
    - 400 : No se pudó guardar. Ya existe una habitación con el mismo número.
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