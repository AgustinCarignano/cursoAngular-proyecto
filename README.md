# CursoAngularProyecto

Proyecto final del curso de Angular realizado en CoderHouse

## Descripción

El proyecto se basa en la creación de una aplicación para la gestión de cursos, alumnos e inscripciones. La aplicación se plantea para uso interno, con un sistema de autenticación y autorización de usuarios.

Accediendo a la aplicación, en la pantalla de inicio, se muestra un breve resumen de los datos almacenados. En la siguientes vistas se pueden agregar, editar y eliminar usuarios (solo habilitado para administradores), alumnos y profesores, asi como la gestión de cursos, creación de ediciones de cursos con fechas de inicio y fin, y asignando un profesor. Luego, pueden agregarse alumnos a las ediciones de los cursos creadas, tanto desde el detalle de cursos como desde la sección de inscripciones, en la que solo aparecen aquellos cursos que tienen inscripciones previas.

## Instrucciones para instalar

Clonar el repositorio con el comando

```bash
git clone https://github.com/AgustinCarignano/cursoAngular-proyecto.git
```

Instalar dependencias del proyecyo

```bash
 npm install
```

El proyecto consume una fake api haciendo uso de json-server. Para correr el proyecto ejecutar

```bash
npm run api:server
npm start
```

para ejecutar los test correr el comando

```bash
npm run test
```

## Pruebas del proyecto

Existen dos usuarios ya creados, uno con permisos de "administrador" y otro con permisos de "empleado". Cuando se carga la pantalla de login, se puede hacer uso del botón de ayuda para cargar los datos de cualquiera de estos dos usuarios de prueba. Estos usuarios no pueden editarse o eliminarse, por lo que las pruebas sobre el modelos de usuarios requieren de la creacion de uno nuevo.
