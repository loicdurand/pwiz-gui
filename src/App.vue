<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import Card from "./UI/Card.vue";
import Header from "./UI/Header.vue";
import Terminal from "./UI/Terminal.vue";

// const greetMsg = ref("");
// const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>

  <main class="container">

    <Header />

    <div class="row app-list-of-articles">

      <div class="col s6 m4 l3">

        <Card
          title="Titre de l'article"
          :tags="['tutoriel', 'rust', 'tauri', 'vue', 'ts', 'js', 'typescript', 'javascript']"
        >

          <Terminal shebang="sh" :lines="['echo Hello, World!']" />

        </Card>

      </div>

    </div>

  </main>
</template>