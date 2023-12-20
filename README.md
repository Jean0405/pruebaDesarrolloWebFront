# PRUEBA DESARROLLO WEB

## Prueba Frontend con VUE

Esta parte de la prueba consta de la realización de vistas para un sistema de registro de historias en una entidad medica llamada **_SALUD DOMICILIARIA ACANCES SAS_**, el cual posee 2 tipos de usuarios:

- Profesionales
- Pacientes

Los usuarios podrán iniciar sesión o registrarse y una vez dentro estos tendrán distintas funcionalidades.

> [!NOTE]
> Si es primera vez que el usuario inicia sesión, el programa lo redirigirá a una vista en la cual deberá actualizar su contraseña

### PROFESIONALES

- Listar las historias clinicas que hayan creado
- Crear nuevas historias clinicas
- Actualizar datos de su perfil

### PACIENTES

- Listar historias que se les asignaron
- Marcar como asistida la historia
- Actualizar datos de su perfil

## INSTALACIÓN

> [!IMPORTANT]
> Las funcionalidades de este programa no funcionaran si no tienes en ejecución el [proyecto Backend](https://github.com/Jean0405/pruebaDesarrolloWeb) con Laravel.

1. Clona este repositorio

```bash
git clone https://github.com/Jean0405/pruebaDesarrolloWebFront.git
```

2. Accede al archivo raiz del proyecto e instala las dependencias

```bash
npm install
```

3. Finalmente ejecuta el programa.

```bash
npm run dev
```
