<script lang="ts">
export default {
  name: "Tag",
  props: {
    closable: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<template>
  <div class="chips">
    <div class="chip">
      <span class="chip--text">

        <slot></slot>

      </span>

      <span
        v-if="closable"
        class="chip--button"
      >×</span>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.chips .chip {
  width: auto;
  overflow: hidden;
  float: left;
  background: var(--tag-color);
  border-radius: 3px 0 0 3px;
  color: #fff;
  height: 20px;
  line-height: 3px;
  padding: 0 6px 0 12px;
  position: relative;
  margin: 0 7px 0px 0px;
  text-decoration: none;
  -webkit-transition: color 0.2s;
  font-size: 13px;

  &::before {
    background: #fff;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: "";
    height: 6px;
    left: 8px;
    position: absolute;
    width: 6px;
    top: 7px;
  }

  &::after {
    background: #fff;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    border-left: 12px solid var(--tag-color);
  }

  & .chip--button {
    padding: 0 8px 0 0;
    cursor: pointer;
    display: inline-block;
  }

  & .chip--text {
    padding: 8px 6px;
    cursor: none;
    display: inline-block;
    pointer-events: none;
    min-width: 3rem;
  }
}
</style>