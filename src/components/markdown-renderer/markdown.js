// Github markdown styles
import 'github-markdown-css';

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

import MarkdownItImage from './markdown-it-image';
markdown.use(MarkdownItImage);
import MarkdownItTaskLists from 'markdown-it-task-lists';
markdown.use(MarkdownItTaskLists);
import MarkdownItEmoji from 'markdown-it-emoji';
markdown.use(MarkdownItEmoji);

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

/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and return list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
export function parse(src, env) {
  return markdown.parse(src, env);
}

// Create a <pre> block
function createPreBlock(value) {
  return `<pre class="code hljs"><code>${value}</code></pre>`;
}



