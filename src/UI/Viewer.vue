<script lang="ts">
import { create } from '@tauri-apps/plugin-fs';
import { save } from '@tauri-apps/plugin-dialog';
import { Post } from '../interfaces';

export default {
  name: 'Viewer',
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
      post: this.editor.post as Post,
    }
  },
  methods: {
    goBack() {
      this.mode.affichage = false
    },
    mode_edit() {
      this.mode.affichage = false;
      this.mode.edition = true;
      this.editor.open = true;
      this.editor.type = "sh";
      this.editor.post = this.post;
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

  <p
    contenteditable="false"
    class="post-title"
    id="post-title"
  >
    {{ post.title }}
  </p>
  <div class="editor">
    <div class="controls">
      <div class="infos">{{ post.content.length }} lignes - {{ post.content.filter(Boolean).length }} non vides</div>
      <ul>
        <li>
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
            @click='download([recode(post.content_type), ...post.content].join("\r\n"))'
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
    <p class="shebang" v-html="post.content_type" />
    <code>
      <p v-for="line in post.content">{{ line || "\n" }}</p>
    </code>
</pre>

  </div>

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

.post-title {
  width: 100px;
  margin: 0 auto;

  &[contenteditable="true"] {
    border: 1px dotted var(--grey-4);
  }
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
  }
}

code {
  background: var(--terminal-color);
  color: var(--codeline-color);
  padding: 0 3rem;
  margin: 1rem;
  position: relative;
  border-bottom-left-radius: 5px; // 0.25rem;
  border-bottom-right-radius: 5px; // 0.25rem;
  counter-reset: step;
  counter-increment: step 0;
  transition: background 0.3s;
  outline: none;
  width: 100%;
  max-width: 1000%;
  min-height: calc(100vh - 135px);

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
}

code:focus {
  background: #2e3d44;
}

code p {
  position: relative;
  margin: 0.2rem;
  display: block;
  white-space: pre;
  text-align: left;
}

code p::before {
  position: absolute;
  top: 0;
  left: -1.75rem;
  color: #50646d;
  content: counter(step);
  counter-increment: step;
}
</style>