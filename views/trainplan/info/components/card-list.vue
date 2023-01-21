<template>
  <div class="list-wrap">
    <a-divider orientation="left">
      {{ prop.type }}
    </a-divider>
    <a-row class="list-row" :gutter="24">
      <a-col
        v-for="item in renderData"
        :key="item.id"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        class="list-col"
      >
        <CardWrapNew :loading="loading" :train-plan="item">
          <template #skeleton>
            <a-skeleton :animation="true">
              <a-skeleton-line :widths="['100%', '40%']" :rows="2" />
              <a-skeleton-line :widths="['40%']" :rows="1" />
            </a-skeleton>
          </template>
        </CardWrapNew>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { queryTrainPlanList, TrainPlanRecord } from '@/api/trainplan';
  import useRequest from '@/hooks/request';
  import CardWrap from './card-wrap.vue';
  import CardWrapNew from './card-wrap-new.vue';

  const prop = defineProps({
    type: {
      type: String,
      default: '',
    },
  });

  const defaultValue: TrainPlanRecord[] = new Array(3).fill({});
  const { loading, response: renderData } = useRequest<TrainPlanRecord[]>(
    queryTrainPlanList.bind(null, { companyId: 1, type: prop.type }) as any,
    defaultValue
  );
</script>

<style scoped lang="less">
  * {
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background-color: #f7f8fc;
    font-family: 'Roboto', sans-serif;
    color: #10182f;
  }
</style>
