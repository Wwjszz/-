import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const INTERACTION: AppRouteRecordRaw = {
  path: '/interaction',
  name: 'interaction',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.interaction',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 0,
    roles: ['admin'],
  },
  children: [
    {
      path: 'chat',
      name: 'chat',
      component: () => import('@/views/interaction/chat/index.vue'),
      meta: {
        locale: 'menu.interaction.chat',
        requiresAuth: true,
        icon: 'icon-fire',
        roles: ['*'],
      },
    },
    {
      path: 'proposal',
      name: 'proposal',
      component: () => import('@/views/interaction/proposal/index.vue'),
      meta: {
        locale: 'menu.interaction.proposal',
        requiresAuth: true,
        icon: 'icon-robot',
        roles: ['*'],
      },
    },
  ],
};

export default INTERACTION;
