// Remove Chatbase storage keys before the iframe loads
// Chatbase typically uses keys like 'cb_<bot_id>_conversation' in localStorage
// Replace 'ILjdWx5EGujXsAyHnSZZI' with your actual bot ID if different
window.addEventListener('DOMContentLoaded', function() {
    Object.keys(localStorage).forEach(function(key) {
        if (key.startsWith('cb_ILjdWx5EGujXsAyHnSZZI')) {
            localStorage.removeItem(key);
        }
    });
    // If Chatbase uses sessionStorage, do the same:
    Object.keys(sessionStorage).forEach(function(key) {
        if (key.startsWith('cb_ILjdWx5EGujXsAyHnSZZI')) {
            sessionStorage.removeItem(key);
        }
    });
});