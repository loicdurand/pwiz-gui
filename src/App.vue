<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";

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

      <div class="col s6 m4 l3">

        <Card
          title="Titre de l'article"
          :tags="['tutoriel', 'rust', 'tauri', 'vue', 'ts', 'js', 'typescript', 'javascript']"
        >
        
            <p class="terminal">
              <span class="shebang">#!/bin/bash</span>
              <br>
              <span class="green">~</span> <span class="blue">❯</span> <span class="yellow">cd /home</span>
              <br>
              <span class="green">~</span> <span class="blue">❯</span> <span class="yellow">chown $USER:
                /home/$USER</span>
              <br>
              <span class="green">~</span> <span class="blue">❯</span> <span class="yellow">ls -alH</span>
            </p>

        </Card>

      </div>

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

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
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

  // fin HEADER

  // LIST OF ARTICLES
  & .app-list-of-articles {
    margin-top: 20px;

    & .terminal {
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
  }

  // fin LIST OF ARTICLES
}
</style>