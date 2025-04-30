# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Faster Sidebar

Bienvenido a `faster-sidebar`, la solución definitiva para integrar barras laterales en aplicaciones web modernas. Diseñado con React, TypeScript y Vite, este módulo ofrece una experiencia de usuario excepcional y una integración sin complicaciones.

## ¿Por Qué Elegir `faster-sidebar`?

### Rendimiento Inigualable
- **Optimización con Vite:** Disfruta de una recarga en caliente (HMR) rápida y eficiente que acelera el desarrollo y mejora la productividad.
- **Componentes Reactivos:** Utiliza React para crear interfaces de usuario dinámicas y receptivas que se adaptan a cualquier dispositivo.

### Diseño Elegante y Personalizable
- **Estilo Moderno:** Ofrece un diseño limpio y profesional que se integra perfectamente con la estética de cualquier proyecto.
- **Personalización Completa:** Ajusta colores, tamaños y comportamientos para que la barra lateral se alinee con la identidad visual de tu marca.

### Integración Sencilla y Rápida
- **Componentes Reutilizables:** Importa y utiliza componentes como `Sidebar`, `SidebarCollapsedMenu`, y `SubMenu` en minutos, reduciendo el tiempo de desarrollo.
- **Compatibilidad Total:** Diseñado para funcionar sin problemas con proyectos que ya utilizan React y TypeScript.

## Ventajas de Usar `faster-sidebar` en Futuras Implementaciones

### Ahorro de Tiempo y Recursos
- **Desarrollo Eficiente:** Evita reinventar la rueda con cada nuevo proyecto. Reutiliza componentes probados y optimizados para ahorrar tiempo y esfuerzo.
- **Mantenimiento Simplificado:** Centraliza la lógica de la barra lateral en un único módulo, facilitando actualizaciones y correcciones de errores.

### Consistencia y Escalabilidad
- **Experiencia de Usuario Coherente:** Asegura una interfaz uniforme en todos tus proyectos, mejorando la experiencia del usuario.
- **Preparado para el Futuro:** Ideal para proyectos que esperan crecer y evolucionar, permitiendo una fácil expansión de la funcionalidad de la barra lateral.

## Cómo Comenzar

1. **Instalación Rápida:**
   ```bash
   npm install faster-sidebar
   ```

2. **Integración en tu Proyecto:**
   ```jsx
   import { Sidebar } from 'faster-sidebar';

   const App = () => (
     <Sidebar>
       {/* Tu contenido aquí */}
     </Sidebar>
   );
   ```

3. **Personalización:**
   Ajusta las propiedades de los componentes para que se adapten a tus necesidades específicas.

## Contribuye y Mejora

Estamos emocionados de recibir contribuciones de la comunidad. Si tienes ideas para mejorar `faster-sidebar`, ¡no dudes en hacer un fork del repositorio y enviar un pull request!

## Detalles Técnicos

El módulo `faster-sidebar` incluye componentes que detectan automáticamente si el dispositivo es móvil, ajustando el comportamiento de la barra lateral en consecuencia. Por ejemplo, el componente `SidebarCollapsedMenuItem` utiliza un efecto para verificar el tamaño de la pantalla y ajustar la interfaz de usuario.

```tsx
useEffect(() => {
  const checkIfMobile = () => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  };
  
  // Initial check
  checkIfMobile();
  
  // Add event listener for window resize
  window.addEventListener('resize', checkIfMobile);
  
  // Cleanup
  return () => window.removeEventListener('resize', checkIfMobile);
}, []);
```

Este enfoque asegura que la barra lateral se comporte de manera óptima en cualquier dispositivo, mejorando la experiencia del usuario.
