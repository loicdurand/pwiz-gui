<script lang="ts">

import { hljs,get_lang_by_shebang } from '../hljs_init';

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

  <pre class="terminal">
    <code >

<p class="shebang" v-html="shebang" />


<br>
<span v-for="line in hightlighted">
  <!--<span class="green">~</span><span class="blue">❯&nbsp;</span>>-->
  
  <span class="line" v-html="line"/>
  
  <br>
</span>
</code>
  </pre>

</template>

<style lang="scss" scoped>
.terminal {
  display: block;
  background-color: var(--terminal-color);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  margin: 0;
  padding: 0 10px;
  text-align: left;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  & code {
    width: 100%;
    height: 100%;
    display: block;
    white-space: wrap;
    /* line-height: 0.5; */
    margin-top: -10px;
    overflow: hidden;
    padding-top: 6px;
  }

  .shebang {
    color: var(--grey-6);
    font-style: italic;
    font-size: .75rem;
    margin-bottom: -24px;
  }

  .green {
    color: #00ff00;
  }

  .blue {
    color: #0000ff;
  }

  .line {
    color: var(--codeline-color);
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