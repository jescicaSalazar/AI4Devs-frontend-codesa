### Chatbot:
cursor

## Prompt 1:
Como desarrollador frontend experto diseña una interfaz tipo Kanban para la página interna llamada "Position", cuyo propósito es visualizar y gestionar los candidatos de una posición específica dentro de un proceso de contratación. crea la nueva interfaz en @frontend siguiendo la estructura del proyecto, documenta el codigo generado

Requisitos funcionales y de diseño:

Encabezado contextual:
-Mostrar en la parte superior el título de la posición.
-Incluir una flecha a la izquierda del título que permita volver al listado general de posiciones.

Tablero Kanban:
-Cada columna representa una fase del proceso de contratación (ej: “Aplicación recibida”, “Entrevista técnica”, “Oferta”, etc.).
-El número de columnas debe ser dinámico, en función del número de fases para esa posición.
-Cada candidato se representa como una tarjeta, ubicada en la columna correspondiente a su fase actual.

Las tarjetas deben mostrar:
-Nombre completo del candidato/a.
-Puntuación media (por ejemplo, de entrevistas anteriores).
-Las tarjetas deben ser arrastrables entre columnas, lo que permite cambiar la fase del candidato (drag-and-drop).
-Al mover una tarjeta entre columnas, debe hacerse una llamada a la API para actualizar la fase del candidato.

Diseño responsive:
-En escritorio: las columnas se muestran horizontalmente.
-En móvil: las fases deben mostrarse en vertical ocupando todo el ancho de pantalla, una debajo de otra.

Consideraciones adicionales:
-Asume que existe una estructura global ya definida (menú superior, footer, etc.). Solo necesitas generar el contenido de esta página interna.
-Puedes asumir que existe una página de listado de posiciones, a la que se debe volver con la flecha.
-Cuentas con endpoints API del @backend  que permiten:
Obtener los datos de la posición (título, fases, candidatos, puntuaciones).
-Actualizar la fase de un candidato.



## Prompt 2:
Ajustar los siguientes Requisitos:
Tablero Kanban:
-Cada columna representa una fase del proceso de contratación (ej: “Aplicación recibida”, “Entrevista técnica”, “Oferta”, etc.).
-El número de columnas debe ser dinámico, en función del número de fases para esa posición.
-Cada candidato se representa como una tarjeta, ubicada en la columna correspondiente a su fase actual.

Las tarjetas deben mostrar:
-Nombre completo del candidato/a.
-Puntuación media (por ejemplo, de entrevistas anteriores).
-Las tarjetas deben ser arrastrables entre columnas, lo que permite cambiar la fase del candidato (drag-and-drop).
-Al mover una tarjeta entre columnas, debe hacerse una llamada a la API para actualizar la fase del candidato.

Puedes usar de ejemplo la imagen @interfaz 

## Prompt 3:
Tablero Kanban:
-Cada columna representa una fase del proceso de contratación (ej: “Aplicación recibida”, “Entrevista técnica”, “Oferta”, etc.).

### Chatbot:
GitHub Copilot

## Prompt 4:
Ajusta el tablero kamban para que se pueda actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta