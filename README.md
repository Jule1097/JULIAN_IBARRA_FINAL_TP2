# Proyecto API de Gestión de Productos (Stock) - Modo MongoDB

Esta API RESTful en Node.js con Express permite gestionar productos (stock) utilizando MongoDB Atlas como persistencia de datos. Incluye autenticación básica, CRUD completo para productos y un endpoint para consumir y generar un CSV desde una API externa.

## Requisitos Previos
- Node.js (versión 16 o superior)
- Cuenta en MongoDB Atlas (para la base de datos en la nube)
- VS Code con extensión REST Client (para ejecutar tests en `.http`)

## Instalación
1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   cd final-tp2
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno:
   - Copia el archivo `.env` de ejemplo (si existe) o crea uno basado en el proporcionado.
   - Asegúrate de tener:
     ```
     SERVER_HOST
     SERVER_PORT
     API_KEY
     MONGO_URI
     DB_PATH_CSV
     ```
   - Para MongoDB Atlas: Accede a tu cluster en https://cloud.mongodb.com/v2/62ce1de9d3b2494c35392f93#/metrics/replicaSet/692ddd87b0306b1c712f36f1/explorer/test/productos/find, 

## Cómo Levantar el Proyecto en Modo MongoDB
1. Verifica que MongoDB Atlas esté configurado y accesible (prueba la conexión en la consola de Atlas).
2. Ejecuta el servidor:
   ```
   npm run dev
   ```
   - El servidor se levantará en `http://127.0.0.1:3000`.
   - Verifica en la consola que diga "Conectado a MongoDB" y "Servidor corriendo en puerto 3000".

3. Si hay errores de conexión a MongoDB, revisa la URI en `.env`.

## Endpoints Principales
- **Productos** (CRUD):
  - `POST /api/v1/productos` - Crear producto (sin auth)
  - `GET /api/v1/productos` - Listar productos (sin auth)
  - `GET /api/v1/productos/:id` - Obtener producto por ID (sin auth)
  - `PUT /api/v1/productos/:id` - Incrementar stock (requiere `x-api-key`)
  - `DELETE /api/v1/productos/:id` - Eliminar producto (requiere `x-api-key`)
- **CSV Externo**:
  - `GET /api/v1/albums/csv` - Descarga/genera CSV de los primeros 15 albums (sin auth)

## Tests
- Usa los archivos `.http` en `src/test/` con REST Client en VS Code.
- Ejemplos:
  - `productos.endpoints.http`: Tests para productos (crear, listar, editar, eliminar con/sin auth).
  - `albums15.test.http`: Test para el endpoint CSV.
- Para autenticación: Usa `x-api-key: supersecretapikey12345` en headers para endpoints protegidos.

## Notas Adicionales
- La persistencia es solo en MongoDB (no hay modo JSON implementado).
- El CSV se guarda en `src/database/albums_15.csv` y se devuelve en la respuesta.
- Errores siguen el formato `{statusCode, error}`.
