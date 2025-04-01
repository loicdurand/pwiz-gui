<script lang="ts">

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
    escapeHTML(str: string): string {
      const escape: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return str.replace(/[&<>"']/g, (m: string) => {
        return escape[m];
      });
    }
  }
}
</script>

<template>

  <code class="terminal">

    <span class="shebang" v-if="shebang === 'sh'">#!/bin/sh</span>
    <code class="shebang" v-html="shebang" v-else />


    <br>
    <span v-for="line in lines">
      <!--<span class="green">~</span><span class="blue">❯&nbsp;</span>>-->
      
      <span class="line">{{ line }}</span>
      
      <br>
    </span>
  </code>

</template>

<style lang="scss" scoped>
.terminal {
  display: block;
  background-color: #263238; // var(--purple-10);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  font-family: 'Fira Code', monospace;
  font-size: 18px;
  color: white;
  margin: 0;
  padding: .65rem 1rem 1rem 1rem;
  text-align: left;
  height: 100%;
  overflow-y: scroll;

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
    color: var(--codeline-color);

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