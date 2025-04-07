<script lang="ts">

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import php from 'highlight.js/lib/languages/php';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import rust from 'highlight.js/lib/languages/rust';
import python from 'highlight.js/lib/languages/python';

[javascript, bash, php, html, css, rust, python].forEach((lang) => {
  hljs.registerLanguage(lang.name, lang);
});

function get_lang_by_shebang(shebang: string) {
  if (shebang.startsWith('#!/usr/bin/env')) {
    const [, lang] = shebang.split(/\s/).filter(Boolean);
    return lang;
  }else if (shebang.startsWith('&lt;html')) {
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

export default {
  name: 'Terminal',
  props: {
    mode: Object,
    shebang: {
      type: String,
      required: true
    },
    lines: {
      type: Array<String>,
      required: true
    }
  },
  methods: {
    set_line_value(index: number, event: InputEvent) {
      this.lines[index] = (event.target as HTMLInputElement).value;
    },
    create_new_line() {
      this.lines.push('');
      this.$forceUpdate();
    },
  },
  data() {
    const lines = this.lines.slice(0, 15);
    const lang = get_lang_by_shebang(this.shebang);
    console.log(this.shebang,lang);
    return {
      hightlighted: lang ? lines.map(line => {
        return hljs.highlight(line as string,
          { language: lang }
        ).value
      }) : lines
    };
  }
}
</script>

<template>

  <code class="terminal">

    <code class="shebang" v-html="shebang" />


    <br>
    <span v-for="line in hightlighted">
      <!--<span class="green">~</span><span class="blue">❯&nbsp;</span>>-->
      
      <span class="line" v-html="line"/>
      
      <br>
    </span>
  </code>

</template>

<style lang="scss" scoped>
.terminal {
  display: block;
  background-color: var(--terminal-color); // var(--purple-10);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  // font-family: 'Fira Code', monospace;
  font-size: 18px;
  color: white;
  margin: 0;
  padding: .65rem 1rem 1rem 1rem;
  text-align: left;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  .shebang {
    color: var(--grey-6);
    font-style: italic;
    font-size: .75rem;
  }

  .green {
    color: #00ff00;
  }

  .blue {
    color: #0000ff;
  }

  .line {
    // color: var(--codeline-color);
    white-space: pre;
    font-size: 15px;
    line-height: 1;
  }

  /* mode édition */
  &.editable {
    & [type="text"] {
      background-color: transparent;
      width: calc(100% - 4rem);
      font-size: 18px;
      outline: none;
      border: none;
      border-bottom: 1px solid rgba(204, 204, 204, 0.1);
    }

    & .shebang {
      & select {
        border: 1px solid var(--theme-color);
        color: var(--grey-7);
        text-align-last: center;
        margin: 0 0 12px 0;
      }
    }
  }

  /* fin mode édition */
}
</style>