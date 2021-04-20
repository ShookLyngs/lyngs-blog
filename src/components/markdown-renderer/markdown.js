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

/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
export function render(src, env) {
  return markdown.render(src, env);
}

// Create a <pre> block
function createPreBlock(value) {
  return `<pre class="code hljs"><code>${value}</code></pre>`;
}



