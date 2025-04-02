<script lang="ts">
// Adaptation de l'emple donné par Timothy Long:
// "Basic CSS-Only Modal"
// https://codepen.io/timothylong/pen/AJxrPR
export default {
  name: "Modal",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    const modal = document.getElementById(this.id);
    const close_buttons = document.querySelectorAll('.modal-close,.abort');
    close_buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        modal?.classList.remove('visible');
      });
    });
  }
}
</script>
<template>
  <div
    :id="id"
    class="modal-window"
  >
    <div>
      <a
        href="#"
        title="Close"
        class="modal-close"
      >×</a>

      <slot name="header">
        <h1>
          Confirmation
        </h1>
      </slot>

      <slot></slot>

      <footer class="modal-footer">
        <slot name="footer">
          <a
            role="button"
            tabindex="0"
            class="icon-button copy-button pointer"
            href="#"
          >
            Fermer
          </a>
        </slot>
      </footer>

    </div>
  </div>
</template>
<style scoped lang="scss">
.modal-window {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;

  &:target,
  &.visible {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }

  & div:not(:last-of-type) {
    margin-bottom: 15px;
  }

  &>div {
    width: 60%;
    position: absolute;
    border-radius: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: white;
    box-shadow: -1px 15px 30px -12px black;

  }

}

header {
  font-weight: bold;
}

h1 {
  font-size: 150%;
  margin: 0 0 15px;
}

footer button,
footer [role="button"] {
  background: transparent;
  border: 1px solid var(--grey-5);
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin: 1rem 10px 0 0;
  transition: background 0.3s;
  float: left;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.175);
  }
}

.modal-close {
  color: #aaa;
  line-height: 50px;
  font-size: 2rem;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;

  &:hover {
    color: black;
  }
}

a {
  color: inherit;
  text-decoration: none;
}
</style>