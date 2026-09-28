# Fabian Torres — Portfolio Landing Page

Landing page de una sola página construida con **React + Vite**, a partir del contenido de
`../portfolio-content-export.md` y con diseño inspirado en `../DESIGN.md`, recoloreado con la
paleta solicitada (`#242424`, `#8D8A84`, `#F3F0EA`, `#C3A78E`, `#7A4F3A`).

## Cómo correrlo

Requiere [Node.js](https://nodejs.org/) 18 o superior instalado.

```bash
npm install
npm run dev
```

Abre la URL que muestre la terminal (normalmente `http://localhost:5173`).

## Cómo generar la versión de producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con el sitio estático listo para subir a cualquier hosting
(Netlify, Vercel, GitHub Pages, hosting compartido, etc.). Puedes previsualizar ese build con:

```bash
npm run preview
```

## Estructura

- `src/data.js` — todo el contenido de texto del portafolio (editar aquí para cambiar textos).
- `src/components/` — un componente por sección de la página.
- `src/index.css` — sistema de diseño completo (tokens de color, tipografía, espaciado) y estilos.
- `public/`: imágenes (WebP optimizadas), favicon y `tracker.xlsx`. Se publican tal cual en la raíz del sitio.
- `src/useInView.js`: hook que activa la animación del timeline al entrar en pantalla.

## Notas

- Fuentes auto-alojadas con @fontsource (Manrope y Plus Jakarta Sans) e iconos de @phosphor-icons/react.
- Todas las animaciones respetan la preferencia del sistema "reducir movimiento".
- El primer ítem del FAQ se abre por defecto; el resto son colapsables con `<details>`.
- La tarjeta "Asana in Practice" abre un modal con el resumen de los 3 proyectos (tracker,
  onboarding, evento) y el enlace de descarga de `tracker.xlsx`.
