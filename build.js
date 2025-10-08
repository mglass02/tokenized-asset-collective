import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

const blogDir = "./blog";
const outputFile = path.join(blogDir, "posts.json");

const posts = [];

fs.readdirSync(blogDir).forEach(file => {
  if (file.endsWith(".html")) {
    const filePath = path.join(blogDir, file);
    const html = fs.readFileSync(filePath, "utf-8");
    const dom = new JSDOM(html);

    const title = dom.window.document.querySelector("title")?.textContent || file;
    const dateMeta = dom.window.document.querySelector("meta[name='date']")?.content || "1970-01-01";

    posts.push({
      title,
      slug: file,
      date: dateMeta
    });
  }
});

// Sort posts newest first (descending by date)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`✅ Generated ${outputFile} with ${posts.length} posts`);
