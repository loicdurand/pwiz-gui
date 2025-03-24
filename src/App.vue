<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

// const greetMsg = ref("");
// const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>

  <main class="container">

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

    <div class="row app-list-of-articles">

      <article class="col s12 app-card">
        <span class="card-preview">illustration</span>
        <div class="card-content">titre</div>
        <footer class="card-footer">footer</footer>
      </article>

    </div>

  </main>
</template>

<style lang="scss">
:root {
  font-family: EBGaramont, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  // HEADER
  & .app-header {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid;

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

  // fin HEADER

  // LIST OF ARTICLES
  & .app-list-of-articles {
    margin-top: 50px;

    // CARD
    & .app-card {
      height: 250px;
      width: 100%;
      border: 1px solid;
      background: white;
      display: inline-block;
      margin: auto;
      border-radius: 19px;
      position: relative;
      text-align: center;
      box-shadow: -1px 15px 30px -12px black;
      z-index: 9999;

      & .card-preview {
        position: relative;
        height: 230px;
        margin-bottom: 35px;
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
      }

      & .card-content {
        position: relative;
        height: 230px;
        margin-bottom: 35px;
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
      }

      & .card-footer {}
    }

    // fin CARD
  }

  // fin LIST OF ARTICLES
}
</style>