<h1>Welcome to Tauri + Vue</h1>

<div class="row">
  <a
    href="https://vitejs.dev"
    target="_blank"
  >
    <img
      src="/vite.svg"
      class="logo vite"
      alt="Vite logo"
    />
  </a>
  <a
    href="https://tauri.app"
    target="_blank"
  >
    <img
      src="/tauri.svg"
      class="logo tauri"
      alt="Tauri logo"
    />
  </a>
  <a
    href="https://vuejs.org/"
    target="_blank"
  >
    <img
      src="./assets/vue.svg"
      class="logo vue"
      alt="Vue logo"
    />
  </a>
</div>
<p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

<form
  class="row"
  @submit.prevent="greet"
>
  <input
    id="greet-input"
    v-model="name"
    placeholder="Enter a name..."
  />
  <button type="submit">Greet</button>
</form>
<p>{{ greetMsg }}</p>