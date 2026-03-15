# Actividad 16

Alumno: Benedit Onyema Emose

## Descripción

En esta actividad se realizan tres prácticas en JavaScript:

1. Validador de formularios
2. Calculadora de cambio de moneda usando una API
3. Reserva de asientos de cine con almacenamiento local y conversión de moneda

## Ejercicio 1

En el primer ejercicio las principales dificultades estuvieron relacionadas con el uso de Fetch para consultar una API externa y la gestión de los datos obtenidos. Fue necesario comprender cómo realizar correctamente la petición al API, procesar la respuesta en formato JSON y utilizar el tipo de cambio recibido para realizar la conversión entre monedas.

Otra dificultad fue actualizar dinámicamente los valores en el DOM cuando el usuario cambiaba la moneda o la cantidad introducida. También se tuvo que implementar un indicador de carga mientras se realizaba la consulta a la API y mostrar un mensaje de error en caso de fallo en la petición. Finalmente, se añadió una validación para evitar introducir números negativos en la cantidad a convertir.

## Ejercicio 2

En el segundo ejercicio la principal dificultad fue gestionar correctamente la selección de asientos mediante eventos del DOM, permitiendo seleccionar únicamente los asientos disponibles y evitando aquellos que están ocupados.

También fue necesario trabajar con LocalStorage para guardar los asientos seleccionados y recuperarlos cuando se vuelve a cargar la página, lo que implicó transformar los datos a formato JSON y volver a reconstruir la selección en la interfaz.

Otra parte más compleja fue la integración con la API de tipos de cambio del ejercicio anterior, ya que los precios de las películas están definidos originalmente en dólares y fue necesario convertirlos correctamente a la moneda seleccionada. Para ello se tuvo que recalcular tanto el precio de cada entrada como el precio total de los asientos seleccionados cada vez que el usuario cambiaba la moneda.
## Ejercicio 3

Durante el desarrollo se encontraron principalmente las siguientes dificultades:

Gestionar correctamente el LocalStorage para guardar y recuperar los asientos seleccionados.

Evitar errores al manipular los elementos del DOM, especialmente al seleccionar los asientos disponibles.

Integrar correctamente la API de conversión de moneda, manteniendo siempre el precio base de las entradas en dólares para evitar errores en los cálculos.

Actualizar dinámicamente tanto el precio de las películas como el precio total cuando el usuario cambia la moneda.