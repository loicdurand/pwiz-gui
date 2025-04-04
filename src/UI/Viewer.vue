<script lang="ts">
import { Post } from '../interfaces';

export default {
  name: 'Viewer',
  props: {
    mode: {
      type: Object,
      required: true
    },
    editor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      post: this.editor.post as Post,
    }
  },
  methods: {
    goBack() {
      this.mode.affichage = false
    }
  }
}
</script>

<template>
  <button
    type="button"
    class="button back-button"
    @click="goBack"
  >
    <i class="material-icons">arrow_back</i>
    <span>Retour</span>
  </button>

  <p>
    {{ post.title }}
  </p>
  <pre>
    <p class="shebang">{{ post.content_type }}</p>
    <code>
      <p v-for="line in post.content">{{ line || "\n" }}</p>
    </code>
</pre>

</template>

<style lang="scss" scoped>
.button.back-button {
  background: transparent;
  border: 1px solid var(--grey-5);
  position: absolute;
  top: -4px;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.175);
  }

  & .material-icons {
    font-size: 14px;
    margin-right: 6px;
  }
}

pre {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0;
  position: relative;

  & .shebang {
    position: absolute;
    top: 35px;
    color: var(--grey-5);
    font-style: italic;
    font-size: 0.75rem;
    z-index: 1;
    left: 40px;
  }
}

code {
  background: var(--terminal-color);
  color: var(--codeline-color);
  padding: 0 3rem;
  margin: 1rem;
  position: relative;
  border-radius: 5px; // 0.25rem;
  counter-reset: step;
  counter-increment: step 0;
  transition: background 0.3s;
  outline: none;
  width: 100%;
  max-width: 1000%;
  min-height: calc(100vh - 135px);
}

code:focus {
  background: #2e3d44;
}

code p {
  position: relative;
  margin: 0.2rem;
  display: block;
  white-space: pre;
  text-align: left;
}

code p::before {
  position: absolute;
  top: 0;
  left: -1.75rem;
  color: #50646d;
  content: counter(step);
  counter-increment: step;
}
</style>