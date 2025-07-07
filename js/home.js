const profileToggle = document.getElementById('profileToggle');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const customizationToggle = document.getElementById('customizationToggle');
const customizationDropdown = document.getElementById('customizationDropdown');
const colorSchemeButtons = document.querySelectorAll('.color-scheme-btn');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeValue = document.getElementById('fontSizeValue');
const customizationShortcut = document.getElementById('customizationShortcut');

profileToggle.addEventListener('click', function() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
});

if (customizationShortcut) {
    customizationShortcut.addEventListener('click', function() {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
        customizationDropdown.classList.add('open'); 
        customizationToggle.classList.add('active'); 
    });
}

function closeMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; 
    
    if (customizationDropdown.classList.contains('open')) {
        customizationDropdown.classList.remove('open');
        customizationToggle.classList.remove('active');
    }
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

customizationToggle.addEventListener('click', function(e) {
    e.preventDefault();
    customizationDropdown.classList.toggle('open');
    customizationToggle.classList.toggle('active');
});

colorSchemeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const scheme = this.dataset.scheme;
        document.body.className = ''; 
        document.body.classList.add(scheme); 
        
        localStorage.setItem('colorScheme', scheme);

        colorSchemeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

fontSizeSlider.addEventListener('input', function() {
    const fontSize = this.value;
    document.documentElement.style.fontSize = `${fontSize}%`;
    fontSizeValue.textContent = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize);
});

window.addEventListener('DOMContentLoaded', function() {
    const savedColorScheme = localStorage.getItem('colorScheme');
    if (savedColorScheme) {
        document.body.classList.add(savedColorScheme);
        document.querySelector(`.color-scheme-btn[data-scheme="${savedColorScheme}"]`)?.classList.add('active');
    } else {
        document.querySelector('.color-scheme-btn[data-scheme="default"]')?.classList.add('active');
    }
    const savedFontSize = localStorage.getItem('fontSize') || 100;
    document.documentElement.style.fontSize = `${savedFontSize}%`;
    if (fontSizeSlider) {
        fontSizeSlider.value = savedFontSize;
        fontSizeValue.textContent = `${savedFontSize}%`;
    }
});

const user = JSON.parse(sessionStorage.getItem('firstName'));
const firstName = user && user.firstName ? user.firstName : 'User';
if (document.getElementById('profilePicture-firstName')) document.getElementById('profilePicture-firstName').textContent = firstName;
if (document.getElementById('welcomeMessage-firstName')) document.getElementById('welcomeMessage-firstName').textContent = `Welcome back, ${firstName}!`;
if (document.querySelector('.user-info h3')) document.querySelector('.user-info h3').textContent = firstName;
if (document.querySelector('.user-info p')) document.querySelector('.user-info p').textContent = `${firstName}@example.com`;


function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDatePlusDays(daysToAdd) {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
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

document.addEventListener("DOMContentLoaded", function() {
    const welcomeSection = document.querySelector(".welcome-section p");
    if (welcomeSection) {
        const appointmentText = `We're glad to see you again. Your medical records are up to date and your next appointment is scheduled for 1pm on ${formatDatePlusDays(3)} at our Lehi, UT office. You're ready to go!`;
        welcomeSection.textContent = appointmentText;
    }
});
