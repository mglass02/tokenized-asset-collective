document.addEventListener("DOMContentLoaded", () => {
  // Highlight current nav link
  const navLinks = document.querySelectorAll("header nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href").split("/").pop();
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });
});
