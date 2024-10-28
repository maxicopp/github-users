# Explorador de Usuarios de GitHub

Una aplicación Next.js que permite buscar y explorar usuarios de GitHub. La aplicación te permite navegar por usuarios de GitHub, buscar desarrolladores específicos, marcarlos como favoritos y ver perfiles detallados.

## Características

- 🔍 Búsqueda de usuarios de GitHub
- 👥 Navegación por perfiles de usuarios
- ⭐ Marcar/desmarcar usuarios como favoritos
- 📱 Diseño responsive

## Stack Tecnológico

- Next.js 14 (Pages Router)
- TypeScript
- CSS Modules
- React Loading Skeleton
- API REST de GitHub
- Jest & React Testing Library

## Comenzando

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/github-users.git
cd github-users
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

```
src/
├── app/                # Directorio de Next.js
├── components/         # Componentes reutilizables
├── hooks/             # Hooks personalizados de React
├── lib/               # Funciones de utilidad y llamadas a la API
├── types/             # Definiciones de tipos TypeScript
└── test-utils/        # Utilidades para testing
```

## Testing

Ejecutar suite de pruebas:

```bash
npm test
# o
yarn test
```

Para cobertura de pruebas:

```bash
npm run test:coverage
# o
yarn test:coverage
```

## Implementación de Características

- **Página Principal (CSR)**
  - Lista inicial de usuarios desde la API de GitHub
  - Búsqueda de usuarios
  - Funcionalidad de favoritos
  - Estados de carga y manejo de errores

- **Página de Detalles de Usuario (SSR)**
  - Información detallada del usuario
  - Estadísticas de GitHub
  - Sincronización del estado de favoritos con la página principal
  - Enlace directo al perfil de GitHub

## Características Técnicas

- Implementación de CSR para la página principal
- SSR para la página de detalles del usuario
- Sistema de favoritos (no persistente)
- Manejo de estados de carga
- Manejo de errores
- Diseño responsive
- Tests unitarios
