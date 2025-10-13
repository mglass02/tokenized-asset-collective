// pagination.js remains unchanged as it's functional and not visual
document.addEventListener("DOMContentLoaded", () => {
  const posts = Array.from(document.querySelectorAll(".blog-article"));
  const postsPerPage = 6;
  let currentPage = 1;

  function showPage(page) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;

    posts.forEach((post, index) => {
      post.style.display = index >= start && index < end ? "block" : "none";
    });

    renderPagination(page);
  }

  function renderPagination(page) {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const pagination = document.getElementById("pagination");

    pagination.innerHTML = "";

    if (totalPages <= 1) return; // no need for pagination if one page

    // Previous button
    const prev = document.createElement("button");
    prev.textContent = "<";
    prev.disabled = page === 1;
    prev.onclick = () => showPage(page - 1);
    pagination.appendChild(prev);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === page ? "active" : "";
      btn.onclick = () => showPage(i);
      pagination.appendChild(btn);
    }

    // Next button
    const next = document.createElement("button");
    next.textContent = ">";
    next.disabled = page === totalPages;
    next.onclick = () => showPage(page + 1);
    pagination.appendChild(next);
  }

  showPage(currentPage);
});