document.addEventListener("DOMContentLoaded", async () => {
  // ----------------------------
  // Highlight active nav link
  // ----------------------------
  const navLinks = document.querySelectorAll('header nav a');
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  let currentPage = pathSegments[pathSegments.length - 1]; // last segment

  // Treat root
  if (!currentPage || currentPage === "index.html") currentPage = "index.html";

  // Treat any blog post as blog.html
  if (pathSegments.includes("blog")) currentPage = "blog.html";

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href').split("/").pop();
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ----------------------------
  // Blog posts loading
  // ----------------------------
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;

  try {
    // ✅ Use relative path for GitHub Pages compatibility
    const response = await fetch("blog/posts.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to fetch posts.json (status ${response.status})`);

    const posts = await response.json();
    blogContainer.innerHTML = "";

    if (!Array.isArray(posts) || posts.length === 0) {
      blogContainer.innerHTML = "<p>No posts found.</p>";
      return;
    }

    posts.forEach((post, idx) => {
      const title = post.title || post.slug || "Untitled";
      const date = post.date || "";

      const article = document.createElement("article");
      article.className = "blog-post";
      article.style.opacity = "0";
      article.style.transform = "translateY(6px)";
      article.style.transition = "opacity .36s ease, transform .36s ease";

      // ✅ Relative link for GitHub Pages (no leading slash)
      article.innerHTML = `
        <h2><a href="blog/${post.slug}">${title}</a></h2>
        <p class="date">${date}</p>
      `;

      blogContainer.appendChild(article);

      requestAnimationFrame(() => {
        setTimeout(() => {
          article.style.opacity = "1";
          article.style.transform = "translateY(0)";
        }, idx * 60);
      });
    });
  } catch (err) {
    console.error("Error loading posts:", err);
    blogContainer.innerHTML = "<p>Could not load blog posts. Please try again later.</p>";
  }
});
