// Code Highlight
import Highlight from 'highlight.js';
// Highlight styles
import 'highlight.js/styles/tomorrow-night-eighties.css';
// Used properties in Highlight.js
const { getLanguage, highlight } = Highlight;

// Markdown
import MarkdownIt from 'markdown-it';
// Create markdown-it instance
export const markdown = new MarkdownIt({
  highlight(string, language) {
    if (language && getLanguage(language)) {
      try {
        const transformed = highlight(string, { language });
        return createPreBlock(transformed.value);
      } catch { /**/ }
    }

    return createPreBlock(markdown.utils.escapeHtml(string));
  },
});

// Export main properties of markdown-it
export const { render } = markdown;

// Create a <pre> block
function createPreBlock(value) {
  return `<pre class="code hljs"><code>${value}</code></pre>`;
}



