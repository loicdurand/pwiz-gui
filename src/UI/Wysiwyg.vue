<script lang="ts">
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import CodeTool from '@editorjs/code';
// import LinkTool from '@editorjs/link';

import SimpleImage from "@editorjs/simple-image";
import Checklist from '@editorjs/checklist';
import EditorjsList from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';

export default {
  name: "Wysiwyg",
  props: {
    mode: {
      type: Object,
      required: true
    },
    editor: {
      type: Object,
      required: true
    }
  }, mounted() {
    const editor = new EditorJS({
      tools: {
        header: Header,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        list: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        image: SimpleImage,
        underline: Underline,
        code: CodeTool,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
              github: true
            }
          }
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Contenu de la citation',
            captionPlaceholder: 'Auteur de la citation',
          },
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        }
        // linkTool: {
        //   class: LinkTool,
        //   config: {
        //     endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
        //   }
        // }
      },
    });
  }
}
</script>

<template>
  <main id="editorjs">

  </main>
</template>

<style scoped lang="scss"></style>