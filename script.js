// script.js

// 1. Inicialización de Variables
const cuerpoDias = document.getElementById('cuerpo-dias');
const mesActualSpan = document.getElementById('mes-actual');
const prevBtn = document.getElementById('prev-mes');
const nextBtn = document.getElementById('next-mes');

const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Usamos una variable Date que actualizaremos al navegar entre meses
let fechaActual = new Date();
let mesMostrado = fechaActual.getMonth();
let anioMostrado = fechaActual.getFullYear();


// 2. Función Principal para Renderizar el Calendario
function renderizarCalendario() {
    // 2.1. Limpiar el contenido anterior
    cuerpoDias.innerHTML = '';
    
    // 2.2. Mostrar el mes y año en el encabezado
    mesActualSpan.textContent = `${nombresMeses[mesMostrado]} ${anioMostrado}`;

    // 2.3. Obtener el primer día del mes
    // El '0' en el día devuelve el último día del mes anterior (para calcular el total de días)
    const primerDiaMes = new Date(anioMostrado, mesMostrado, 1); 
    
    // getDay() devuelve el día de la semana (0=domingo, 1=lunes, etc.)
    const diaInicio = primerDiaMes.getDay(); 

    // 2.4. Obtener el último día del mes (usando el día 0 del mes siguiente)
    const ultimoDiaMes = new Date(anioMostrado, mesMostrado + 1, 0).getDate(); 

    let diaContador = 1;
    let fila;

    // 2.5. Crear las filas (semanas)
    // El bucle for itera hasta 6 veces (máximo de semanas que puede tener un mes)
    for (let i = 0; i < 6; i++) {
        fila = document.createElement('tr');

        // 2.6. Crear las celdas (días)
        for (let j = 0; j < 7; j++) {
            const celda = document.createElement('td');

            if (i === 0 && j < diaInicio) {
                // Rellenar con celdas vacías antes del primer día del mes
                celda.textContent = '';
                celda.classList.add('dia-vacio');
            } else if (diaContador <= ultimoDiaMes) {
                // Rellenar con los días del mes
                celda.textContent = diaContador;
                const DIA_A_MARCAR = 16/12/2025;

                // 2.7. Resaltar el día de HOY
                if (diaContador === fechaActual.getDate() && mesMostrado === fechaActual.getMonth() && anioMostrado === fechaActual.getFullYear()) {
                    celda.classList.add('hoy');
                }
                diaContador++;
            } else {
                // Dejar celdas vacías después del último día del mes
                celda.textContent = '';
                celda.classList.add('dia-vacio');
            }
            fila.appendChild(celda);
        }
        cuerpoDias.appendChild(fila);

        // Si ya terminamos de contar los días, salimos del bucle de semanas
        if (diaContador > ultimoDiaMes) {
            break;
        }
    }
}

// 3. Funcionalidad de Navegación (Botones)
prevBtn.addEventListener('click', () => {
    mesMostrado--;
    if (mesMostrado < 0) {
        mesMostrado = 11; // Diciembre
        anioMostrado--;
    }
    renderizarCalendario();
});

nextBtn.addEventListener('click', () => {
    mesMostrado++;
    if (mesMostrado > 11) {
        mesMostrado = 0; // Enero
        anioMostrado++;
    }
    renderizarCalendario();
});

// 4. Llamar a la función para cargar el calendario al inicio
renderizarCalendario();