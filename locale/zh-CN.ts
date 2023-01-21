import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localTrainPlanCreate from '@/views/trainplan/create/locale/zh-CN';
import localTrainPlanInfo from '@/views/trainplan/info/locale/zh-CN';
import localTrainPlanManage from '@/views/trainplan/manage/locale/zh-CN';

import localLearnStatusNote from '@/views/learn-status/note/locale/zh-CN';
import localLearnStatusRating from '@/views/learn-status/rating/locale/zh-CN';

import localInteractionChat from '@/views/interaction/chat/locale/zh-CN';
import localInteractionProposal from '@/views/interaction/proposal/locale/zh-CN';

import localDocumentView from '@/views/document/view/locale/zh-CN';
import localDocumentUpload from '@/views/document/upload/locale/zh-CN';
import localDocumentProcess from '@/views/document/process/locale/zh-CN';
import localDocumentSingle from '@/views/document/single/locale/zh-CN';

import localQuestionView from '@/views/question/view/locale/zh-CN';
import localQuestionUpload from '@/views/question/upload/locale/zh-CN';
import localQuestionProcess from '@/views/question/process/locale/zh-CN';
import localQuestionSingle from '@/views/question/single/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.trainplan': '培训计划',
  'menu.learnStatus': '学习情况',
  'menu.interaction': '公共区',
  'menu.document': '视频文档',
  'menu.question': '文档试题',
  'menu.dashboard': '仪表盘',
  'menu.trainplan.create.page': '创建培训计划',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,

  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
  ...localTrainPlanCreate,
  ...localTrainPlanInfo,
  ...localTrainPlanManage,
  ...localLearnStatusNote,
  ...localLearnStatusRating,
  ...localInteractionChat,
  ...localInteractionProposal,
  ...localDocumentView,
  ...localDocumentUpload,
  ...localDocumentProcess,
  ...localDocumentSingle,
  ...localQuestionView,
  ...localQuestionUpload,
  ...localQuestionProcess,
  ...localQuestionSingle,
};
