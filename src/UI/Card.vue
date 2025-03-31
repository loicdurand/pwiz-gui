<script lang="ts">

export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: false
    },
    tags: {
      type: Array<String>,
      required: false
    }
  }
}
</script>

<template>
  <article class="app-card">
    <div class="card-preview">
      <span
        role="button"
        tabindex="0"
        class="icon-button copy-button"
      >
        <i
          class="material-icons"
          title="Copier"
        >content_copy</i>

      </span>
      <div class="card-window">

        <slot></slot>

      </div>
    </div>
    <div class="card-content">
      <h2 class="card-title">{{ title }}</h2>

      <ul class="card-tags">
        <ul class="card-tags-list">

          <li
            v-for="tag in tags"
            class="tag"
          >
            {{ tag }}
          </li>

        </ul>
      </ul>

    </div>
    <footer class="card-footer">
      <span
        role="button"
        tabindex="0"
        class="icon-button more-button"
      >
        <i
          class="material-icons"
          title="Afficher le menu"
        >more_horiz</i>
      </span>

    </footer>
  </article>

</template>

<style lang="scss">
.app-card {
  height: 50vh;
  min-width: 100%;
  background: white;
  display: inline-block;
  margin: auto auto 1rem auto;
  border-radius: 19px;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 9999;

  /* preview */
  & .card-preview {
    position: relative;
    height: 27vh;
    margin-bottom: 0;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;

    & .copy-button {
      position: absolute;
      top: .5rem;
      right: .5rem;
      color: var(--grey-4);
    }

    & .card-window {
      height: 100%;
      align-items: center;
    }
  }

  /* fin preview */

  /* content */
  & .card-content {
    position: relative;
    height: 19vh;
    margin-top: 0;
    border-bottom: 1px solid var(--grey-3);

    & .card-title {
      font-weight: 700;
      padding: 6px 0 0 0;
      margin: 0;
      line-height: 2.2vh;
    }

    & .card-tags {
      height: 10.8vh;
      padding: 0;

      & .card-tags-list {
        margin-left: 0;
        padding-left: 0;

        li.tag {
          display: inline-block;
          padding: 0 5px;
          margin: 0 5px;
          background: var(--theme-color);
          color: white;
          border-radius: 5px;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }

  /* fin content */

  /* footer */
  & .card-footer {
    position: relative;

    & .more-button {
      position: absolute;
      vertical-align: middle;
      height: 4vh;
      width: 4vh;
      right: 1rem;
    }
  }

  /* fin footer */

}
</style>