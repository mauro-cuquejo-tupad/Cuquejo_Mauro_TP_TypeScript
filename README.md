# Proyecto: Proteccion de Rutas y Store (Educativo)

## Descripcion

Este proyecto muestra un flujo frontend con Vite + TypeScript para:

1. Autenticacion basica con localStorage.
2. Proteccion de rutas por rol (admin y client).
3. Navegacion entre home de tienda, carrito, login y registro.
4. Render dinamico de productos con filtros por categoria y texto.

## Comportamiento Actual Del Sistema

### 1. Guardia De Rutas Centralizada

La validacion de acceso se ejecuta en src/main.ts.

- Existe una lista de rutas validas (VALID_PAGES):
    - /
    - /index.html
    - /src/pages/auth/login/login.html
    - /src/pages/auth/registro/registro.html
    - /src/pages/admin/home/home.html
    - /src/pages/store/home/home.html
    - /src/pages/store/cart/cart.html
- Si la ruta no es valida, el sistema redirige a /src/pages/store/home/home.html.
- Si se entra a / o /index.html, redirige a login.

### 2. Reglas Por Sesion Y Rol

- Sin usuario logueado:
    - Solo se permite login o registro.
    - Cualquier otra ruta redirige a login.
- Usuario client logueado:
    - No puede acceder a admin ni a pantallas de auth (login/registro).
    - Se redirige a home de store.
- Usuario admin logueado:
    - No puede acceder a pantallas store ni a login/registro.
    - Se redirige a home admin.

### 3. Store: Filtros, Vistas Y UX

En src/pages/store/home/home.ts:

- Se persisten filtros en localStorage con la clave store_filters.
- Se filtra por categoria seleccionada y por texto.
- Si no hay resultados, se muestra un mensaje en el contenedor de productos.
- Al agregar un producto:
    - Se actualiza el carrito.
    - Se actualiza el contador visual.
    - El boton muestra estado temporal de confirmado ("Agregado").

En src/style.css:

- El mensaje de "sin resultados" ocupa toda la fila del grid usando:
    - #contenedor-productos .no-resultados { grid-column: 1 / -1; }

### 4. Carrito Con Contador Visual

En el header de store y carrito, "Carrito" se muestra como boton con badge numerico.

En src/pages/store/cart/cart.ts:

- actualizarContadorCarrito calcula la cantidad total (sumatoria de item.cantidad).
- El valor se renderiza dentro de .carrito-badge.
- Si no hay datos o hay error de parseo, muestra 0.

## Importante: Seguridad

Este proyecto es educativo.

- La sesion y datos de usuario se guardan en localStorage.
- Esto NO es seguro para produccion.
- En un entorno real, la autenticacion/autorizacion debe resolverse en backend (tokens, expiracion, validacion de permisos, etc.).

## Instalacion Y Ejecucion

1. Instalar dependencias:

     npm install -g pnpm
     pnpm install

2. Levantar entorno de desarrollo:

     pnpm dev

3. Abrir la URL informada por Vite (normalmente http://localhost:5173).

## Estructura Relevante

- src/main.ts: guardia de rutas global y redirecciones por rol.
- src/utils/localStorage.ts: manejo de usuario, usuarios y carrito.
- src/utils/navigate.ts: helper de navegacion.
- src/pages/auth/login/login.ts: login y redireccion por rol.
- src/pages/auth/registro/registro.ts: registro de usuario cliente.
- src/pages/store/home/home.ts: listado, filtros y agregado al carrito.
- src/pages/store/cart/cart.ts: render del carrito y contador visual.
- src/style.css: estilos globales, grilla de productos y badge de carrito.
