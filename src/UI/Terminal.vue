<script lang="ts">
export default {
  name: 'Terminal',
  props: {
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
  <p class="terminal">
    <span class="shebang" v-if="shebang === 'sh'">#!/bin/sh</span>
    <span class="shebang" v-else>#!/bin/bash</span>
    <br>
    <span v-for="line in lines">
      <span class="green">~</span> <span class="blue">❯</span> <span class="yellow">{{ line }}</span>
      <br>
    </span>
  </p>

</template>

<style lang="scss" scoped>
.terminal {
  background-color: var(--purple-10);
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
  }
}
</style>