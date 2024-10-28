# Explorador de Usuarios de GitHub

Una aplicación Next.js que permite buscar y explorar usuarios de GitHub.

## Características

- 🔍 Búsqueda de usuarios de GitHub
- 👥 Navegación por perfiles de usuarios
- ⭐ Sistema de favoritos
- 📱 Diseño responsive
- 💫 Estados de carga
- 🛡️ Manejo de errores
- 🚀 Optimizaciones de rendimiento:
  - 💾 Caché de búsquedas
  - 🔄 Infinite scroll
  - 📊 Cola de peticiones
  - ⚡ Rate limiting inteligente

## Stack Tecnológico

- Next.js 15
- TypeScript
- CSS Modules
- React Loading Skeleton
- React Toastify
- API REST de GitHub
- Jest

## Comenzando

1. Clona el repositorio:
```bash
git clone https://github.com/maxicopp/github-users.git
cd github-users
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Variables de Entorno

```env
NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com
```

## Scripts Disponibles

```bash
npm run dev           # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación
npm run start        # Inicia la aplicación en producción
npm run lint         # Ejecuta el linter
npm test            # Ejecuta los tests
npm run test:watch  # Ejecuta los tests en modo watch
npm run test:coverage # Ejecuta los tests con cobertura
```
