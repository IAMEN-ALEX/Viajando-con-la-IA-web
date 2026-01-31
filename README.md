# Viajando con la IA 🌍✈️

![Dashboard Preview](./public/dashboard-viajes.png)

**Viajando con la IA** es una aplicación web moderna diseñada para planificar tus viajes de manera inteligente. Utiliza Inteligencia Artificial para sugerir itinerarios, actividades y destinos basados en tus preferencias, todo en una interfaz fluida y visualmente impactante.

## 🚀 Características Principales

-   **Planificación con IA**: Genera itinerarios completos en segundos impulsados por Google Gemini.
-   **Interfaz Inmersiva**: Diseño moderno con efectos de vidrio (Glassmorphism), fondos 3D (Iridescence) y transiciones suaves.
-   **Dashboard Interactivo**: Gestiona tus viajes, notas y recordatorios en un panel centralizado.
-   **Onboarding Fluido**: Introducción paso a paso para nuevos usuarios.
-   **Autenticación Segura**: Sistema de login y registro personalizado.

## 🛠️ Tecnologías

Este proyecto está construido con un stack tecnológico moderno:

-   **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript.
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/), CSS Modules.
-   **Animaciones**: Framer Motion, GSAP (opcional), OGL (para 3D).
-   **Base de Datos**: PostgreSQL (via Prisma ORM).
-   **IA**: Google Gemini API via Vercel AI SDK.
-   **Deploy**: Vercel / Railway.

## 📦 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/viajando-con-ia-web.git
    cd viajando-con-ia-web
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o
    pnpm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` o `.env.local` en la raíz y añade las siguientes claves:

    ```env
    DATABASE_URL="postgresql://usuario:password@host:port/database"
    GOOGLE_GEMINI_API_KEY="tu_api_key"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    RESEND_API_KEY="re_..."
    ```

4.  **Ejecutar migraciones de base de datos**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la fluidez o agregar nuevas funciones, no dudes en abrir un Issue o un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
