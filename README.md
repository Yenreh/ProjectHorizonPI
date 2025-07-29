# Horizon - Plataforma Educativa de Enfermedades Oculares

## Descripción

**Horizon** es una plataforma educativa web desarrollada por estudiantes de Ingeniería de Sistemas de la Universidad del Valle. El proyecto utiliza **modelos 3D interactivos** para explicar de manera visual e intuitiva las principales enfermedades oculares, facilitando la comprensión de conceptos médicos complejos.

### Enfermedades Cubiertas

- **Cataratas** 
- **Miopía** 
- **Conjuntivitis** 
- **Desprendimiento de Retina** 

Cada enfermedad se aborda con cuatro aspectos fundamentales:
- ¿Qué es? (Definición)
- ¿Cómo se manifiesta? (Síntomas)
- ¿Cómo se trata? (Tratamiento)
- ¿Cómo se previene? (Prevención)

## Características Principales

### Experiencias 3D Interactivas
- Modelos anatómicos del ojo humano en 3D
- Simulaciones de síntomas visuales
- Instrumentos médicos interactivos 

### Controles Interactivos
- **Navegación con mouse**
- **Controles de teclado**
- **Efectos visuales**
- **Audio posicional**
- **Video 3D**

### Interfaz de Usuario
- Diseño con Bootstrap
- Sistema de navegación por pestañas
- Botones de información contextuales
- Quiz interactivo para evaluar conocimientos

## Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de build y desarrollo
- **React Router** - Navegación entre páginas
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **React Bootstrap** - Componentes Bootstrap para React

### Gráficos 3D
- **Three.js** - Biblioteca de gráficos 3D
- **React Three Fiber** - Integración de Three.js con React
- **React Three Drei** - Utilidades adicionales para R3F
- **React Three Postprocessing** - Efectos de postprocesado
- **React Three Rapier** - Motor de física

### Backend y Autenticación
- **Firebase** - Autenticación y base de datos
- **Firestore** - Base de datos NoSQL

### Estado y Gestión
- **Zustand**
- **React Icons**
- **Lucide React**

## Instalación y Configuración

### Prerrequisitos
```bash
Node.js == 22.0.0
npm >= 10.9.0
```

### Clonar el Repositorio
```bash
git clone https://github.com/Yenreh/horizon-pi-i.git
cd horizon-pi-i
```

### Instalar Dependencias
```bash
npm install
```

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### Ejecutar en Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`


## Despliegue

El proyecto está configurado para desplegarse en **Vercel** con la configuración incluida en `vercel.json`.

### Despliegue Automático
1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno en Vercel
3. El despliegue se ejecutará automáticamente

## Equipo de Desarrollo

Desarrollado por estudiantes de **Ingeniería de Sistemas** de la **Universidad del Valle** como proyecto de **Proyecto Integrador I (PI-I)**.

- Miguel Angel Muños Piñeros
- Herney Eduardo Quintero Trochez
- Sheila Marcela Valencia Chito
- Jose Miguel Fuertes Benavides

