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

      <div class="col s6 m4 l3">
        <article class="app-card">
          <div class="card-preview">
            <button
              class="icon-button copy-button"
              type="button"
            >
              <i
                class="material-icons"
                title="Copier"
              >content_copy</i>
            </button>
            <div class="card-window">
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
            </div>
          </div>
          <div class="card-content">
            <h2 class="card-title">Titre de l'article</h2>
            <ul class="card-tags">
              <ul class="card-tags-list">
                <li class="tag">
                  tutoriel
                </li>
                <li class="tag">
                  rust
                </li>
                <li class="tag">
                  tauri
                </li>
                <li class="tag">
                  typescript
                </li>
                <li class="tag">
                  ts
                </li>
                <li class="tag">
                  js
                </li>
                <li class="tag">
                  tag 3
                </li>
                <li class="tag">
                  tag 4
                </li>
                <li class="tag">
                  tag 1
                </li>
                <li class="tag">
                  tag 2
                </li>
                <li class="tag">
                  tag 3
                </li>
                <li class="tag">
                  tag 4
                </li>
              </ul>
            </ul>
          </div>
          <footer class="card-footer">
            <button
              class="icon-button more-button"
              type="button"
            >
              <i
                class="material-icons"
                title="Afficher le menu"
              >more_horiz</i>
            </button>
          </footer>
        </article>
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

    // CARD
    & .app-card {
      height: 40vh;
      min-width: 100%;
      background: white;
      display: inline-block;
      margin: auto;
      border-radius: 19px;
      position: relative;
      text-align: center;
      box-shadow: -1px 15px 30px -12px black;
      z-index: 9999;

      // preview
      & .card-preview {
        position: relative;
        height: 22vh;
        margin-bottom: 0;
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;

        & .copy-button {
          position: absolute;
          top: .5rem;
          right: .5rem;
          color: var(--grey-4);
        }

        & .card-window {
          height: 100%;
          align-items: center;

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
      }

      // fin preview
      // content
      & .card-content {
        position: relative;
        height: 14vh;
        margin-top: 0;
        border-bottom: 1px solid var(--grey-3);

        & .card-title {
          font-weight: 700;
          padding: 6px 0 0 0;
          margin: 0;
          line-height: 2.2vh;
        }

        & .card-tags {
          height: 10.8vh;
          padding: 0;

          & .card-tags-list {
            margin-left: 0;
            padding-left: 0;

            li.tag {
              display: inline-block;
              padding: 0 5px;
              margin: 0 5px;
              background: var(--theme-color);
              color: white;
              border-radius: 5px;
              font-size: 12px;
              line-height: 20px;
            }
          }
        }
      }

      // fin content
      // footer
      & .card-footer {
        position: relative;

        & .more-button {
          position: absolute;
          vertical-align: middle;
          height: 4vh;
          width: 4vh;
          right: 0;
        }
      }

      // fin footer 
    }

    // fin CARD
  }

  // fin LIST OF ARTICLES
}
</style>