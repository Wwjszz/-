import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DOCUMENT: AppRouteRecordRaw = {
  path: '/document',
  name: 'document',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.document',
    requiresAuth: true,
    icon: 'icon-tiktok-color',
    order: 0,
  },
  children: [
    {
      path: 'view',
      name: 'docView',
      component: () => import('@/views/document/view/index.vue'),
      meta: {
        locale: 'menu.document.view',
        requiresAuth: true,
        icon: 'icon-xigua-color',
        roles: ['*'],
      },
    },
    {
      path: 'upload',
      name: 'docUpload',
      component: () => import('@/views/document/upload/index.vue'),
      meta: {
        locale: 'menu.document.upload',
        requiresAuth: true,
        icon: 'icon-upload',
        roles: ['*'],
      },
    },
    {
      path: 'process',
      name: 'docProcess',
      component: () => import('@/views/document/process/index.vue'),
      meta: {
        locale: 'menu.document.process',
        requiresAuth: true,
        icon: 'icon-thunderbolt',
        roles: ['*'],
      },
    },
    {
      path: ':id(\\d+)',
      name: 'singleDocument',
      component: () => import('@/views/document/single/index.vue'),
      meta: {
        requiresAuth: false,
        hideInMenu: true,
      },
    },
  ],
};

export default DOCUMENT;
