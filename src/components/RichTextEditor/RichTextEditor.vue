<template>
  <quill-editor
    class="rich-text-editor"
    :disabled="disabled"
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @ready="onEditorReady($event)"
    @change="onEditorChange"
  >
  </quill-editor>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { ImageDrop } from "./quill-image-drop-module";

Quill.register("modules/imageDrop", ImageDrop);

export default {
  components: {
    quillEditor,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      content: "",
      editorOption: {
        // some quill options
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"],
        ],

        modules: {
          imageDrop: true,
        },
      },
    };
  },

  methods: {
    onEditorReady(quill) {},
    onEditorChange({ quill, html, text }) {
      console.log("quill", quill);
      this.content = html;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  },
};
</script>

<style lang="less" scoped>
.rich-text-editor {
  height: 300px;
}
</style>
