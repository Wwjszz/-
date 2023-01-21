<template>
  <a-link icon @click="toSingle()">
    <slot> undefined link </slot>
  </a-link>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const props = defineProps({
    docId: {
      type: Number,
      default: 0,
    },
  });

  const toSingle = () => {
    router.push({ path: `/document/${props.docId}` });
  };
</script>

<style lang="less"></style>
