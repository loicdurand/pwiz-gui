<script lang="ts">
import showdown from 'showdown';
import Parser from 'editorjs-parser';
const edjsParser = new Parser();
const converter = new showdown.Converter();

export default {
  name: 'MiniView',
  props: {
    shebang: {
      type: String,
      required: true
    },
    content: {
      type: Array<string>,
      required: true
    }
  },
  data() {
    if (this.shebang === '<!-- markdown -->') {
      return {
        html: converter.makeHtml(this.content.join("\n"))
      };
    }
    const content = this.content[0];
    const outputData = JSON.parse(content);
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