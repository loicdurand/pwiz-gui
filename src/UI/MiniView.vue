<script lang="ts">
import edjsHTML from 'editorjs-html';
const edjsParser = edjsHTML();

export default {
  name: 'MiniView',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data() {
    const outputData = JSON.parse(this.content);
    const html = edjsParser.parse(outputData);
    return { html };
  }
}
</script>

<template>

  <pre
    class="miniview"
    v-html="html"
  />

</template>

<style lang="scss" scoped>
.miniview {
  display: block;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  margin: 0;
  padding: 24px 10px;
  text-align: left;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  border-bottom: 1px solid var(--grey-5);
}
</style>