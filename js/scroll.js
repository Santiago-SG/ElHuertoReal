let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
        // Si el usuario baja, el header desaparece
        header.style.top = "-80px";
    } else {
        // Si el usuario sube, el header reaparece
        header.style.top = "0";
    }
    lastScrollY = window.scrollY;
});
