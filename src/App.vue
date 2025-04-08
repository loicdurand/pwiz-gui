<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";
import Header from "./UI/Header.vue";
import Terminal from "./UI/Terminal.vue";
import Loader from "./UI/Loader.vue";
import Menu from "./UI/Menu.vue";
import Modal from "./UI/Modal.vue";
import Viewer from "./UI/Viewer.vue";

import { Post } from "./interfaces";

const mode = ref({
  edition: false,
  affichage: false
});
let posts = ref<Post[]>([]);
const loading = ref(true);
const editor = ref<{
  open: boolean;
  type: string;
  post: Post | null;
  is_editable: Boolean;
}>({
  open: false,
  type: "",
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

async function delete_post(post: Post) {
  const menu_actif: HTMLElement | null = document.querySelector('.active.card-menu');
  if (!menu_actif)
    return;

  loading.value = true;
  const post_id = menu_actif?.dataset.id;
  await invoke('delete_post', { id: post_id });
  location.reload();
}

function openEditor(post: Post | null) {
  mode.value.edition = true;
  editor.value.open = true;
  editor.value.type = "sh";
  editor.value.post = post;
}

function openViewer(post: Post, is_editable:Boolean) {
  mode.value.affichage = true;
  editor.value.post = post;
  editor.value.is_editable = is_editable;
}

function closeEditor(mode_edition_value: boolean) {
  mode.value.edition = mode_edition_value;
  editor.value.open = false;
  editor.value.type = "";
}

get_posts();

</script>

<template>

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
            :openEditor="() => openEditor(post)"
          >

            <Terminal
              :shebang="post.content_type"
              :lines="post.content"
              @click="() => openViewer(post, false)"
            />

          </Card>

        </div>

      </template>

    </div>

  </main>

  <main
    v-else-if="mode.edition"
    class="container mode-edition"
  >

    <Menu
      :mode="mode"
      :editor="editor"
      :openEditor="() => openEditor(null)"
      :closeEditor="closeEditor"
    />

  </main>

  <main
    v-else-if="mode.affichage"
    class="container mode-edition"
  >

    <Viewer
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
