import { createApp } from 'vue';

import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import hljs from 'highlight.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import vue3videoPlay from 'vue3-video-play';
import 'vue3-video-play/dist/style.css';

import UndrawUi from 'undraw-ui';
import 'undraw-ui/dist/style.css';

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
import '@/api/interceptor';

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);
app.use(VueMarkdownEditor);
app.use(VMdPreview);
app.use(vue3videoPlay);
app.use(UndrawUi);

app.mount('#app');
