import { AppRouteRecordRaw } from '../types';

const CreateTrainPlan: AppRouteRecordRaw = {
  path: '/createTrainPlan',
  name: 'createTrainPlan',
  redirect: '/createTrainPlan/Info',
  component: () => import('@/views/extra/createTrainPlan/index.vue'),
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: 'Info',
      name: 'creatTrainPlanInfo',
      redirect: '/createTrainPlan/Info/Cover',
      component: () =>
        import('@/views/extra/createTrainPlan/components/components/info.vue'),
      children: [
        {
          path: 'Cover',
          name: 'creatTrainPlanInfoCover',
          component: () =>
            import(
              '@/views/extra/createTrainPlan/components/components/components/coverLayout.vue'
            ),
          meta: {
            requiresAuth: true,
            hideInMenu: true,
          },
        },
        {
          path: 'Chapter',
          name: 'creatTrainPlanInfoChapter',
          component: () =>
            import(
              '@/views/extra/createTrainPlan/components/components/components/chapterLayout.vue'
            ),
          meta: {
            requiresAuth: true,
            hideInMenu: true,
          },
        },
        {
          path: 'Exam',
          name: 'creatTrainPlanInfoExam',
          component: () =>
            import(
              '@/views/extra/createTrainPlan/components/components/components/examLayout.vue'
            ),
          meta: {
            requiresAuth: true,
            hideInMenu: true,
          },
        },
      ],
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },

    {
      path: 'Param',
      name: 'creatTrainPlanParam',
      component: () =>
        import('@/views/extra/createTrainPlan/components/components/param.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
};

export default CreateTrainPlan;
