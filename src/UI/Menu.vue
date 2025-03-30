<script lang="ts">
import SquareCard from './SquareCard.vue';

const menu_classes = 's4 m4 l4';

export default {
  name: "Menu",
  props: {
    mode: Object
  },
  components: {
    SquareCard
  },
  data(){
    return {
       menu_classes
    };
  }
}
</script>

<template>

  <button
    type="button"
    class="button back-button"
    @click="this.mode.edition = false"
  >
    <i class="material-icons">arrow_back</i>
    <span>Retour</span>
  </button>

  <p>
    Quel type de contenu souhaitez-vous créer?
  </p>

  <div class="row app-list-of-articles mode-edition">

    <div
      class="col"
      :class="menu_classes"
    >
      <SquareCard
        logo="sh"
        title="script"
      >
        <img src="../assets/icons/shell.avif">
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
</style>