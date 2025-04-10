import highlight_js from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import php from 'highlight.js/lib/languages/php';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import rust from 'highlight.js/lib/languages/rust';
import python from 'highlight.js/lib/languages/python';
import markdown from 'highlight.js/lib/languages/markdown';
import json from 'highlight.js/lib/languages/json';

[javascript, bash, php, html, css, rust, python, markdown, json].forEach((lang) => {
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
    case '// md':
    case '// markdown':
      return 'markdown';
    case '// json':
      return 'json';
    default:
      return '';
  }
}