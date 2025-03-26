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
  }
}
</script>

<template>
  <code class="terminal">
    <span class="shebang" v-if="shebang === 'sh'">#!/bin/sh</span>
    <span class="shebang" v-else>#!/bin/bash</span>
    <br>
    <span v-for="(line,index) in lines">
      <span class="green">~&nbsp;</span><span class="blue">❯&nbsp;</span>
      
      <span v-if="!mode.edition" class="yellow">{{ line }}</span>
      <input v-else
          type="text"
          :name="'line_' + index"
          class="yellow"
          :value="line"
        >

      <br>
    </span>
  </code>

</template>

<style lang="scss" scoped>
.terminal {
  display: block;
  background-color:#263238;// var(--purple-10);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  font-family: 'Fira Code', monospace;
  font-size: .85rem;
  color: white;
  margin: 0;
  padding: .65rem 1rem 1rem 1rem;
  text-align: left;
  height: 100%;

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

  .yellow {
    color: #ffff00;
    &[type="text"] {
      background-color:  rgba(255,255,255,.05);
      border: 1px solid rgba(204,204,204,.1);
      width: calc(100% - 4rem);
      font-size: .85rem;
      outline: none;
    }
  }
}
</style>