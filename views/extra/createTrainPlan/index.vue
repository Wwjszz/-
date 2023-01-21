<template>
  <a-layout class="layout">
    <div class="layout-navbar"> <NavBar /> </div>
    <a-layout>
      <a-layout-sider class="layout-sider" :width="56">
        <a-space direction="vertical" class="sider-space" :size="32">
          <div class="space-item">
            <icon-button
              :style="getClick(0) ? 'background-color:#c3e7fe' : ''"
              @mouseenter="changeColor(0, true)"
              @mouseleave="changeColor(0, false)"
              @click="click(0)"
              ><application-one
                theme="outline"
                size="24"
                :fill="buttons[0].color"
                stroke-linecap="square"
              />
            </icon-button>
            <span>信息</span>
          </div>
          <div class="space-item">
            <icon-button
              :style="getClick(1) ? 'background-color:#c3e7fe' : ''"
              @mouseenter="changeColor(1, true)"
              @mouseleave="changeColor(1, false)"
              @click="click(1)"
              ><equalizer
                theme="outline"
                size="24"
                :fill="buttons[1].color"
                stroke-linecap="square"
              />
            </icon-button>
            <span>参数</span>
          </div>
        </a-space>
      </a-layout-sider>

      <a-layout-content class="layout-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ApplicationOne, Equalizer } from '@icon-park/vue-next';
  import NavBar from './components/navbar.vue';
  import iconButton from './components/components/iconButton.vue';
  import { ButtonStyle } from './button';

  const router = useRouter();

  const buttons = ref(
    new Array(4).fill(0).map((item, index) => {
      if (!index) {
        return { color: '#4a90e2', click: true };
      }
      return { color: '#4a4a4a', click: false };
    })
  );

  const changeColor = (id: number, type: boolean) => {
    if (buttons.value[id].click !== true) {
      buttons.value[id].color = type ? '#4a90e2' : '#4a4a4a';
    }
  };

  const click = (id: number) => {
    const clickedButton: ButtonStyle = buttons.value.find(
      (button: ButtonStyle) => button.click === true
    );
    if (clickedButton) {
      clickedButton.click = false;
      clickedButton.color = '#4a4a4a';
    }
    buttons.value[id].click = true;

    switch (id) {
      case 0:
        router.push({ name: 'creatTrainPlanInfo' });
        break;
      case 1:
        router.push({ name: 'creatTrainPlanParam' });
        break;
      default:
        break;
    }
  };

  const getClick = (id: number) => {
    return buttons.value[id].click;
  };
</script>

<style scoped lang="less">
  @nav-size-height: 60px;
  @layout-max-width: 1100px;

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    width: 56px;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    padding-top: 60px;
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

  .layout-content {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    padding-left: 56px;
    padding-top: 60px;
  }

  .sider-space {
    display: flex;
    align-items: center;
    padding-top: 24px;
    font-size: 12px;
  }

  .space-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    > :nth-child(2) {
      margin-top: 7px;
    }
  }
</style>
