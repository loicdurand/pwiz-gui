<script lang="ts">

import { Post } from '../interfaces';

export default {
  name: "TagsSelector",
  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      post: this.editor.post as Post
    };
  },
  methods: {

    removeTag(e: Event): void {
      const target = e.currentTarget as HTMLElement;
      const parent = target.parentElement;
      if (parent)
        parent.outerHTML = '';
    },

    enable_tags() {
      const removeTag = this.removeTag;
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
  },
  mounted() {
    this.enable_tags();
  }
}
</script>

<template>
  <div class="form-field">

    <div class="chips">
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
    <div class="input-field">
      <label for="chip-input">
        Tags permettant de trouver cette fiche:<br>
        [ ENTRER ] pour valider
      </label>
      <input
        name="chip-input"
        autofocus
        autocomplete="off"
        class="chip-input"
      />
    </div>
  </div>
</template>

<style lang="scss">
.form-field {
  min-height: 10rem;
  margin: 12px;
  cursor: text;
  border-radius: 3px;
  // border: 1px solid var(--grey-5);
  padding: 6px;
  position: relative;
  overflow: scroll;

  & .chips {
    min-height: 5rem;
    position: relative;
  }

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

  & .input-field {
    display: inline-block;

    &>label {
      display: block;
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
      border-radius: 3px;
      bottom: 12px;
      width: 70%;
    }
  }



}
</style>