<template>
  <div class="container">
    <Breadcrumb :items="['menu.question', 'question.create']" />
    <a-form layout="vertical" :model="formData">
      <a-space direction="vertical" :size="16">
        <a-card class="general-card">
          <template #title>
            {{ $t('question.create.base') }}
          </template>
          <a-space direction="vertical">
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item field="type" :label="$t('question.create.type')">
                  <a-select
                    v-model="formData.type"
                    :options="['选择题', '判断题', '简答题']"
                    :style="{ width: '160px' }"
                    :placeholder="$t('question.create.type')"
                  /> </a-form-item
              ></a-col>
              <a-col :span="8">
                <a-form-item field="major" :label="$t('question.create.major')">
                  <a-input
                    v-model="formData.major"
                    :style="{ width: '160px' }"
                    :placeholder="$t('question.create.major')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="label" :label="$t('question.create.tag')">
                  <a-input-tag
                    v-model="formData.label"
                    :default-value="['test']"
                    :style="{ width: '400px' }"
                    :placeholder="$t('question.create.tag')"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="80" class="form-row">
              <a-col :span="15">
                <a-form-item field="title" :label="$t('question.create.title')">
                  <a-input
                    v-model="formData.title"
                    :style="{ width: '400px' }"
                    :placeholder="$t('question.create.title')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-space>
        </a-card>
        <a-card class="general-card">
          <template #title>
            {{ $t('question.create.info') }}
          </template>
          <a-row>
            <a-space class="description" direction="vertical" :size="0">
              <a-typography-title :heading="5" type="secondary">
                {{ $t('question.create.description') }}</a-typography-title
              >
              <a-form-item field="description" style="height: 20px">
                <a-typography-paragraph
                  v-model:editText="formData.description"
                  editable
                  :type="formData.description ? null : 'warning'"
                >
                  {{
                    formData.description
                      ? formData.description
                      : t('question.create.description.default')
                  }}
                </a-typography-paragraph>
              </a-form-item>
              <a-divider style="margin-top: 10px"></a-divider>
              <div v-if="formData.type == '选择题'">
                <a-row>
                  <a-typography-paragraph>选项</a-typography-paragraph>
                  <a-button
                    type="primary"
                    :style="{
                      marginLeft: '10px',
                      width: '10px',
                      height: '22px',
                    }"
                    @click="addExtra"
                    >+</a-button
                  >
                </a-row>

                <a-form-item field="answer">
                  <a-checkbox-group v-model="formData.answer">
                    <a-checkbox
                      v-for="(item, index) in formData.extra"
                      :key="index"
                      :value="index"
                      style="margin-bottom: 10px"
                    >
                      <a-input
                        v-model="(formData.extra as any)[index]"
                        :style="{ width: '320px', height: '22px' }"
                        :placeholder="
                          String.fromCharCode(index + 'A'.charCodeAt(0))
                        "
                        allow-clear
                      />
                      <a-button
                        type="dashed"
                        :style="{
                          marginLeft: '10px',
                          width: '10px',
                          height: '22px',
                        }"
                        @click="deleteExtra(index)"
                        >-</a-button
                      >
                    </a-checkbox>
                  </a-checkbox-group>
                </a-form-item></div
              >
              <div v-else-if="formData.type == '判断题'">
                <a-typography-paragraph>判断</a-typography-paragraph>
                <a-radio-group v-model="formData.answer">
                  <a-radio value="A"><icon-check /></a-radio>
                  <a-radio value="B"><icon-close /></a-radio>
                </a-radio-group>
              </div>
              <div v-else-if="formData.type == '简答题'">
                <a-textarea
                  v-model="formData.answer"
                  placeholder="请输入答案"
                  allow-clear
                />
              </div>
            </a-space>
            {{ formData }}
          </a-row>
          <a-row> </a-row>
        </a-card>
        <a-card class="general-card">
          <template #title>
            {{ $t('question.create.submit') }}
          </template>
          <a-row>
            <a-space class="description" direction="vertical">
              <a-typography-title :heading="5" type="secondary">
                {{ $t('question.create.difficulty') }}</a-typography-title
              >
              <a-radio-group>
                <a-radio value="A">
                  <a-tag color="green">
                    {{ t('question.difficulty.easy') }}</a-tag
                  >
                </a-radio>
                <a-radio value="B">
                  <a-tag color="orange">{{
                    t('question.difficulty.medium')
                  }}</a-tag>
                </a-radio>
                <a-radio value="C">
                  <a-tag color="red"
                    >{{ t('question.difficulty.hard') }}
                  </a-tag>
                </a-radio>
              </a-radio-group>
              <a-button
                type="primary"
                status="success"
                style="margin-top: 50px; width: 100px; height: 35px"
                >提交</a-button
              >
            </a-space>
          </a-row>
        </a-card>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { QuestionTest } from '@/api/question';

  const { t } = useI18n();
  const formData: QuestionTest = reactive({
    title: 'default',
    difficulty: 0,
    label: ['default'],
    type: '选择题',
    pass: 0,
    attempt: 0,
    description: '',
    extra: [],
    answer: [],
    major: 'default',
    publish_id: 1,
  });

  const str = ref('');

  const addExtra = () => {
    formData.extra?.push('');
  };

  const deleteExtra = (index: number) => {
    console.log(index);
    formData.extra?.splice(index, 1);
  };

  const reset = () => {
    if (formData.type === '判断题') {
      return;
    }

    formData.extra = [];
    formData.answer = [];

    if (formData.type === '简答题') {
      formData.answer = '';
    }
  };

  watch(
    () => formData.type,
    () => reset()
  );
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .input {
    width: 500px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .description {
    width: 900px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .form-row {
    width: 900px;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .title {
    font-size: 36px;
    text-align: center;
    margin: 0 auto;
    padding-top: 25px;
    padding-bottom: 25px;
  }

  :deep(.arco-table-th) {
    background-color: white;
    font-weight: bold;
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
