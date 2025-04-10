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
  autofocus: true,
  holder: 'editorjs',
  readOnly: false,
  /**
   * Tools list
   */
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: 'Votre titre ici...',
        defaultLevel: 2
      }
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
      config: {
        placeholder: 'Votre contenu ici...'
      }
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

  /**
   * Internationalzation config
   */
  i18n: {
    /**
     * @type {I18nDictionary}
     */
    messages: {
      /**
       * Other below: translation of different UI components of the editor.js core
       */
      ui: {
        "blockTunes": {
          "toggler": {
            "Click to tune": "Réglages",
            "or drag to move": "ou faites glisser pour déplacer",
            "Click to select": "Cliquez pour sélectionner",
          },
        },
        "inlineToolbar": {
          "converter": {
            "Convert to": "Convertir en"
          }
        },
        "toolbar": {
          "toolbox": {
            "Add": "Ajouter"
          }
        }
      },
      /**
       * Section for translation Tool Names: both block and inline tools
       */
      toolNames: {
        "Text": "Texte",
        "Heading": "Titre",
        "List": "Liste",
        "Ordered List": "Liste ordonnée",
        "Unordered List": "Liste non ordonnée",
        "Quote": "Citation",
        "Code": "Code",
        "Table": "Tableau",
        "Link": "Lien",
        "Marker": "Surligneur",
        "Bold": "Gras",
        "Italic": "Italique",
        "InlineCode": "Code en ligne",
        "Checklist": "Checklist",
        "Image": "Image",
        "Embed": "Contenu embarqué",
        "Warning": "Avertissement",
        "Delimiter": "Délimiteur",
        "Stub": "Stub",
        "Underlined": "Souligné",
      },

      /**
       * Section for passing translations to the external tools classes
       */
      tools: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
         * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
         */
        "warning": { // <-- 'Warning' tool will accept this dictionary section
          "Title": "Titre",
          "Message": "Message",
        },

        "List": {
          'Unordered': 'Non ordonnée',
          'Ordered': 'Ordonnée',
          'Checklist': 'Checklist',
        },

        /**
         * Link is the internal Inline Tool
         */
        "link": {
          "Add a link": "Ajouter un lien"
        },
        /**
         * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
         */
        "stub": {
          'The block can not be displayed correctly.': 'Le bloc ne peut être affiché correctement.'
        }
      },

      /**
       * Section allows to translate Block Tunes
       */
      blockTunes: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
         * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
         *
         * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
         */
        "delete": {
          "Delete": "Effacer"
        },
        "moveUp": {
          "Move up": "Déplacer vers le haut"
        },
        "moveDown": {
          "Move down": "Déplacer vers le bas"
        }
      },
    }
  },
};