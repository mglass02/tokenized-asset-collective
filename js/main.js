// Universal blog post modal loader
useEffect(() => {
  const handleBlogClick = async (e) => {
    const link = e.target.closest('a[href^="blog/"]'); // any link inside /blog folder
    if (link) {
      e.preventDefault();
      const blogUrl = link.getAttribute('href');

      try {
        // Load the blog HTML file
        const response = await fetch(blogUrl);
        const html = await response.text();

        // Extract just the <article> part so SEO/meta stays in blog pages
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const article = doc.querySelector('article');
        const content = article ? article.outerHTML : '<p>Blog content not found.</p>';

        // Show it inside your modal
        setPopupContent(content);
        setActivePopup('blog-post');

        // Scroll to top of modal content
        document.querySelector('.popup-content')?.scrollTo(0, 0);

      } catch (err) {
        setPopupContent('<p style="color: #ef4444;">Error loading blog content.</p>');
      }
    }
  };

  // Attach click listener to whole document (delegated)
  document.body.addEventListener('click', handleBlogClick);
  return () => document.body.removeEventListener('click', handleBlogClick);
}, []);
