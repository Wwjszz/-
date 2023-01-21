<template>
  <a-layout class="info-content-container background">
    <a-layout>
      <a-layout-sider class="layout-sider">
        <div class="layout-sider-title px-16x"> <h2>推荐主题</h2></div>
        <div class="layout-sider-content">
          <div class="image"></div>
        </div>
      </a-layout-sider>
      <a-layout-content class="layout-content"> </a-layout-content>
      <a-layout-sider class="layout-sider-right"> </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .background {
    background-color: #f9f0ff;
  }

  .layout-sider,
  .layout-sider-right {
    padding-bottom: 24px;
    padding-top: 24px;
  }

  .layout-sider {
    position: fixed;
    z-index: 90;
    height: 100%;
    width: 230px !important;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    background-color: #f9f0ff;
    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }
    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .layout-sider-right {
    z-index: 90;
    height: 100%;
    width: 230px !important;
    background-color: #f9f0ff;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    &::after {
      position: absolute;
      top: 0;
      left: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }
    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .layout-content {
    display: flex;
    min-height: 100vh;
    overflow-y: hidden;
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    padding-left: 230px;
  }

  .layout-sider-content {
  }

  .layout-sider-title {
    flex-shrink: 0;
    width: 100%;
  }

  .image {
  }
</style>
