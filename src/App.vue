<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";
import Header from "./UI/Header.vue";
import Terminal from "./UI/Terminal.vue";
import Loader from "./UI/Loader.vue";
import Menu from "./UI/Menu.vue";

interface Post {
  author: string,
  title: string,
  content: string[],
  content_type: string,
  tags: string[];
}

const mode = ref({ edition: false });
let posts = ref<Post[]>([]);
const loading = ref(true);

async function get_posts() {
  loading.value = true;
  let results: Post[] = await invoke('get_posts');
  for (let result of results)
    posts.value.push(result);
  loading.value = false;
};

get_posts();

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
            :title="post.title"
            :tags="post.tags"
          >

            <Terminal
              :shebang="post.content_type"
              :lines="post.content"
            />

          </Card>

        </div>

      </template>

    </div>

  </main>

  <main
    v-else
    class="container mode-edition"
  >

    <Menu :mode="mode" />

  </main>

</template>
