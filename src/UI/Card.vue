<script lang="ts">

import Tag from './Tag.vue';

function fadeOut(target: HTMLElement) {
  const fadeTarget = target.querySelector('.copied') as HTMLElement | null;
  if (!fadeTarget)
    return;

  fadeTarget.style.display = "inline";
  const fadeEffect = setInterval(function () {
    if (fadeTarget && !fadeTarget.style.opacity) {
      fadeTarget.style.opacity = '1';
    }
    if (fadeTarget && parseFloat(fadeTarget.style.opacity) > 0) {
      fadeTarget.style.opacity = (parseFloat(fadeTarget.style.opacity) - 0.1).toString();
    } else if (fadeTarget) {
      clearInterval(fadeEffect);
      fadeTarget.style.display = "none";
      fadeTarget.style.opacity = '1';
    }
  }, 100);
}

export default {
  name: 'Card',
  components: {
    Tag
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: Array<String>,
      required: true
    }
  },
  methods: {
    copy_to_clipboard(e: Event): void {
      const target = e.currentTarget as HTMLElement;
      const content = target?.dataset.content || '';
      navigator.clipboard.writeText(content);
      fadeOut(target);
    },
    toggle_menu(e: Event): void {
      const target = e.target as HTMLElement;
      const menu_id = target?.dataset.id;
      const menu = document.getElementById(`nav-${menu_id}`);
      const others = document.querySelectorAll(`.card-menu:not(#nav-${menu_id})`);

      console.log(menu_id);
      [...others].forEach(elt => {
        elt.classList.remove("active");
      });
      if (menu) {
        menu.classList.toggle('active');
      }
    }
  }
}
</script>

<template>
  <article class="app-card" :data-tags="tags.join(' ')">
    <div class="card-preview">
      <span
        role="button"
        tabindex="0"
        class="icon-button copy-button pointer"
        :data-content="content"
        @click="copy_to_clipboard"
      >

        <span class="copied">Copié!</span>

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

      <ul
        v-if="tags?.length"
        class="card-tags"
      >
        <ul class="card-tags-list">

          <li
            v-for="tag in tags"
            class="tag"
          >

            <Tag v-if="tag">{{ tag }}</Tag>

          </li>

        </ul>
      </ul>

    </div>
    <footer class="card-footer">
      <span
        role="button"
        tabindex="0"
        class="icon-button more-button pointer"
      >
        <i
          class="material-icons"
          title="Afficher le menu"
          :data-id="id"
          @click="toggle_menu"
        >more_horiz</i>
      </span>

      <nav
        :id="'nav-' + id"
        class="card-menu"
      >
        <ul>
          <li>
            <input
              type="radio"
              :id="'details-option-' + id"
              name="selector"
            >
            <label :for="'details-option-' + id">Détails</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
          <li>
            <input
              type="radio"
              :id="'dl-option-' + id"
              name="selector"
            >
            <label :for="'dl-option-' + id">Télécharger</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
          <li>
            <input
              type="radio"
              :id="'share-option-' + id"
              name="selector"
            >
            <label :for="'share-option-' + id">Partager</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
          <li>
            <input
              type="radio"
              :id="'mod-option-' + id"
              name="selector"
            >
            <label :for="'mod-option-' + id">Modifier</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
          <li>
            <input
              type="radio"
              :id="'suppr-option-' + id"
              name="selector"
            >
            <label :for="'suppr-option-' + id">Supprimer</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
        </ul>

      </nav>

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

      & .copied {
        display: none;
        position: absolute;
        right: 30px;
        top: -3px;
      }
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
      font-size: 1.1rem;
    }

    & .card-tags {
      height: 10.8vh;
      padding: 0;
      overflow-x: scroll;

      & .card-tags-list {
        margin-left: 0;
        padding-left: 0;

        li.tag {
          display: inline-block;
          height: 25px;
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

    // menu
    & .card-menu {
      width: 100%;
      max-height: 0;
      background-color: var(--grey-0);
      position: absolute;
      bottom: 0;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      overflow-y: scroll;
      transition: max-height .25s ease;
      -webkit-transition: max-height .25s ease;

      &.active {
        height: 46vh;
        max-height: 46vh;
      }

      & ul {
        list-style: none;
        margin: 60px 0 0 0;
        padding: 0;
        overflow: auto;
        border-top: 1px solid var(--grey-3);
      }

      & ul li {
        color: #AAAAAA;
        display: block;
        position: relative;
        float: left;
        width: 100%;
        height: 60px;
        border-bottom: 1px solid var(--grey-3);
      }

      & ul li input[type=radio] {
        position: absolute;
        visibility: hidden;
      }

      & ul li label {
        display: block;
        position: relative;
        font-weight: 300;
        font-size: 18px;
        padding: 7px;
        margin: 10px auto;
        height: 30px;
        z-index: 9;
        cursor: pointer;
        -webkit-transition: all 0.25s linear;
      }

      & ul li:hover label {
        color: var(--grey-7);
      }

      & ul li .check {
        display: block;
        position: absolute;
        border: 4px solid #AAAAAA;
        border-radius: 100%;
        height: 25px;
        width: 25px;
        top: 18px;
        left: 20px;
        z-index: 5;
        transition: border .25s linear;
        -webkit-transition: border .25s linear;
      }

      & ul li:hover .check {
        border: 4px solid var(--grey-7);
      }

      & ul li .check::before {
        display: block;
        position: absolute;
        content: "";
        border-radius: 100%;
        height: 7px;
        width: 7px;
        top: 5px;
        left: 5px;
        margin: auto;
        transition: background 0.25s linear;
        -webkit-transition: background 0.25s linear;
      }

      & input[type=radio]:checked~.check {
        border: 4px solid var(--theme-color);
      }

      & input[type=radio]:checked~.check::before {
        background: var(--theme-color);
      }

      & input[type=radio]:checked~label {
        color: var(--theme-color);
      }
    }

    // fin menu
  }

  /* fin footer */

}
</style>