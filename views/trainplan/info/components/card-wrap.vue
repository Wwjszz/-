<template>
  <div class="card-wrap">
    <a-card v-if="loading" :bordered="false" hoverable>
      <slot name="skeleton"></slot>
    </a-card>
    <a-card v-else :bordered="false" hoverable>
      <a-space align="start">
        <a-card-meta>
          <template #title>
            <a-typography-text style="margin-right: 10px">
              {{ trainPlan.name }}
            </a-typography-text>
            <a-tag
              size="small"
              :color="trainPlan.deadLine >= curTimeString ? 'green' : 'red'"
            >
              <template #icon>
                <icon-check-circle-fill />
              </template>
              <span>{{
                $t(
                  trainPlan.deadLine >= curTimeString
                    ? 'menu.trainplan.open'
                    : 'menu.trainplan.close'
                )
              }}</span>
            </a-tag>
          </template>
          <template #description>
            {{ user.companyName }}
            <a-descriptions
              style="margin-top: 16px"
              :data="[
                { label: '发布时间', value: trainPlan.releaseTime },
                { label: '截止时间', value: trainPlan.deadLine },
                { label: '发布人', value: trainPlan.publisherName },
                { label: '审核人', value: trainPlan.reviewerName },
              ]"
              layout="inline-horizontal"
              :column="2"
            />
          </template>
        </a-card-meta>
      </a-space>
      <template #actions>
        <div>
          <a-space>
            <a-button type="primary"> 进入课程 </a-button>
          </a-space>
        </div>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { TrainPlanRecord } from '@/api/trainplan';
  import { useUserStore } from '@/store';
  import { getTimeString } from '@/utils/curTime';

  const user = useUserStore();

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    trainPlan: {
      type: Object as PropType<TrainPlanRecord>,
      default() {
        return {};
      },
    },
  });

  const curTimeString = getTimeString();
</script>

<style scoped lang="less">
  .card-wrap {
    height: 100%;
    transition: all 0.3s;
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    &:hover {
      transform: translateY(-4px);
      // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }
    :deep(.arco-card) {
      height: 100%;
      border-radius: 4px;
      .arco-card-body {
        height: 100%;
        .arco-space {
          width: 100%;
          height: 100%;
          .arco-space-item {
            height: 100%;
            &:last-child {
              flex: 1;
            }
            .arco-card-meta {
              height: 100%;
              display: flex;
              flex-flow: column;
              .arco-card-meta-content {
                flex: 1;
                .arco-card-meta-description {
                  margin-top: 8px;
                  color: rgb(var(--gray-6));
                  line-height: 20px;
                  font-size: 12px;
                }
              }
              .arco-card-meta-footer {
                margin-top: 0;
              }
            }
          }
        }
      }
    }
    :deep(.arco-card-meta-title) {
      display: flex;
      align-items: center;

      // To prevent the shaking
      line-height: 28px;
    }
    :deep(.arco-skeleton-line) {
      &:last-child {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }
</style>
