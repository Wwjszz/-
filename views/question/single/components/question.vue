<template>
  <a-card class="s-card">
    <template #title>
      <a-spin :loading="loading">
        <a-typography-text style="font-size: 17px; padding-left: 16px">
          {{ curQuestion.description }}
        </a-typography-text>
      </a-spin>
    </template>

    <a-spin :loading="loading">
      <a-row>
        <a-space direction="vertical" :size="20">
          <a-row style="display: flex">
            <div style="flex: 1; width: 950px">
              <div v-if="curQuestion.type == '选择题'">
                <a-row>
                  <a-typography-paragraph class="intro-font"
                    >选项</a-typography-paragraph
                  >
                </a-row>
                <a-checkbox-group v-model="myAnswer">
                  <a-col :span="18">
                    <a-checkbox
                      v-for="(item, index) in curQuestion.extra"
                      :key="index"
                      :value="index"
                      style="margin-bottom: 10px"
                    >
                      <div :style="{ width: '320px', height: '22px' }">
                        {{
                          `${String.fromCharCode(
                            index + 'A'.charCodeAt(0)
                          )}. ${item}`
                        }}
                      </div>
                    </a-checkbox>
                  </a-col>
                </a-checkbox-group></div
              >
              <div v-else-if="curQuestion.type == '判断题'">
                <a-typography-paragraph class="intro-font"
                  >判断</a-typography-paragraph
                >
                <a-radio-group v-model="myAnswer">
                  <a-radio value="A"><icon-check /></a-radio>
                  <a-radio value="B"><icon-close /></a-radio>
                </a-radio-group>
              </div>
              <div v-else-if="curQuestion.type == '简答题'">
                <a-typography-paragraph class="intro-font"
                  >简答</a-typography-paragraph
                >
                <a-textarea
                  v-model="myAnswer"
                  style="width: 500px; height: 130px"
                  placeholder="请输入答案"
                  allow-clear
                />
              </div>
            </div>
            <a-descriptions
              :data="extraTable"
              size="large"
              :column="1"
              bordered
            >
            </a-descriptions>
          </a-row>
          <a-button
            type="primary"
            status="success"
            shape="round"
            style="font-size: 17px"
          >
            <template #icon>
              <icon-branch />
            </template>
            提交
          </a-button>
        </a-space>
      </a-row>
    </a-spin>
  </a-card>

  {{ myAnswer }}
</template>

<script lang="ts" setup>
  import { compile, h, reactive, ref, Ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { querySingleQuestion, QuestionDetailRecord } from '@/api/question';

  const { t } = useI18n();

  const props = defineProps({
    id: {
      type: Number,
      default: 0,
    },
  });

  const { loading, setLoading } = useLoading(true);

  const curQuestion = ref<QuestionDetailRecord>({} as QuestionDetailRecord);
  const myAnswer: Ref<number[] | string | undefined> = ref<number[] | string>();

  const extraTable = reactive([
    {
      label: () => t('question.columns.difficulty'),
      value: () => {},
    },
    {
      label: () => t('question.pass'),
      value: 0,
    },
    {
      label: () => t('question.attempt'),
      value: 0,
    },
    {
      label: () => t('question.tags'),
      value: () => {},
    },
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await querySingleQuestion({ id: props.id });
      curQuestion.value = data;
    } catch (err) {
      // error
    } finally {
      if (curQuestion.value.type === '选择题') {
        myAnswer.value = [];
      } else {
        myAnswer.value = '';
      }

      switch (curQuestion.value.difficulty) {
        case 0:
          extraTable[0].value = () => {
            const tmp = `<a-tag color="#00b42a">${t(
              'question.difficulty.easy'
            )}</a-tag>`;
            return h(compile(tmp));
          };
          break;
        case 1:
          extraTable[0].value = () => {
            const tmp = `<a-tag color="#ff7d00">${t(
              'question.difficulty.medium'
            )}</a-tag>`;
            return h(compile(tmp));
          };
          break;
        case 2:
          extraTable[0].value = () => {
            const tmp = `<a-tag color="#f53f3f">${t(
              'question.difficulty.hard'
            )}</a-tag>`;
            return h(compile(tmp));
          };
          break;

        default:
          extraTable[0].value = () => {
            const tmp = `<a-tag color="#0fc6c2
  ">${t('question.difficulty.none')}</a-tag>`;
            return h(compile(tmp));
          };
      }

      extraTable[1].value = curQuestion.value.pass;
      extraTable[2].value = curQuestion.value.attempt;

      extraTable[3].value = () => {
        const tmp = ` <a-space><a-tag v-for='${`(item,index) in ${JSON.stringify(
          curQuestion.value.label
        )}`}'
         style="{width:'320px'}" color="#86909c">{{item}}</a-tag></a-space>`;

        return h(compile(tmp));
      };

      setLoading(false);
    }
  };

  fetchData();
</script>

<style scoped lang="less">
  :deep(.arco-card-header) {
    padding: 0px;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0px;
  }

  .intro-font {
    font-weight: bold;
  }
</style>
