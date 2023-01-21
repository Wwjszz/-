<template>
  <a-space size="mini">
    <a-avatar :size="30">
      <img alt="avatar" :src="props.userImageUrl" />
    </a-avatar>
    <a-link status="success" @click="toSingle()">
      <slot> undefined link </slot>
    </a-link>
  </a-space>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const props = defineProps({
    userId: {
      type: Number,
      default: 0,
    },
    userImageUrl: {
      type: String,
      default: '',
    },
  });

  const toSingle = () => {
    // router.push ... ...
  };
</script>

<style lang="less"></style>
