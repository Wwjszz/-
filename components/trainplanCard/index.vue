<template>
  <div class="card-wrap">
    <img
      src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp"
      class="card-wrap-img"
    />
  </div>
</template>

<script setup lang="ts"></script>

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
    &-img {
      display: block;
      max-width: 600px;
      margin: 0 auto;
      width: 100%;
    }
  }
</style>
