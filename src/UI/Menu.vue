<script lang="ts">
import SquareCard from './SquareCard.vue';

const menu_classes = 's4 m3 l2';

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
    }
  },
  components: {
    SquareCard
  },
  data() {
    return {
      menu_classes
    };
  },
  methods: {
    goBack() {
      this.mode.edition = false;
      this.mode.affichage = false;
    },
    openEditor() {
      this.mode.edition = false;
      this.mode.affichage = true;
      this.editor.type = "script";
      this.editor.open = true;
      this.editor.post = {
        id: null,
        title: 'mon_fichier.sh',
        content: ["Votre contenu ici..."],
        content_type: '#!/bin/bash',
        tags: []
      };
      this.editor.is_editable = true;
    },
    openWysiwyg() {
      this.mode.edition = false;
      this.mode.affichage = true;
      this.editor.type = "text";
      this.editor.open = true;
      this.editor.post = {
        id: null,
        title: 'mon document',
        content: [],
        content_type: '',
        tags: []
      };
      this.editor.is_editable = true;
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
      {{ editor.post === null ? "script.sh" : editor.post.title }}
    </span>
  </p>

  <div class="row app-list-of-articles mode-edition">

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
        title="texte"
        @click="openWysiwyg"
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