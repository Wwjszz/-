<template>
  <div class="container">
    <a-tabs :animation="true" size="large">
      <a-tab-pane key="1">
        <template #title>
          <icon-filter /> {{ $t('menu.document.examine') }}</template
        >
        <Breadcrumb :items="['menu.document', 'menu.document.examine']" />
        <ExamineDocument />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>
          <icon-history /> {{ $t('menu.document.withdraw') }}
        </template>
        <Breadcrumb :items="['menu.document', 'menu.document.withdraw']" />
        <WithDrawDocument />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import ExamineDocument from './components/examine-document.vue';
  import WithDrawDocument from './components/withdraw-document.vue';
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0px;
  }
</style>
