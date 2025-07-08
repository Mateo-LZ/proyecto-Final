# TechStore - Proyecto Final SENA

TechStore es una tienda virtual desarrollada como proyecto final para el SENA. Permite a los usuarios explorar y comprar productos tecnológicos, gestionar un carrito de compras y utilizar un chatbot basado en IA (Mistral) para consultas.

## Características

- Catálogo de productos tecnológicos (audífonos, monitores, consolas, etc.)
- Carrito de compras interactivo
- Registro e inicio de sesión de usuarios con preguntas de seguridad
- Chatbot integrado usando la API de Mistral AI
- Interfaz moderna y responsiva
- Backend en Node.js con Express

## Estructura del Proyecto

```
├── assets/           # Imágenes y videos de productos
├── style/            # Hojas de estilo CSS
├── view/             # Vistas HTML y scripts de frontend
├── server.js         # Servidor Express (backend)
├── package.json      # Dependencias y scripts de npm
├── .env              # Variables de entorno (API keys, etc.)
└── index.html        # Página principal
```

## Instalación

1. Clona este repositorio.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` en la raíz con tu API key de Mistral:
   ```
   MISTRAL_API_KEY=tu_api_key_aqui
   ```
4. Inicia el servidor:
   ```sh
   npm start
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

- Navega por las diferentes categorías de productos.
- Regístrate e inicia sesión para acceder a funcionalidades completas.
- Usa el chatbot para resolver dudas sobre productos o el sitio.
- Añade productos al carrito y finaliza tu compra.

## Dependencias

- express
- cors
- body-parser
- dotenv
- node-fetch

## Notas

- El almacenamiento de usuarios y sesiones se realiza en el `localStorage` del navegador.
- El chatbot utiliza la API de Mistral, asegúrate de tener una API key válida.

---

Desarrollado como proyecto académico para el SENA.
