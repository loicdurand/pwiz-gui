/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'editorjs-parser' {
  const Parser: any;
  export default Parser;
}

declare module '@editorjs/simple-image' {
  const SimpleImage: any;
  export default SimpleImage;
}

declare module '@editorjs/checklist' {
  const Checklist: any;
  export default Checklist;
}

declare module '@editorjs/list' {
  const EditorjsList: any;
  export default EditorjsList;
}

declare module '@editorjs/embed' {
  const Embed: any;
  export default Embed;
}

declare module '@editorjs/marker' {
  const Marker: any;
  export default Marker;
}

declare module 'showdown' {
  const showdown: any;
  export default showdown;
}