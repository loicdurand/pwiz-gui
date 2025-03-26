<script lang="ts">

export default {
  name: 'Card',
  props: {
    mode: Object,
    id: {
      type: Number,
      required: false
    },
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
  <article
    class="app-card"
    :class="{ editable: mode.edition }"
  >
    <div class="card-preview">
      <button
        class="icon-button copy-button"
        type="button"
      >
        <i
          v-if="!mode.edition"
          class="material-icons"
          title="Copier"
        >content_copy</i>

        <i
          v-else
          class="material-icons"
          title="Fermer"
          @click="mode.edition = false"
        >close</i>

      </button>
      <div class="card-window">

        <slot></slot>

      </div>
    </div>
    <div class="card-content">
      <h2
        v-if="!mode.edition"
        class="card-title"
      >{{ title }}</h2>
      <div
        v-else
        class="card-title"
      >
        <div class="omrs-input-group">
          <label class="omrs-input-underlined">
            <input
              type="text"
              name="title"
              required
            >
            <span
              class="omrs-input-label"
              for="title"
            >Titre de la fiche</span>

          </label>
        </div>
      </div>
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
      <button
        class="icon-button more-button"
        type="button"
      >
        <i
          class="material-icons"
          title="Afficher le menu"
        >more_horiz</i>
      </button>
    </footer>
  </article>

</template>

<style lang="scss" scoped>
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

  /* mode edition */
  &.editable {
    height: calc(100vh - 2rem) !important;

    & .card-preview {
      height: 62.5vh !important; //67px
    }

    & .card-title {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      line-height: 0 !important;
      margin-top: 2rem;

      :root {
        --omrs-color-ink-low-contrast: rgba(60, 60, 67, 0.3);
        --omrs-color-ink-medium-contrast: rgba(19, 19, 21, 0.6);
        --omrs-color-interaction: #1e4bd1;
        --omrs-color-interaction-minus-two: rgba(73, 133, 224, 0.12);
        --omrs-color-ink-high-contrast: #121212;
      }

      & div.omrs-input-group {
        margin-bottom: 5px;
        position: relative;
        width: 20.4375rem;

        /* Input*/
        & .omrs-input-underlined>input:empty {
          border: none;
          border-bottom: 0.125rem solid var(--theme-color);
          width: 100%;
          height: 2rem;
          font-size: 24px;
          padding-left: 0.875rem;
          line-height: 147.6%;
          padding-top: 0.825rem;
          padding-bottom: 0.5rem;
        }

        & .omrs-input-underlined>input:focus {
          outline: none;
          font-size: 24px;
          height: 3rem;
          font-weight: 700;
        }

        & .omrs-input-underlined>.omrs-input-label {
          position: absolute;
          top: 0.9375rem;
          left: 0.875rem;
          color: var(--omrs-color-ink-medium-contrast);
          transition: top .2s;
        }

        & .omrs-input-underlined>input:hover {
          background: var(--omrs-color-interaction-minus-two);
          border-color: var(--omrs-color-ink-high-contrast);
        }

        & .omrs-input-underlined>input:focus+.omrs-input-label {
          top: 0;
          font-size: 0.9375rem;
          margin-bottom: 32px;
        }

        & .omrs-input-underlined>input:valid+.omrs-input-label {
          display: none;
        }

        & .omrs-input-underlined:not(.omrs-input-danger)>input:focus+.omrs-input-label {
          color: var(--omrs-color-interaction);
        }

        & .omrs-input-underlined:not(.omrs-input-danger)>input:focus {
          border-color: var(--theme-color);
        }

      }
    }
  }

  /* fin mode edition */
}
</style>