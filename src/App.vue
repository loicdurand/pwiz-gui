<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";
import Header from "./UI/Header.vue";
import Terminal from "./UI/Terminal.vue";
import MiniView from "./UI/MiniView.vue";
import Loader from "./UI/Loader.vue";
import Menu from "./UI/Menu.vue";
import Modal from "./UI/Modal.vue";
import Editor from "./UI/Editor.vue";
import Wysiwyg from "./UI/Wysiwyg.vue";

import { Post } from "./interfaces";

const mode = ref({
  edition: false,
  affichage: false
});
let posts = ref<Post[]>([]);
const loading = ref(true);
const editor = ref<{
  open: boolean;
  type: "script" | "text" | "markdown";
  post: Post | null;
  is_editable: Boolean;
}>({
  open: false,
  type: "script",
  post: null,
  is_editable: false
});

async function get_posts() {
  loading.value = true;
  let results: Post[] = await invoke('get_posts');
  for (let result of results)
    posts.value.push(result);
  loading.value = false;
};

async function delete_post() {
  const menu_actif: HTMLElement | null = document.querySelector('.active.card-menu');
  if (!menu_actif)
    return;

  loading.value = true;
  const post_id = menu_actif?.dataset.id;
  await invoke('delete_post', { id: post_id });
  location.reload();
}

function openEditor(post: Post, is_editable: Boolean) {
  mode.value.affichage = true;
  editor.value.post = post;
  editor.value.type = post.content_type === 'text' ? 'text' : post.content_type === '// markdown' ? 'markdown' : 'script';
  editor.value.is_editable = is_editable;
}

get_posts();

</script>

<template>

  <!-- AFFICHAGE AU LANCEMENT DE l'APP -->

  <main
    v-if="!mode.edition && !mode.affichage"
    class="container"
  >

    <Header
      :posts="posts"
      :mode="mode"
    />

    <div class="row app-list-of-articles">

      <template v-if="loading">
        <Loader />
      </template>

      <template v-else>

        <div
          v-for="post in posts"
          class="col s6 m4 l3"
        >

          <Card
            :post="post"
            :editor="editor"
            :openEditor="() => openEditor(post, true)"
          >

            <Terminal
              v-if="!['text', '// markdown'].includes(post.content_type)"
              :shebang="post.content_type"
              :lines="post.content"
              @click="() => openEditor(post, false)"
            />

            <MiniView
              v-else
              class="post-content"
              @click="() => openEditor(post, false)"
              :content="post.content"
              :shebang="post.content_type"
            />

          </Card>

        </div>

      </template>

    </div>

  </main>

  <!-- OUVERTURE DU MENU -->

  <main
    v-else-if="mode.edition"
    class="container mode-edition"
  >

    <Menu
      :editor="editor"
      :mode="mode"
    />

  </main>

  <!-- OUVERTURE DE L'EDITEUR -->

  <main
    v-else-if="mode.affichage"
    class="container mode-edition"
  >

    <Editor
      v-if="['script', 'markdown'].includes(editor.type)"
      :editor="editor"
      :mode="mode"
    />

    <Wysiwyg
      v-else
      :editor="editor"
      :mode="mode"
    />

  </main>

  <Modal id="confirm-delete-modal">
    <p>
      La fiche va être
      <b>
        définitivement
      </b>
      supprimée. Etes-vous sûr de vouloir continuer?
    </p>

    <template v-slot:footer>
      <ul class="btns-group btns-group--inline">

        <li><a
            class="delete"
            role="button"
            tabindex="0"
            href="#"
            @click="delete_post"
          >
            Supprimer
          </a></li>
        <li><a
            class="abort"
            role="button"
            tabindex="0"
            href="#"
          >
            Annuler
          </a></li>
      </ul>
    </template>
  </Modal>

</template>
