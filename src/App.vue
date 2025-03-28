<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";
import Header from "./UI/Header.vue";
import Terminal from "./UI/Terminal.vue";
import Loader from "./UI/Loader.vue";

const mode = ref({ edition: false });
interface Post {
  id: number;
  title: string;
  tags: string[];
}

const posts = ref<Post[]>([]);
const loading = ref(true);

(async function get_posts() {
  loading.value = true;
  posts.value = await invoke('get_posts');
  loading.value = false;
})();

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
