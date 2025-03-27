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
    }
  }
}
</script>

<template>

  <code
    class="terminal"
    :class="{ editable: mode.edition }"
  >

    <span class="shebang" v-if="mode.edition">
      <select name="content_types" id="content_type-select">
        <option value="sh">Lignes de commandes (Shell)</option>
      </select>
    </span>
    <span class="shebang" v-else-if="shebang === 'sh'">#!/bin/sh</span>
    <span class="shebang" v-else>#!/bin/bash</span>


    <br>
    <span v-for="(line, index) in lines">
      <span class="green">~&nbsp;</span><span class="blue">❯&nbsp;</span>
      
      <span v-if="!mode.edition" class="yellow">{{ line }}</span>
      <input v-else
          type="text"
          name="line[]"
          class="yellow"
          :placeholder="index === 0 && !line ? 'Contenu de la fiche...' : ''"
          :value="line"
          :key="index"
          @input="set_line_value(index, $event)"
          @keyup.enter="create_new_line"
        >

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

  .yellow {
    color: #ffff00;
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