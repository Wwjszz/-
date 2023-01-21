import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LEARNSTATUS: AppRouteRecordRaw = {
  path: '/learn-status',
  name: 'learn-status',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.learnStatus',
    requiresAuth: true,
    icon: 'icon-book',
    order: 0,
  },
  children: [
    {
      path: 'note',
      name: 'note',
      component: () => import('@/views/learn-status/note/index.vue'),
      meta: {
        locale: 'menu.learnStatus.note',
        requiresAuth: true,
        roles: ['*'],
        icon: 'icon-pen-fill',
      },
    },

    {
      path: 'rating',
      name: 'rating',
      component: () => import('@/views/learn-status/rating/index.vue'),
      meta: {
        locale: 'menu.learnStatus.rating',
        requiresAuth: true,
        roles: ['admin'],
        icon: 'icon-bar-chart',
      },
    },
  ],
};

export default LEARNSTATUS;
