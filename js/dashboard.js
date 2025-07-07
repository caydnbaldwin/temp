document.addEventListener('DOMContentLoaded', function() {
    // Pay Dues logic
    const payBtn = document.getElementById('payDueBtn');
    const overlay = document.getElementById('paymentSuccessOverlay');
    // Select the charge rows (all except the last li)
    const chargeRows = document.querySelectorAll('.suggestion ul li:not(:last-child)');
    const totalDueSpan = document.querySelector('.suggestion ul li:last-child span');

    if (payBtn && overlay && chargeRows.length && totalDueSpan) {
        payBtn.addEventListener('click', function() {
            // Show the checkmark overlay
            overlay.classList.add('active');
            // Hide all charge rows except Total Due
            chargeRows.forEach(row => row.style.display = 'none');
            // Set Total Due to $0.00
            totalDueSpan.textContent = ' $0.00';
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 1200); // Show for 1.2 seconds
        });
    }

    // Next Appointment calendar interactivity
    const appointmentText = document.getElementById('appointmentText');
    const calendar = document.getElementById('miniCalendar');
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Helper to get the day of week for June 2025
    function getDayOfWeek(day) {
        const date = new Date(2025, 5, day); // Month is 0-indexed, so 5 = June
        return daysOfWeek[date.getDay()];
    }

    function getOrdinal(n) {
        const s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    function formatDate(date) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayOfWeek = days[date.getDay()];
        const month = months[date.getMonth()];
        const day = getOrdinal(date.getDate());
        const year = date.getFullYear();
        return `${dayOfWeek}, ${month} ${day}, ${year}`;
    }

    function buildCalendar(targetDate) {
        const calendarMonthYear = document.getElementById('calendarMonthYear');
        const calendarBody = document.getElementById('calendarBody');
        if (!calendarMonthYear || !calendarBody) return;

        const year = targetDate.getFullYear();
        const month = targetDate.getMonth();

        // Set month and year label
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        calendarMonthYear.textContent = `${months[month]} ${year}`;

        // Find first day of the month and number of days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Find the day to highlight (appointment day)
        const highlightDay = targetDate.getDate();

        // Build calendar rows
        let html = '';
        let day = 1;
        for (let i = 0; i < 6; i++) { // up to 6 weeks
            let row = '<tr>';
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || day > daysInMonth) {
                    row += '<td></td>';
                } else {
                    const highlightClass = (day === highlightDay) ? 'calendar-day highlight' : 'calendar-day';
                    row += `<td><span class="${highlightClass}" data-day="${day}">${day}</span></td>`;
                    day++;
                }
            }
            row += '</tr>';
            html += row;
            if (day > daysInMonth) break;
        }
        calendarBody.innerHTML = html;
    }

    // Calculate appointment date (today + 3 days)
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 3);

    // Set appointment text
    if (appointmentText) {
        appointmentText.textContent = formatDate(appointmentDate) + " at 1:00 PM";
    }

    // Build the calendar for the appointment month
    buildCalendar(appointmentDate);

    // Reset to 16th on load
    function resetCalendarHighlight() {
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('highlight');
        });
        const day16 = document.querySelector('.calendar-day[data-day="16"]');
        if (day16) day16.classList.add('highlight');
        if (appointmentText) appointmentText.textContent = "Monday, June 16th, 2025 at 1:00 PM";
    }

    resetCalendarHighlight();

    // Add click listeners to all days with data-day
    if (calendar) {
        calendar.querySelectorAll('.calendar-day').forEach(function(cell) {
            cell.style.cursor = "pointer";
            cell.addEventListener('click', function() {
                // Remove highlight from all
                calendar.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('highlight'));
                // Add highlight to clicked
                cell.classList.add('highlight');
                // Update appointment text
                const day = parseInt(cell.getAttribute('data-day'));
                if (!isNaN(day)) {
                    const dow = getDayOfWeek(day);
                    const ord = getOrdinal(day);
                    appointmentText.textContent = `${dow}, June ${ord}, 2025 at 1:00 PM`;
                }
                // Show the checkmark overlay for appointment change
                if (overlay) {
                    overlay.classList.add('active');
                    setTimeout(() => {
                        overlay.classList.remove('active');
                    }, 1200);
                }
            });
        });
    }

    // Scale bubble interactivity
    const scaleBubbles = document.querySelectorAll('.scale-bubble');
    if (scaleBubbles.length) {
        // Optionally, select a default (e.g., 4)
        scaleBubbles.forEach(bubble => {
            if (bubble.dataset.value === "4") {
                bubble.classList.add('selected');
            }
            bubble.style.cursor = "pointer";
            bubble.addEventListener('click', function() {
                scaleBubbles.forEach(b => b.classList.remove('selected'));
                bubble.classList.add('selected');
                // Show the checkmark overlay for scale selection
                if (overlay) {
                    overlay.classList.add('active');
                    setTimeout(() => {
                        overlay.classList.remove('active');
                    }, 1200);
                }
            });
        });
    }
});