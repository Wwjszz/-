<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.trainplan', 'menu.trainplan.create']"
    ></Breadcrumb>
    <a-card class="general-card">
      <template #title>
        {{ $t('trainplan.create.form') }}
      </template>
      <div class="wrapper">
        <a-steps type="arrow" :current="current">
          <a-step description="This is a description">Succeeded</a-step>
          <a-step description="This is a description">Processing</a-step>
          <a-step description="This is a description">Pending</a-step>
        </a-steps>
      </div>
      <a-button :disabled="current === 1" @click="onPrev">
        <icon-left />
        Back
      </a-button>
      <a-button :disabled="current === 3" @click="onNext">
        Next
        <icon-right />
      </a-button>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const current = ref(1);

  const onPrev = () => {
    current.value = Math.max(1, current.value - 1);
  };

  const onNext = () => {
    current.value = Math.min(3, current.value + 1);
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px 20px;
  }

  .wrapper {
  }
</style>
