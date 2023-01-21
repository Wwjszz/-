<template>
  <div class="container">
    <Breadcrumb :items="['menu.trainplan', 'menu.trainplan.info']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="$t('planlist.title')">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded" :animation="true">
                <a-tab-pane
                  v-for="(item, index) in renderData"
                  :key="index"
                  :title="$t(item)"
                >
                  <template v-if="index === 0">
                    <card-list
                      v-for="(stuff, num) in renderData.filter((type) => {
                        return type !== '全部';
                      })"
                      :key="num"
                      :type="stuff"
                    />
                  </template>
                  <card-list v-else :type="item" />
                </a-tab-pane>
              </a-tabs>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import {
    TypeListParams,
    queryTypeList,
    queryTrainPlanList,
  } from '@/api/trainplan';
  import CardList from './components/card-list.vue';

  const renderData = ref<string[]>(['全部']);

  const fetchData = async (params: TypeListParams = { companyId: 1 }) => {
    try {
      const { data } = await queryTypeList(params);
      renderData.value = [...renderData.value, ...(data.typeList as string[])];
    } catch (err) {
      // 123
    } finally {
      // 123
    }
  };

  fetchData();
</script>

<style scoped lang="less">
  .container {
    background-color: #f8f8f8 !important;
    padding: 0 20px 20px 20px;
    :deep(.arco-list-content) {
      overflow-x: hidden;
    }

    :deep(.arco-card-meta-title) {
      font-size: 14px;
    }
  }
  :deep(.arco-list-col) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  :deep(.arco-list-item) {
    width: 33%;
  }

  :deep(.block-title) {
    margin: 0 0 12px 0;
    font-size: 14px;
  }
  :deep(.list-wrap) {
    // min-height: 140px;
    .list-row {
      align-items: stretch;
      .list-col {
        margin-bottom: 16px;
      }
    }
    :deep(.arco-space) {
      width: 100%;
      .arco-space-item {
        &:last-child {
          flex: 1;
        }
      }
    }
  }
</style>
