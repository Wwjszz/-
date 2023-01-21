import { App } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components';
import Chart from './chart/index.vue';
import Breadcrumb from './breadcrumb/index.vue';
import trainplanCard from './trainplanCard/index.vue';
import QuestionLink from './link/question-link/index.vue';
import DocLink from './link/document-link/index.vue';
import UserLink from './link/user-link/index.vue';
// Manually introduce ECharts modules to reduce packing size

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
]);

export default {
  install(Vue: App) {
    Vue.component('Chart', Chart);
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.component('trainplanCard', trainplanCard);
    Vue.component('QuestionLink', QuestionLink);
    Vue.component('DocLink', DocLink);
    Vue.component('UserLink', UserLink);
  },
};
