<script lang="ts">

import { Post } from '../interfaces';
import { invoke } from "@tauri-apps/api/core";

function removeTag(e: Event): void {
  const target = e.currentTarget as HTMLElement;
  const parent = target.parentElement;
  if (parent)
    parent.outerHTML = '';
}

function enable_tags() {
  const input: HTMLInputElement | null = document.querySelector(".chip-input");
  const chips: HTMLElement | null = document.querySelector(".chips");

  if (input === null)
    return;

  document.querySelector(".form-field")?.addEventListener('click', () => {
    input.focus();
  });

  input.addEventListener('keydown', function (event: KeyboardEvent) {

    if (event.key === 'Enter') {

      chips?.appendChild(function () {
        const _chip = document.createElement('div');

        _chip.classList.add('chip');

        _chip.append(
          (function () {
            const _chip_text = document.createElement('span');
            _chip_text.classList.add('chip--text');
            _chip_text.innerHTML = input.value;

            return _chip_text;
          })(),
          (function () {
            const _chip_button = document.createElement('span');
            _chip_button.classList.add('chip--button');
            _chip_button.innerHTML = '×';
            _chip_button.addEventListener('click', removeTag);

            return _chip_button;
          })()
        );

        return _chip;
      }());
      input.value = '';
    }
  });
}

export default {
  name: 'Editor',
  props: {
    post: {
      type: {} as Post | null,
      required: true
    }
  },
  methods: {
    removeTag,
    async submit() {
      // recuil des valeurs de base
      const id: HTMLElement | null = document.getElementById('post-id');
      const title: HTMLElement | null = document.getElementById('post-title');
      const content: HTMLElement | null = document.getElementById('post-content');
      const contenttype: HTMLElement | null = document.getElementById('post-contenttype');

      // recueil des tags
      const chips = document.querySelectorAll(".chip--text");
      const tags = chips ? [...chips].map(chip => chip.innerHTML) : [];
      const post = {
        id: (id as HTMLInputElement)?.value,
        title: title?.innerHTML,
        content: (content as HTMLTextAreaElement)?.value,
        contenttype: contenttype?.innerHTML || "sh",
        tags: tags.join(' ')
      };

      if (!post.id)
        await invoke('insert_post', post);
      else
        await invoke('update_post', post);
      location.reload();
    }

  },
  mounted() {
    enable_tags();
  }
}
</script>

<template>

  <input
    type="hidden"
    id="post-id"
    :value="post === null ? '' : post.id"
  >

  <article class="app-editor editable">
    <div class="card-preview">

      <div class="card-window">

        <div
          class="shebang"
          id="post-contenttype"
          contenteditable="true"
          v-html="post === null ? '#!/bin/sh' : post.content_type"
        />

        <slot></slot>

      </div>
    </div>
    <div class="card-content">

      <div class="form-field">
        <div
          v-if="post === null"
          class="chips"
        >
        </div>
        <div
          v-else
          class="chips"
        >
          <div
            class="chip"
            v-for="tag in post.tags.filter(Boolean)"
          >
            <span class="chip--text">{{ tag }}</span>
            <span
              class="chip--button"
              @click="removeTag"
            >×</span>
          </div>
        </div>
        <label for="chip-input">
          Tags permettant de trouver cette fiche: [ ENTRER ] pour valider
        </label>
        <input
          name="chip-input"
          autofocus
          autocomplete="off"
          class="chip-input"
        />
      </div>

    </div>
    <footer class="card-footer">
      <button
        type="button"
        @click="submit"
      >
        Valider
      </button>
    </footer>
  </article>

</template>

<style lang="scss">
.app-editor {
  width: 100%;
  height: 100%;
  background: white;
  display: inline-block;
  position: relative;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 9999;

  /* preview */
  & .card-preview {
    position: relative;
    height: 55%;
    max-height: 55% !important;
    margin-bottom: 0;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;

    & .card-window {
      height: 100%;
      align-items: center;

      & .shebang {
        position: absolute;
        color: var(--grey-6);
        font-size: 18px;
        line-height: 24px;
        top: 4px;
        left: 12px;
        font-style: italic;
      }

      & .code-textarea {
        border: 1px solid var(--terminal-color); // rgb(13, 221, 240);
        width: 100%;
        height: 100%;
        padding: 30px 10px 0 10px;
        resize: none;
        overflow-y: scroll;
        color: var(--codeline-color);
        font-size: 18px;
        background: repeating-linear-gradient(var(--terminal-color) 0, var(--terminal-color) 29px, var(--grey-8) 30px, black 30px);
        line-height: 30px;
      }
    }
  }

  /* fin preview */

  /* content */
  & .card-content {
    position: relative;
    min-height: 20% !important;
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

  /* fin content */

  /* footer */
  & .card-footer {
    min-height: 20%;
    position: relative;

    & .more-button {
      position: absolute;
      vertical-align: middle;
      height: 4vh;
      width: 4vh;
      right: 1rem;
    }
  }

  /* fin footer */

  /* mode edition */
  &.editable {
    height: 100vh !important;

    & .card-preview {
      height: 65% !important; //67px
    }

    & .card-content {
      height: 15%;

      & .form-field {
        height: 100%;
        min-height: 34px;
        margin: 12px;
        cursor: text;
        border-radius: 3px;
        // border: 1px solid var(--grey-5);
        padding: 6px;
        position: relative;

        & .chips .chip {
          width: auto;
          overflow: hidden;
          float: left;
          background: var(--tag-color);
          border-radius: 3px 0 0 3px;
          color: #fff;
          height: 30px;
          line-height: 12px;
          padding: 0 6px 0 12px;
          position: relative;
          margin: 0 10px 10px 0;
          text-decoration: none;
          -webkit-transition: color 0.2s;
          font-size: 12px;

          &::before {
            background: #fff;
            border-radius: 10px;
            box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
            content: "";
            height: 6px;
            left: 8px;
            position: absolute;
            width: 6px;
            top: 11px;
          }

          &::after {
            background: #fff;
            border-bottom: 15px solid transparent;
            border-top: 15px solid transparent;
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            border-left: 12px solid var(--tag-color);
          }

          & .chip--button {
            padding: 0 8px 0 0;
            cursor: pointer;
            display: inline-block;
          }

          & .chip--text {
            padding: 8px;
            cursor: none;
            display: inline-block;
            pointer-events: none;
          }
        }

        &>label {
          position: absolute;
          bottom: 46px;
          left: 0;
          // color:green;
          width: 100%;
          text-align: center;
        }

        &>input {
          padding: 15px;
          display: block;
          box-sizing: border-box;
          width: 100%;
          height: 34px;
          margin: 5px 15% 0 15%;
          display: inline-block;
          background-color: transparent;
          outline: none;
          position: absolute;
          border-radius: 3px;
          bottom: 12px;
          width: 70%;
          left: 0;

        }

      }
    }

    & .card-footer {
      button {
        background: var(--valid-color);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
        margin: 10px;
        display: inline-block;
        transition: background 0.3s;
        position: absolute;
        right: 0;
        top: 1rem;

        &:hover {
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.175);
        }
      }
    }
  }

  /* fin mode edition */
}
</style>