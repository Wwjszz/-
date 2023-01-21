<template>
  <div class="container">
    <a-tabs :animation="true" size="large">
      <a-tab-pane key="1">
        <template #title>
          <icon-filter /> {{ $t('menu.question.process') }}</template
        >
        <Breadcrumb :items="['menu.question', 'menu.question.process']" />
        <ExamineQuestion />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>
          <icon-history /> {{ $t('question.examine.unpass.title') }}
        </template>
        <Breadcrumb
          :items="['menu.question', 'question.examine.unpass.title']"
        />
        <WithdrawQuestiuon />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import ExamineQuestion from './components/examine-question.vue';
  import WithdrawQuestiuon from './components/withdraw-questiuon.vue';
</script>

<script lang="ts"></script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0px;
  }
</style>
