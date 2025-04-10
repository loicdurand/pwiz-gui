<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { create } from '@tauri-apps/plugin-fs';
import { save } from '@tauri-apps/plugin-dialog';
//import { Post } from '../interfaces';
import EditorJS from '@editorjs/editorjs';
import Parser from 'editorjs-parser';
import editorjs_config from '../editorjs_config';
import Modal from "./Modal.vue";
import TagsSelector from "./TagsSelector.vue";
const edjsParser = new Parser();

export default {
  name: "Wysiwyg",
  components: {
    Modal,
    TagsSelector
  },
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
      editorjs: null as EditorJS | null,
      post: this.editor.post
    };
  },
  methods: {
    goBack() {
      this.mode.affichage = false
    },
    openModal() {
      document?.getElementById('set-tags-modal')?.classList.add('visible');
    },
    mode_edit() {
      this.editor.is_editable = true;
    },
    mode_lock() {
      this.editor.is_editable = false;
    },
    async download() {
      const path = await save();
      if (path && this.editorjs !== null) {
        const file = await create(path);
        const outputData = await this.editorjs.save();
        const html = edjsParser.parse(outputData);
        await file.write(new TextEncoder().encode(html));
        await file.close();
      }
    },
    async copy_to_clipboard(e: Event): Promise<void> {
      if (this.editorjs === null)
        return;
      const target = e.currentTarget as HTMLElement;
      const outputData = await this.editorjs.save();
      const html = edjsParser.parse(outputData);
      navigator.clipboard.writeText(html);
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
    },
    async submit() {
      if (this.editorjs === null)
        return;
      // recuil des valeurs de base
      const id: HTMLElement | null = document.getElementById('post-id');
      const title: HTMLElement | null = document.getElementById('post-title');
      //const content: HTMLElement | null = document.getElementById('post-content');
      const contenttype = "text";

      const outputData: Object = await this.editorjs.save();

      // recueil des tags
      const chips = document.querySelectorAll(".chip--text");
      const tags = chips ? [...chips].map(chip => chip.innerHTML) : [];
      const post = {
        id: (id as HTMLInputElement)?.value,
        title: title?.innerHTML,
        content: JSON.stringify(outputData),
        contenttype,
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
    if (this.post.id !== null)
      editorjs_config.data = JSON.parse(this.post.content);
    this.editorjs = new EditorJS(editorjs_config);
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
            @click='download()'
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
        v-if="!editor.is_editable"
        class="mask"
      ></div>
      <div
        id="editorjs"
        class="editorjs"
      ></div>
    </div>

    <ul
      v-if="editor.is_editable"
      class="btns-group btns-group--inline"
    >

      <li class="right"><a
          class="confirm open-modal"
          role="button"
          tabindex="0"
          href="#"
          @click="openModal"
        >
          Suivant
        </a></li>
    </ul>

  </div>

  <Modal id="set-tags-modal">
    <TagsSelector :editor="editor" />

    <template v-slot:header>
      <h3>
        Termes de recherche
      </h3>
    </template>

    <template v-slot:footer>
      <ul class="btns-group btns-group--inline">

        <li><a
            class="confirm"
            role="button"
            tabindex="0"
            href="#"
            @click="submit"
          >
            Sauvegarder
          </a></li>
      </ul>
    </template>
  </Modal>

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