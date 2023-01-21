<template>
  <a-link @click="toSingle()">
    <slot> undefined link</slot>
  </a-link>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const props = defineProps({
    questionId: {
      type: Number,
      default: 0,
    },
  });

  const toSingle = () => {
    router.push({ path: `/question/${props.questionId}` });
  };
</script>

<style lang="less"></style>
