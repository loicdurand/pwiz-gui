<script lang="ts">
import SquareCard from './SquareCard.vue';
export default {
  name: "Menu",
  props: {
    mode: Object
  },
  components:{
    SquareCard
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

    <div class="col s6 m4 l3">
      <SquareCard logo="sh" title="script shell"/>
    </div>

  </div>
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
</style>