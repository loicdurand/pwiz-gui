import highlight_js from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import php from 'highlight.js/lib/languages/php';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import rust from 'highlight.js/lib/languages/rust';
import python from 'highlight.js/lib/languages/python';

[javascript, bash, php, html, css, rust, python].forEach((lang) => {
  highlight_js.registerLanguage(lang.name, lang);
});

export const hljs = highlight_js;

export function get_lang_by_shebang(shebang: string) {
  if (shebang.startsWith('#!/usr/bin/env')) {
    const [, lang] = shebang.split(/\s/).filter(Boolean);
    return lang;
  } else if (shebang.startsWith('&lt;html')) {
    return 'xml';
  }
  switch (shebang) {
    case '#!/bin/bash':
    case '#!/bin/sh':
      return 'bash';
    case '&lt;?php':
      return 'php';
    case '// js':
      return 'javascript';
    case '&lt;!-- html --&gt;':
      return 'xml';
    case '// css':
      return 'css';
    case '// rust':
    case '// rs':
      return 'rust';
    default:
      return '';
  }
}