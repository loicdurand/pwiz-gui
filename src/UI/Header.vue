<script lang="ts">

function filter(e: Event) {
  const target = e.currentTarget as HTMLButtonElement;
  const value = target.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.app-card');
  cards.forEach(card => {
    const tags = (card as HTMLElement)?.dataset.tags || "";
    const re = new RegExp(value, "i");
    if (value === "" || re.test(tags)) {
      (card as HTMLElement).style.display = 'block';
    } else {
      (card as HTMLElement).style.display = 'none';
    }
  });
}

export default {
  name: 'Header',
  props: {
    mode: Object
  },
  methods: {
    create_post(e: Event) {
      const target = e.currentTarget as HTMLButtonElement;
      target.disabled = true;
      if (this.mode) {
        this.mode.edition = true;
      }
    }
  },
  mounted() {
    // Recherche
    const search = document.getElementById('search-term');
    search?.addEventListener('keyup', filter);
    search?.addEventListener('keydown', filter);
  },
}

</script>

<template>
  <header class="app-header">
    <div class="app-search-wrap">
      <div class="search">
        <input
          type="text"
          id="search-term"
          class="search-term"
          placeholder="Termes à rechercher"
        >
        <button
          type="submit"
          class="search-button"
        >
          <i class="material-icons">search</i>
        </button>
      </div>
    </div>
    <nav class="app-nav-wrap row">
      <ul>
        <li>
          <button
            type="button"
            class="icon-button col app-nav-button"
            @click="create_post"
          >
            <i class="material-icons">add</i>
            <span class="button-text">Ajouter une fiche</span>
          </button>
        </li>
      </ul>
    </nav>
  </header>

</template>

<style lang="scss" scoped>
.app-header {
  position: absolute;
  top: 0;
  margin: 0 auto;
  height: 90px;
  width: 100%;
  border-bottom: 1px solid var(--grey-3);

  // SEARCH
  & .app-search-wrap {
    width: 70%;
    position: absolute;
    top: 6px;
    left: 15%;

    & .search {
      width: 100%;
      position: relative;
      display: flex;
    }

    & .search-term {
      width: 100%;
      border: 2px solid var(--theme-color);
      border-right: none;
      padding: 5px;
      height: 36px;
      border-radius: 5px 0 0 5px;
      outline: none;
      color: var(--input-color);

      &::placeholder {
        text-align: center;
      }

      &:focus {
        color: var(--theme-color);
      }
    }

    & .search-button {
      width: 36px;
      height: 36px;
      border: 1px solid var(--theme-color);
      background: var(--theme-color);
      text-align: center;
      color: #fff;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
      font-size: 20px;
    }
  }

  & .app-nav-wrap {
    position: fixed;
    width: 100%;
    top: 50px;
    height: 30px;

    & ul li {
      list-style-type: none;
      padding: 0;
      position: relative;

      & .app-nav-button {
        padding: 0;
        margin: -16px 6px 0 -40px;
        height: 30px;
        max-height: 30px;
        position: relative;
        cursor: initial;

        &:not(:disabled) {
          cursor: pointer;

          &:hover,
          &:hover span {
            font-weight: 700;
          }
        }

        &.icon-button {
          background: none;
          border: none;
          cursor: pointer;

          & .button-text {
            position: absolute;
            width: 150px;
            height: 30px;
            padding-top: 5px;
            text-align: left;
          }
        }

      }
    }
  }

  // fin SEARCH
}
</style>