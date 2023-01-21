<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.question', 'question.list', route.params.id]"
    ></Breadcrumb>
    <a-card class="general-card">
      <template #title>
        <a-spin :loading="loading" dot>
          <a-typography-title
            :heading="3"
            style="margin-top: 10px; font-family: Arial, Helvetica, sans-serif"
          >
            {{
              curQuestion.id
                ? `${curQuestion.id}. ${curQuestion.title}`
                : '加载中'
            }}
          </a-typography-title></a-spin
        >
      </template>
      <a-tabs type="card" :animation="true">
        <a-tab-pane key="1">
          <template #title>
            <icon-common style="margin-right: 10px" />
            {{ $t('question.single.question') }}
          </template>
          <Question v-if="curQuestion.id" :id="curQuestion.id" />
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #title>
            <icon-bookmark style="margin-right: 10px" />{{
              $t('question.single.note')
            }}
          </template>
          <Note />
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #title>
            <icon-public style="margin-right: 10px" />
            {{ $t('question.single.discuss') }}
          </template>
          <Discuss />
        </a-tab-pane>
        <a-tab-pane key="4">
          <template #title>
            <icon-compass style="margin-right: 10px" />
            {{ $t('question.single.explanation') }}
          </template>
          <Explain />
        </a-tab-pane>
      </a-tabs>
      {{ curQuestion }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { useRoute, onBeforeRouteUpdate } from 'vue-router';
  import { querySingleQuestion, QuestionDetailRecord } from '@/api/question';
  import Question from './components/question.vue';
  import Note from './components/note.vue';
  import Discuss from './components/discuss.vue';
  import Explain from './components/explain.vue';

  const route = useRoute();

  const { loading, setLoading } = useLoading(true);

  const curQuestion = ref<QuestionDetailRecord>({} as QuestionDetailRecord);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await querySingleQuestion({
        id: +route.params.id,
        companyId: 1,
      });
      curQuestion.value = data;
    } catch (err) {
      // error
    } finally {
      setLoading(false);
    }
  };

  fetchData();
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-tabs-nav-type-card .arco-tabs-tab-active) {
    margin-right: 2px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 20px;
    background-color: rgb(255, 255, 255);
    border-bottom-color: rgba(0, 0, 0, 0);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgb(221, 221, 221);
    border-left-style: solid;
    border-left-width: 1px;
    border-right-color: rgb(221, 221, 221);
    border-right-style: solid;
    border-right-width: 1px;
    border-top-color: rgb(221, 221, 221);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-top-style: solid;
    border-top-width: 1px;
    box-sizing: border-box;
    color: rgb(85, 85, 85);
    cursor: default;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    text-align: left;
    text-decoration-color: rgb(85, 85, 85);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-size-adjust: 100%;
  }

  :deep(.arco-tabs-tab) {
    background-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgba(0, 0, 0, 0);
    border-left-style: solid;
    border-left-width: 1px;
    border-right-color: rgba(0, 0, 0, 0);
    border-right-style: solid;
    border-right-width: 1px;
    border-top-color: rgba(0, 0, 0, 0);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-top-style: solid;
    border-top-width: 1px;
    box-sizing: border-box;
    color: rgb(128, 128, 128);
    cursor: pointer;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 20px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-right: 2px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    position: relative;
    text-align: left;
    text-decoration-color: rgb(128, 128, 128);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-size-adjust: 100%;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
