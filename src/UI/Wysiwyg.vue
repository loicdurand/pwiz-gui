<script lang="ts">
//import { invoke } from "@tauri-apps/api/core";
import { create } from '@tauri-apps/plugin-fs';
import { save } from '@tauri-apps/plugin-dialog';
//import { Post } from '../interfaces';
import EditorJS from '@editorjs/editorjs';
import editorjs_config from '../editorjs_config';

export default {
  name: "Wysiwyg",
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
  data() {
    return {
      post: this.editor.post
    };
  },
  methods: {
    goBack() {
      this.mode.affichage = false
    },
    mode_edit() {
      this.editor.is_editable = true;
    },
    mode_lock() {
      this.editor.is_editable = false;
    },
    async download(data: string) {
      const path = await save();
      if (path) {
        const file = await create(path);
        await file.write(new TextEncoder().encode(data));
        await file.close();
      }
    },
    copy_to_clipboard(e: Event): void {
      const target = e.currentTarget as HTMLElement;
      const content = target?.dataset.content || '';
      navigator.clipboard.writeText(content);
      fadeOut(target);

      function fadeOut(target: HTMLElement) {
        const fadeTarget = target.querySelector('.copied') as HTMLElement | null;
        if (!fadeTarget)
          return;

        fadeTarget.style.display = "inline";
        const fadeEffect = setInterval(function () {
          if (fadeTarget && !fadeTarget.style.opacity) {
            fadeTarget.style.opacity = '1';
          }
          if (fadeTarget && parseFloat(fadeTarget.style.opacity) > 0) {
            fadeTarget.style.opacity = (parseFloat(fadeTarget.style.opacity) - 0.1).toString();
          } else if (fadeTarget) {
            clearInterval(fadeEffect);
            fadeTarget.style.display = "none";
            fadeTarget.style.opacity = '1';
          }
        }, 100);
      }
    }
  },
  mounted() {
    const editor = new EditorJS(editorjs_config);
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

  <input
    type="hidden"
    id="post-id"
    :value="post === null ? '' : post.id"
  >

  <p
    contenteditable="true"
    class="post-title"
    id="post-title"
  >
    {{ post.title }}
  </p>

  <div class="editor">
    <div class="controls">
      <ul>
        <li v-if="editor.is_editable">
          <span
            role="button"
            tabindex="0"
            class="icon-button download-button pointer"
            @click="mode_lock"
          >
            <i
              class="material-icons"
              title="Verrouiller en édition"
            >lock</i>
          </span>
        </li>
        <li v-else>
          <span
            role="button"
            tabindex="0"
            class="icon-button download-button pointer"
            :data-content='post.content.join("\r\n")'
            @click="mode_edit"
          >
            <i
              class="material-icons"
              title="Modifier"
            >mode_edit</i>
          </span>
        </li>

        <li>
          <span
            role="button"
            tabindex="0"
            class="icon-button download-button pointer"
            :data-content='post.content.join("\r\n")'
            @click='download(post.content.join("\r\n"))'
          >
            <i
              class="material-icons"
              title="Télécharger"
            >vertical_align_bottom</i>
          </span>
        </li>
        <li>
          <span
            role="button"
            tabindex="0"
            class="icon-button copy-button pointer"
            :data-content='post.content.join("\r\n")'
            @click="copy_to_clipboard"
          >
            <span class="copied">Copié!</span>
            <i
              class="material-icons"
              title="Copier"
            >content_copy</i>
          </span>
        </li>


      </ul>

    </div>

    <div class="pre">
      <div
        v-if="editor.is_editable"
        class="mask"
      ></div>
      <div
        id="editorjs"
        class="editorjs"
      ></div>
    </div>

  </div>

</template>

<style scoped lang="scss">
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

[contenteditable="true"] {
  border: 1px solid var(--grey-5);
  border-radius: 5px;
  padding: 3px;
  min-width: 10ch;
}

.post-title {
  min-width: 100px;
  margin: 0 auto;
}

.editor {
  margin: 0;
  padding: 0;

  .controls {
    border: 1px solid var(--grey-5);
    height: 40px;
    margin: 35px 16px -51px 16px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
    color: var(--grey-7);

    & ul {
      margin: 0;
      padding: 0;
      position: absolute;
      top: .5rem;
      right: .5rem;
      list-style: none;

      & li {
        display: inline-block;
        margin-right: .5rem;

        & .copied {
          display: none;
          position: absolute;
          right: -6px;
          top: -33px;
          background-color: rgba(255, 255, 255, .15);
          padding: 3px;
        }

      }
    }
  }
}

.pre {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0;
  position: relative;
}

.mask {
  width: calc(100% - 2rem);
  height: 100%;
  position: absolute;
  top: 1rem;
  z-index: 2;
  cursor: not-allowed;
}

.editorjs {
  border: 1px solid var(--grey-5);
  color: var(--textline-color);
  padding: 24px 1rem;
  margin: 1rem;
  position: relative;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 135px);
  overflow-x: scroll;
}
</style>