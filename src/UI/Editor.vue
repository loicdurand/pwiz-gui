<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { create } from '@tauri-apps/plugin-fs';
import { save } from '@tauri-apps/plugin-dialog';
import { Post } from '../interfaces';
import { hljs, get_lang_by_shebang } from '../hljs_init';
import showdown from 'showdown';
import Modal from "./Modal.vue";
import TagsSelector from "./TagsSelector.vue";

export default {
  name: 'Editor',
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
    const post = this.editor.post as Post;
    const lines = post.content;
    const lang = get_lang_by_shebang(post.content_type);

    return {
      post,
      hightlighted: lang ? lines.map(line => {
        return hljs.highlight(line as string,
          { language: lang }
        ).value
      }) : lines,
      converter: new showdown.Converter(),
    }
  },
  methods: {
    goBack() {
      this.mode.affichage = false
    },
    openModal() {
      document?.getElementById('set-tags-modal')?.classList.add('visible');
    },
    async highlight(e: Event) {
      const target = e.target as HTMLTextAreaElement;
      if (target === null)
        return;
      const lines = target.value.split("\n");
      const shebang = document.getElementById('post-contenttype') as HTMLParagraphElement;
      const lang = get_lang_by_shebang(shebang.innerHTML.trim());
      this.hightlighted = lang ? lines.map(line => {
        return hljs.highlight(line as string,
          { language: lang }
        ).value || "\n"
      }) : lines;

      if (this.editor.type === 'markdown') {
        const html = (this.converter as showdown.Converter).makeHtml(target.value);
        const preview = document.querySelector('.markdown-preview') as HTMLObjectElement;
        preview.setAttribute('srcdoc', html);
      }
    },
    mode_edit() {
      this.editor.is_editable = true;
    },
    mode_lock() {
      this.editor.is_editable = false;
    },
    recode(str: string): string {
      return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (m: string) => {
        return ({
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#039;': "'"
        })[m] || m;
      });
    },
    async download() {
      const path = await save();
      if (path) {
        const file = await create(path);
        const content: HTMLElement | null = document.getElementById('post-content');
        const contenttype: HTMLElement | null = document.getElementById('post-contenttype');
        await file.write(new TextEncoder().encode([
          contenttype?.innerHTML || "",
          (content as HTMLTextAreaElement)?.value || this.post.content.join("\r\n"),
        ].join("\n")));
        await file.close();
      }
    },
    copy_to_clipboard(e: Event): void {
      const target = e.currentTarget as HTMLElement;
      const content: HTMLElement | null = document.getElementById('post-content');
      navigator.clipboard.writeText((content as HTMLTextAreaElement)?.value || this.post.content.join("\r\n"));
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
        contenttype: contenttype?.innerHTML || "",
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
    if (this.editor.type === 'markdown') {
      const html = (this.converter as showdown.Converter).makeHtml(this.post.content.join("\n"));
      const preview = document.querySelector('.markdown-preview') as HTMLObjectElement;
      if (preview !== null)
        preview.setAttribute('srcdoc', html);
    }
  },
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
    :contenteditable="editor.is_editable"
    class="post-title"
    id="post-title"
  >
    {{ post.title }}
  </p>
  <div class="editor">
    <div class="controls">
      <div class="infos">{{ post.content.length }} lignes - {{ post.content.filter(Boolean).length }} non vides</div>
      <ul>
        <li v-if="editor.type === 'markdown'">
          <span
            role="button"
            tabindex="0"
            class="icon-button download-button pointer"
          >
            <i
              class="material-icons"
              title="Ouvrir l'aperçu"
            >compare</i>
          </span>
        </li>
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
    <pre>
    <p class="shebang" :class="{ 'hidden': editor.type === 'markdown' }" id="post-contenttype" v-html="post.content_type" :contenteditable="editor.is_editable" title='Shebang pour ce script (ex: #!/bin/bash, mais aussi <?php, <html lang="fr">, etc...)'/>
    <code :class="{ 'preview-open': editor.type === 'markdown' }">
      <p v-for="line in hightlighted" v-html="line"/>
      <textarea 
      id="post-content"
      v-if="editor.is_editable" 
      v-html='post.content.filter(Boolean).join("\r\n")'
      @keyup="highlight"
       />
    </code>
    <iframe sandbox="" class="markdown-preview" v-if="editor.type === 'markdown'"></iframe>
</pre>

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

    & .infos {
      height: 100%;
      line-height: 41px;
      display: inline;
    }

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

pre {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0;
  position: relative;

  & .shebang {
    position: absolute;
    top: 35px;
    color: var(--grey-5);
    font-style: italic;
    font-size: 0.75rem;
    z-index: 1;
    left: 40px;

    &:empty:before {
      content: 'shebang?';
    }
  }
}

code {
  background: var(--terminal-color);
  color: var(--codeline-color);
  padding: 24px 3rem;
  margin: 1rem;
  position: relative;
  border-bottom-left-radius: 5px; // 0.25rem;
  border-bottom-right-radius: 5px; // 0.25rem;
  counter-reset: step;
  counter-increment: step 0;
  transition: background 0.3s;
  outline: none;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 135px);
  overflow-x: scroll;

  &:empty:before {
    content: 'shebang?';
  }

  & .controls {
    border: 1px solid var(--grey-5);
    position: absolute;
    top: -1.5rem;
    left: 0;
    width: 100%;
    height: 1.5rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    &>div {
      position: relative;
    }
  }

  &.preview-open {
    width: 60%;
    margin-right: 0;
  }
}

.markdown-preview {
  border: 1px solid var(--grey-5);
  border-top: 0px;
  height: 100%;
  width: 40%;
  margin-right: 1rem;
  min-height: calc(100vh - 135px);
  overflow-x: scroll;
  position: relative;
}

textarea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  white-space: pre;
  text-align: left;
  line-height: 24px;
  padding: 71px 47px;
  color: transparent;
  font-size: 15px;
  font-family: monospace;
  caret-color: #fff;
}

code:focus {
  background: #2e3d44;
}

code p {
  position: relative;
  margin: 0;
  display: block;
  white-space: pre;
  text-align: left;
  line-height: 24px;
  font-size: 15px;
  font-family: monospace;
}

code p::before {
  position: absolute;
  top: 0;
  left: -1.75rem;
  color: #50646d;
  content: counter(step);
  counter-increment: step;
}

ul.btns-group.btns-group--inline li [role=button].open-modal {
  background-color: var(--blue-9);
  color: #fff;
  border: none;
  margin: -24px 16px 0 0;
}
</style>