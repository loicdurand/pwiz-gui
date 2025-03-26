<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";
import Header from "./UI/Header.vue";
import Terminal from "./UI/Terminal.vue";

// const greetMsg = ref("");
// const name = ref("");
const mode = ref({ edition: true });
const posts = ref([]);

async function get_posts() {
  posts = await invoke('get_posts');
}

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>

  <main
    v-if="!mode.edition"
    class="container"
  >

    <Header
      :posts="posts"
      :mode="mode"
    />

    <div class="row app-list-of-articles">

      <div
        v-for="post in posts"
        class="col s6 m4 l3"
      >

        <Card
          :key="post.id"
          :title="post.title"
          :tags="post.tags"
        >

          <Terminal
            shebang="sh"
            :lines="['echo Hello, World!']"
          />

        </Card>

      </div>

    </div>

  </main>

  <main
    v-else
    class="container"
  >
    <div class="row app-list-of-articles mode-edition">

      <div class="col s12">

        <Card
          :mode="mode"
          title="post.title"
          :tags="['post', 'tags']"
        >

          <Terminal
            :mode="mode"
            shebang="sh"
            :lines="['']"
          />

        </Card>

      </div>
    </div>
  </main>

</template>

<style lang="scss">
.editable {
  height: 90vh !important;

  & .card-preview {
    height: 62.5vh !important; //67px
  }
}
</style>