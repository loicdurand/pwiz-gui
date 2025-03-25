<script lang="ts">
export default {
  name: 'Header'
}
</script>

<template>
  <header class="app-header">
    <div class="app-search-wrap">
      <div class="search">
        <input
          type="text"
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
  </header>

</template>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
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
      color: #9DBFAF;

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

  // fin SEARCH
}
</style>