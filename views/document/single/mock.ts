import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
import { DocumentDetailRecord, SingleDocumentParams } from '@/api/document';
import qs from 'query-string';

const documentList: DocumentDetailRecord[] = [
  {
    id: 1,
    title: '关于如何学习初等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    releaseTime: '2022-11-20 10:10:10',
    readers: 56,
    likes: 30,
    major: '初等数学',
    examine: 1,
    content:
      '文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷、文章不写一字空”“积句而成章，积章而成篇”“言出为论，下笔成章”等，都是现在所说的文章的意思。更广义的文章，也包含“学问”“奥秘”等意思，如“洞明世事皆学问，人情练达即文章”就是。',
    video: ['https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4'],
    companyId: 1,
    authorId: 1,
  },
  {
    id: 2,
    title: '关于如何学习中等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '张三',
    releaseTime: '2022-11-22 18:44:11',
    readers: 26,
    likes: 30,
    major: '中等数学',
    examine: 1,
    content:
      '<h1 align="center">Markdown Editor built on Vue</h1>\n\n<p align="center">\n <a href="https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true"><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>\n <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/v/@kangc/v-md-editor.svg?sanitize=true" alt="Version"></a>\n <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>\n</p>\n\n## Links\n\n- [Demo](https://code-farmer-i.github.io/vue-markdown-editor/examples/base-editor.html)\n- [Documentation](https://code-farmer-i.github.io/vue-markdown-editor/)\n- [Changelog](https://code-farmer-i.github.io/vue-markdown-editor/changelog.html)\n\n## Install\n\n```bash\n# use npm\nnpm i @kangc/v-md-editor -S\n\n# use yarn\nyarn add @kangc/v-md-editor\n```\n\n## Quick Start\n\n```js\nimport Vue from \'vue\';\nimport VueMarkdownEditor from \'@kangc/v-md-editor\';\nimport \'@kangc/v-md-editor/lib/style/base-editor.css\';\nimport vuepressTheme from \'@kangc/v-md-editor/lib/theme/vuepress.js\';\n\nVueMarkdownEditor.use(vuepressTheme);\n\nVue.use(VueMarkdownEditor);\n```\n\n## Usage\n\n```html\n<template>\n <v-md-editor v-model="text" height="400px"></v-md-editor>\n</template>\n\n<script>\n export default {\n data() {\n return {\n text: \'\',\n };\n },\n };\n</script>\n```\n\n## Refrence\n\n- [ElementUi Scrollbar Component](https://github.com/ElemeFE/element/tree/dev/packages/scrollbar)\n- [vuepress-plugin-container](https://vuepress.github.io/zh/plugins/container/)\n',
    video: ['https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4'],
    companyId: 1,
    authorId: 1,
  },
  {
    id: 3,
    title: '关于如何学习初等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '李四',
    releaseTime: '2021-11-22 16:17:11',
    readers: 56,
    likes: 30,
    major: '初等数学',
    examine: 1,
    content: '问问七二九七闻鸡起舞金额哦i曲解为契机',
    video: [],
    companyId: 1,
    authorId: 1,
  },
  {
    id: 4,
    title: '关于如何学习高等数学',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王佳伟',
    releaseTime: '2022-11-22 14:17:41',
    readers: 56,
    likes: 30,
    major: '初等数学',
    examine: 1,
    content:
      '<h1 align="center">Markdown Editor built on Vue</h1><p align="center">',
    video: [],
    companyId: 1,
    authorId: 1,
  },
  {
    id: 5,
    title: '关于如何学习小学语文',
    imageUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671690736&t=49d1af98c6d5688efde1dc5cb55e7968',
    author: '王五五',
    releaseTime: '2022-10-22 14:17:41',
    readers: 56,
    likes: 30,
    major: '小学语文',
    examine: 1,
    content: '问问七二九七闻鸡起舞金额哦i曲解为契机',
    video: [],
    companyId: 1,
    authorId: 1,
  },
];

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/document/single'), (params: GetParams) => {
      const { id } = qs.parseUrl(params.url).query;

      const tmp = documentList.find((item) => {
        return item.id === +(id as string);
      });

      return successResponseWrap(tmp);
    });
  },
});
