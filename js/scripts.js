document.addEventListener("DOMContentLoaded", async () => {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;

  try {
    // fetch the generated posts.json inside the blog folder
    const response = await fetch("blog/posts.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to fetch posts.json (status ${response.status})`);

    const posts = await response.json();

    blogContainer.innerHTML = ""; // clear loading message

    if (!Array.isArray(posts) || posts.length === 0) {
      blogContainer.innerHTML = "<p>No posts found.</p>";
      return;
    }

    posts.forEach((post, idx) => {
      // Basic validation / fallbacks
      const title = post.title || post.slug || "Untitled";
      const date = post.date || "";

      const article = document.createElement("article");
      article.className = "blog-post";
      // subtle entrance animation
      article.style.opacity = "0";
      article.style.transform = "translateY(6px)";
      article.style.transition = "opacity .36s ease, transform .36s ease";

      article.innerHTML = `
        <h2><a href="blog/${post.slug}">${title}</a></h2>
        <p class="date">${date}</p>
      `;

      blogContainer.appendChild(article);

      // Staggered reveal for a nicer feel
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
