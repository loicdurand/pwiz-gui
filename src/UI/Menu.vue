<script lang="ts">
import SquareCard from './SquareCard.vue';
import Editor from './Editor.vue';

const menu_classes = 's4 m4 l2';

export default {
  name: "Menu",
  props: {
    mode: {
      type: Object,
      required: true
    },
    editor: {
      type: Object,
      required: true
    },
    openEditor: {
      type: Function as () => any,
      required: true
    },
    closeEditor: {
      type: Function as () => any,
      required: true
    }
  },
  components: {
    SquareCard,
    Editor,
  },
  data() {
    return {
      menu_classes
    };
  },
  methods: {
    goBack() {
      this.editor.open ? this.closeEditor(this.editor.post === null) : this.mode.edition = false
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

  <p v-if="!editor.open">
    Quel type de contenu souhaitez-vous créer?
  </p>
  <p v-else>
    <span
      id="post-title"
      class="post-title"
      contenteditable="true"
    >
      {{ editor.post===null? "script.sh":editor.post.title}}
    </span>
  </p>

  <div
    v-if="!editor.open"
    class="row app-list-of-articles mode-edition"
  >

    <div
      class="col"
      :class="menu_classes"
    >
      <SquareCard
        logo="sh"
        title="script"
        @click="openEditor"
      >
        <img src="../assets/icons/shell.png">
      </SquareCard>
    </div>

    <div
      class="col"
      :class="menu_classes"
    >
      <SquareCard
        logo="txt"
        title="texte brut"
      >
        <img src="../assets/icons/text.png">
      </SquareCard>
    </div>

    <div
      class="col"
      :class="menu_classes"
    >
      <SquareCard
        logo="md"
        title="markdown"
      >
        <img src="../assets/icons/markdown.png">
      </SquareCard>
    </div>

    <div
      class="col"
      :class="menu_classes"
    >
      <SquareCard
        logo="link"
        title="lien"
      >
        <img src="../assets/icons/link.png">
      </SquareCard>
    </div>

    <div
      class="col"
      :class="menu_classes"
    >
      <SquareCard
        logo="dl"
        title="téléchargement"
      >
        <img src="../assets/icons/download.png">
      </SquareCard>
    </div>

    <div
      class="col"
      :class="menu_classes"
    >
      <SquareCard
        logo="contact"
        title="contact"
      >
        <img src="../assets/icons/contact.png">
      </SquareCard>
    </div>

    <!-- suggestions: pdf, image, vidéo, etc... -->

  </div>

  <!-- ÉDITEUR OUVERT -->
  <div
    v-else
    class="row app-list-of-articles mode-edition"
  >

    <Editor :post="editor.post">

      <textarea

        class="code-textarea"
        id="post-content"
        placeholder="Tapez votre contenu ici"
        spellcheck="false"
      >{{ editor.post===null?'':editor.post.content.join("\r\n") }}</textarea>

    </Editor>

  </div>

</template>

<style lang="scss" scoped>
.col {
  margin-top: 1rem;
}

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

.post-title {
  width: 100px;
  margin: 0 auto;
  border: 1px dotted var(--grey-4);
}
</style>