# #PyDayTF 2018

## Instalación de dependencias

Requerimientos: Node >= 8

~~~console
$ npm install
~~~

## Desarrollo

Para empezar a desarrollar, basta con:

~~~console
$ npm run dev
~~~

- Se lanzará un servidor en http://localhost:3000 donde verás la web estática de `public/index.html`.
- El index que hay que cambiar para desarrollo es el que se encuentra en `source/index.html`

> **Nunca modifiques nada bajo el directorio `/public`, todos los ficheros de public excepto las imágenes se reemplazan a la hora de compilar los estáticos**

- Los estilos se programan directamente en `source/style` utilizando *Sass*. El servidor compilará los cambios en los ficheros `.sass` (y en `source/index.html`) y se actualizará cada vez que guardes un fichero *Sass* de manera automática.

## Publicación

~~~
$ npm run build
~~~

Se crearán los ficheros minificados y con versiones en la carpeta `/public`.
Después de hacer build ya se puede desplegar.

## Despliegue

~~~console
$ deploy.sh
~~~

> En realidad lo único que hace el script es pushear los cambios y pullear desde el directorio del servidor de producción.
