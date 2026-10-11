
/*
 * Blog configuration.
 * Add each new article to this list when you publish it.
 */
const blogPosts = [
  {
    title: "Oak Forest Walk",
    date: "2026-10-11",
    file: "posts/oak-forest-walk.md",
    excerpt: "I took a walk today. I visited a small protected oak forest..."
  }
  {
    title: "My First Blog Post",
    date: "2026-10-10",
    file: "posts/the-first-post-of-this-blog.md",
    excerpt: "Hey there and welcome to my blog..."
  }

];

// Escape HTML so ordinary Markdown text is not interpreted as HTML.
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

// Convert basic inline Markdown.
function inlineMarkdown(text) {
  let result = escapeHtml(text);

  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>");

  return result;
}

// Convert Markdown blocks into HTML.
function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let inList = false;

  function flushParagraph() {
    if (paragraph.length) {
      output.push(
        "<p>" +
        inlineMarkdown(paragraph.join(" ")) +
        "</p>"
      );
      paragraph = [];
    }
  }

  function closeList() {
    if (inList) {
      output.push("</ul>");
      inList = false;
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);

    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      output.push(
        `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`
      );
      continue;
    }

    const item = trimmed.match(/^[-*]\s+(.+)$/);

    if (item) {
      flushParagraph();

      if (!inList) {
        output.push("<ul>");
        inList = true;
      }

      output.push(`<li>${inlineMarkdown(item[1])}</li>`);
      continue;
    }

    const quote = trimmed.match(/^>\s?(.*)$/);

    if (quote) {
      flushParagraph();
      closeList();
      output.push(
        `<blockquote><p>${inlineMarkdown(quote[1])}</p></blockquote>`
      );
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();

  return output.join("\n");
}

// Populate the home page's recent writings list.
function loadRecentWritings() {
  const container = document.getElementById("recent-writings");

  if (!container) return;

  if (blogPosts.length === 0) {
    container.innerHTML = "<p>No posts published yet.</p>";
    return;
  }

  container.innerHTML = blogPosts.map(function (post) {
    const link =
      "post.html?file=" + encodeURIComponent(post.file);

    return `
      <article class="blog-post-preview">
        <h3><a href="${link}">${escapeHtml(post.title)}</a></h3>
        <span class="date">${escapeHtml(post.date)}</span>
        <p class="preview">${escapeHtml(post.excerpt)}</p>
      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", loadRecentWritings);

// Load an individual blog post when post.html is opened.
async function loadBlogPost() {
  const container = document.getElementById("blog-post-content");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  if (!file || !file.endsWith(".md") || file.includes("..")) {
    container.textContent = "Invalid or missing post filename.";
    return;
  }

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const markdown = await response.text();
    container.innerHTML = markdownToHtml(markdown);
  } catch (error) {
    console.error("Could not load blog post:", error);
    container.textContent =
      "Could not load this post. Please check that the Markdown file exists.";
  }
}

document.addEventListener("DOMContentLoaded", loadBlogPost);
