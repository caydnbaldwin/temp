document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    sessionStorage.setItem("firstName", JSON.stringify({ firstName }));
    window.location.href = "html/home.html";
});