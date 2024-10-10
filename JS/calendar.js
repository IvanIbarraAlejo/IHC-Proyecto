document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const monthYearEl = document.getElementById('monthYear');
    const currentDateEl = document.getElementById('currentDate');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    let currentDate = new Date();
    let selectedDate = new Date();

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    function updateCalendar() {
        monthYearEl.textContent = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
        calendarEl.innerHTML = '';

        // Añadir nombres de los días
        dayNames.forEach(day => {
            calendarEl.innerHTML += `<div class="calendar-day day-name">${day}</div>`;
        });

        const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

        // Añadir espacios en blanco para el primer día
        for (let i = 0; i < firstDay; i++) {
            calendarEl.innerHTML += '<div class="calendar-day"></div>';
        }

        // Añadir días del mes
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
            const isToday = date.toDateString() === currentDate.toDateString();
            calendarEl.innerHTML += `
                <div class="calendar-day ${isToday ? 'today' : ''}">
                    ${i}
                </div>
            `;
        }

        updateCurrentDate();
    }

    function updateCurrentDate() {
        currentDateEl.textContent = `Hoy es ${currentDate.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}`;
    }

    prevMonthBtn.addEventListener('click', () => {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
        updateCalendar();
    });

    // Actualizar la fecha actual cada minuto
    setInterval(() => {
        currentDate = new Date();
        updateCurrentDate();
        updateCalendar();
    }, 60000);

    updateCalendar();
});