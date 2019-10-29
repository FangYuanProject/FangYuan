<template>
  <div class="tinymce">
    <Editor id="tinymce" v-model="tinymceHtml" :init="init" />
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 插件引入
import 'tinymce/plugins/image'// 插入上传图片插件

import 'tinymce/plugins/media'// 插入视频插件

import 'tinymce/plugins/table'// 插入表格插件

import 'tinymce/plugins/link' // 超链接插件

import 'tinymce/plugins/code' // 代码块插件

import 'tinymce/plugins/lists'// 列表插件

import 'tinymce/plugins/contextmenu' // 右键菜单插件

import 'tinymce/plugins/wordcount' // 字数统计插件

import 'tinymce/plugins/colorpicker' // 选择颜色插件

import 'tinymce/plugins/textcolor' // 文本颜色插件

import 'tinymce/plugins/fullscreen' // 全屏

import 'tinymce/plugins/help'

import 'tinymce/plugins/charmap'

import 'tinymce/plugins/paste'

import 'tinymce/plugins/print'

import 'tinymce/plugins/preview'

import 'tinymce/plugins/hr'

import 'tinymce/plugins/anchor'

import 'tinymce/plugins/pagebreak'

import 'tinymce/plugins/spellchecker'

import 'tinymce/plugins/searchreplace'

import 'tinymce/plugins/visualblocks'

import 'tinymce/plugins/visualchars'

import 'tinymce/plugins/insertdatetime'

import 'tinymce/plugins/nonbreaking'

import 'tinymce/plugins/autosave'

import 'tinymce/plugins/fullpage'

import 'tinymce/plugins/toc'
export default {
  components: {
    Editor
  },

  data() {
    return {
      init: {
        selector: '#tinymce', // 选择HTML元素

        language_url: '/tinymce/zh_CN.js', // public目录下
        language: 'zh_CN',

        skin_url: '/tinymce/skins/ui/oxide', // 主题样式

        height: 500, // 高度

        menubar: true, // 隐藏最上方menu菜单

        // toolbar: true, // false禁用工具栏（隐藏工具栏）

        browser_spellcheck: true, // 拼写检查

        branding: false, // 去水印

        statusbar: false, // 隐藏编辑器底部的状态栏

        elementpath: false, // 禁用下角的当前标签路径

        paste_data_images: true, // 允许粘贴图像

        plugins:
          'lists image media table wordcount code fullscreen help  toc fullpage autosave nonbreaking insertdatetime visualchars visualblocks searchreplace spellchecker pagebreak link charmap paste print preview hr anchor',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat'

      },

      tinymceHtml: ''
    }
  },

  mounted() {
    tinymce.init({})
  }
}
</script>

<style>
.tox-tinymce {
  width: 95%;
}
</style>
