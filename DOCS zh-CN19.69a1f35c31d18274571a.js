(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[50],{

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm-browser.js
var vue_esm_browser = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/dist/templateLoader.js??ref--6!./node_modules/vue-loader/dist??ref--2-0!./website/md-loader!./website/docs/zh-CN/i18n.md?vue&type=template&id=7866ee3f

var _hoisted_1 = {
  class: "content element-doc"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_esm_browser["l" /* createStaticVNode */])("<h2 id=\"guo-ji-hua\"><a class=\"header-anchor\" href=\"#guo-ji-hua\">¶</a> 国际化</h2><p>VueCesium 组件内部默认使用中文，若希望使用其他语言，则需要进行多语言设置。以中文为例，在 main.js 中，如果是完整引入 VueCesium：</p><pre><code class=\"hljs language-javascript\"><span class=\"hljs-keyword\">import</span> { createApp } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue&#39;</span>\n<span class=\"hljs-keyword\">import</span> VueCesium <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium&#39;</span>\n<span class=\"hljs-keyword\">import</span> locale <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/lib/locale/lang/en-us&#39;</span>\n\ncreateApp(App).use(VueCesium, { locale })\n</code></pre><p>如果是通过 <strong>es modules</strong> 按需引入 VueCesium:</p><pre><code class=\"hljs language-typescript\"><span class=\"hljs-keyword\">import</span> { createApp } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue&#39;</span>\n<span class=\"hljs-keyword\">import</span> { Viewer, locale } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium&#39;</span>\n<span class=\"hljs-keyword\">import</span> lang <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/locale/lang/en-us&#39;</span>\n\nlocale(lang)\ncreateApp(App).component(Viewer.name, Viewer)\n</code></pre><p>如果是通过 <a href=\"#/zh-CN/component/quickstart#an-xu-yin-ru\">babel-plugin-component</a> 插件按需引入 VueCesium:</p><pre><code class=\"hljs language-typescript\"><span class=\"hljs-keyword\">import</span> { createApp } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue&#39;</span>\n<span class=\"hljs-keyword\">import</span> { Viewer } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium&#39;</span>\n<span class=\"hljs-keyword\">import</span> lang <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/lib/locale/lang/zh-Hans&#39;</span>\n<span class=\"hljs-keyword\">import</span> locale <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/lib/locale&#39;</span>\n\n<span class=\"hljs-comment\">// 设置语言</span>\nlocale.use(lang)\n\n<span class=\"hljs-comment\">// 引入组件</span>\ncreateApp(App).component(Viewer.name, Viewer)\n</code></pre><p>如果使用其它语言，默认情况下英文语言包依旧是被引入的，可以使用 webpack 的 NormalModuleReplacementPlugin 替换默认语言包。</p><p><strong>webpack.config.js</strong></p><pre><code class=\"hljs language-typescript\">{\n  <span class=\"hljs-attr\">plugins</span>: [\n    <span class=\"hljs-keyword\">new</span> webpack.NormalModuleReplacementPlugin(\n      <span class=\"hljs-regexp\">/vue-cesium[\\/\\\\]lib[\\/\\\\]locale[\\/\\\\]lang[\\/\\\\]zh-Hans/</span>,\n      <span class=\"hljs-string\">&#39;vue-cesium/lib/locale/lang/en-us&#39;</span>,\n    ),\n  ]\n}\n</code></pre><h3 id=\"jian-rong-vue-i18n-9.x\"><a class=\"header-anchor\" href=\"#jian-rong-vue-i18n-9.x\">¶</a> 兼容 <code>vue-i18n@9.x</code></h3><p>如果需要查看 <a href=\"https://vue-i18n-next.intlify.dev/guide/#html\">VueI18n的文档</a>, 请点击这个链接去查看</p><pre><code class=\"hljs language-typescript\"><span class=\"hljs-keyword\">import</span> { createApp } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue&#39;</span>\n<span class=\"hljs-keyword\">import</span> { createI18n } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-i18n&#39;</span>\n<span class=\"hljs-keyword\">import</span> VueCesium <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium&#39;</span>\n<span class=\"hljs-keyword\">import</span> enLocale <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/lib/locale/lang/en-us&#39;</span>\n<span class=\"hljs-keyword\">import</span> zhLocale <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/lib/locale/lang/zh-Hans&#39;</span>\n<span class=\"hljs-keyword\">import</span> App <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;./App.vue&#39;</span>\n\n<span class=\"hljs-keyword\">const</span> messages = {\n  [enLocale.name]: {\n    <span class=\"hljs-comment\">// vc 这个属性很关键，一定要保证有这个属性，</span>\n    <span class=\"hljs-attr\">vc</span>: enLocale.vc,\n    <span class=\"hljs-comment\">// 定义您自己的字典，但是请不要和 `vc` 重复，这样会导致 VueCesium 内部组件的翻译失效.</span>\n    <span class=\"hljs-attr\">message</span>: {\n      <span class=\"hljs-attr\">hello</span>: <span class=\"hljs-string\">&#39;hello world&#39;</span>,\n    },\n  },\n  [zhLocale.name]: {\n    <span class=\"hljs-attr\">vc</span>: zhLocale.vc,\n    <span class=\"hljs-comment\">// 定义您自己的字典，但是请不要和 `vc` 重复，这样会导致 VueCesium 内部组件的翻译失效.</span>\n    <span class=\"hljs-attr\">message</span>: {\n      <span class=\"hljs-attr\">hello</span>: <span class=\"hljs-string\">&#39;你好，世界&#39;</span>,\n    },\n  },\n  <span class=\"hljs-attr\">testLocale</span>: {\n    <span class=\"hljs-attr\">vc</span>: {},\n    <span class=\"hljs-comment\">// 没有定义 message 字段，会 fallback 回到 en 去, fallbackLocale 的定义在下方 👇</span>\n  },\n}\n\n<span class=\"hljs-keyword\">const</span> i18n = createI18n({\n  <span class=\"hljs-attr\">locale</span>: zhLocale.name,\n  <span class=\"hljs-attr\">fallbackLocale</span>: enLocale.name,\n  messages,\n})\n\n<span class=\"hljs-keyword\">const</span> app = createApp(App)\n\napp.use(VueCesium, {\n  <span class=\"hljs-attr\">i18n</span>: i18n.global.t,\n})\n\n<span class=\"hljs-comment\">// 要记得使用这个插件.</span>\napp.use(i18n)\n</code></pre><p>目前 VueCesium 内置了以下语言：</p><ul class=\"language-list\"><li>简体中文（zh-hans）</li><li>英文（en-us）</li></ul><p>如果你需要使用其他的语言，欢迎贡献 PR：只需在 <a href=\"https://github.com/zouyaoji/vue-cesium/tree/dev/packages/locale/lang\">这里</a> 添加一个语言配置文件即可。</p>", 16);

function render(_ctx, _cache) {
  var _component_right_nav = Object(vue_esm_browser["O" /* resolveComponent */])("right-nav");

  return Object(vue_esm_browser["F" /* openBlock */])(), Object(vue_esm_browser["i" /* createBlock */])("section", _hoisted_1, [_hoisted_2, Object(vue_esm_browser["n" /* createVNode */])(_component_right_nav)]);
}
// CONCATENATED MODULE: ./website/docs/zh-CN/i18n.md?vue&type=template&id=7866ee3f

// CONCATENATED MODULE: ./website/docs/zh-CN/i18n.md

const script = {}
script.render = render

/* harmony default export */ var i18n = __webpack_exports__["default"] = (script);

/***/ })

}]);