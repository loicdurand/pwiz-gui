<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";
import Header from "./UI/Header.vue";
import Terminal from "./UI/Terminal.vue";
import Loader from "./UI/Loader.vue";

// const greetMsg = ref("");
// const name = ref("");
const mode = ref({ edition: false });
const posts = ref([]);
const loading = ref(true);

async function get_posts() {
  posts.value = await invoke('get_posts');
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

      <template v-if="loading">
        <Loader />
      </template>

      <template v-else>

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
              :lines="Array(10).fill('')"
            />

          </Card>

        </div>

      </template>

    </div>

  </main>

  <main
    v-else
    class="container"
  >
    <div class="row app-list-of-articles mode-edition">

      <div class="col s12">

        <Card :mode="mode">

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