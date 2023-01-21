<template>
  <div class="navbar">
    <div class="left-side">
      <iconButton
        :style="getClick(0) ? 'background-color:#c3e7fe' : ''"
        @mouseenter="changeColor(0, true)"
        @mouseleave="changeColor(0, false)"
        @click="click(0)"
      >
        <arrow-left
          theme="outline"
          size="16"
          :fill="buttons[0].color"
          stroke-linecap="square"
        />
      </iconButton>

      <a-col style="margin-left: 10px">
        <a-input
          v-model="title"
          :style="{ '--inputWidth': inputWidth }"
          class="input-borderless"
          placeholder="请输入标题"
        />
        <br />
        <span class="edit-time"
          ><editor
            theme="multi-color"
            size="14"
            :fill="['#333', '#2F88FF', '#FFF', '#43CCF8']"
            style="margin-right: 5px"
          />
          最后编辑于&nbsp;2022-12-19 23:42
        </span>
      </a-col>
    </div>
    <div class="middle-side">
      <a-space>
        <a-trigger
          trigger="hover"
          position="bottom"
          :show-arrow="true"
          content-class="trigger-content"
          popup-class="trigger-popup"
          arrow-class="trigger-arrow"
          :popup-translate="[0, 8]"
        >
          <iconButton
            :style="getClick(1) ? 'background-color:#c3e7fe' : ''"
            @mouseenter="changeColor(1, true)"
            @mouseleave="changeColor(1, false)"
            @click="click(1)"
          >
            <view-grid-detail
              theme="outline"
              size="16"
              :fill="buttons[1].color"
              stroke-linecap="square"
            />
          </iconButton>
          <template #content>
            <span>编辑计划</span>
          </template>
        </a-trigger>
        <a-trigger
          trigger="hover"
          position="bottom"
          :show-arrow="true"
          content-class="trigger-content"
          popup-class="trigger-popup"
          arrow-class="trigger-arrow"
          :popup-translate="[0, 8]"
        >
          <iconButton
            :style="getClick(2) ? 'background-color:#c3e7fe' : ''"
            @mouseenter="changeColor(2, true)"
            @mouseleave="changeColor(2, false)"
            @click="click(2)"
          >
            <share-three
              theme="outline"
              size="16"
              :fill="buttons[2].color"
              stroke-linecap="square"
            />
          </iconButton>
          <template #content>
            <span>计划分享</span>
          </template>
        </a-trigger>
        <a-trigger
          trigger="hover"
          position="bottom"
          :show-arrow="true"
          content-class="trigger-content"
          popup-class="trigger-popup"
          arrow-class="trigger-arrow"
          :popup-translate="[0, 8]"
        >
          <iconButton
            :style="getClick(3) ? 'background-color:#c3e7fe' : ''"
            @mouseenter="changeColor(3, true)"
            @mouseleave="changeColor(3, false)"
            @click="click(3)"
          >
            <electrocardiogram
              theme="outline"
              size="16"
              :fill="buttons[3].color"
              stroke-linecap="square"
            />
          </iconButton>
          <template #content>
            <span>统计数据</span>
          </template>
        </a-trigger>
      </a-space>
    </div>
    <div class="right-side">
      <a-space :size="16">
        <a-button
          type="primary"
          class="primary-button"
          :status="buttonLoading ? 'success' : ''"
          :loading="buttonLoading"
          @click="handleButtonClick"
        >
          <template #icon>
            <icon-play-arrow />
          </template>
          <!-- Use the default slot to avoid extra spaces -->
          <template #default>
            <span v-if="buttonLoading"> 正在保存 </span>
            <span v-else> 完成 </span>
          </template>
        </a-button>
        <a-avatar :size="32">
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import {
    ArrowLeft,
    Editor,
    ViewGridDetail,
    ShareThree,
    Electrocardiogram,
  } from '@icon-park/vue-next';
  import { Message } from '@arco-design/web-vue';
  import iconButton from './components/iconButton.vue';
  import { ButtonStyle } from '../button';

  const title = ref('');

  const buttonLoading = ref(false);

  const handleButtonClick = () => {
    buttonLoading.value = true;
    setTimeout(() => {
      Message.success('保存成功!');
      buttonLoading.value = false;
    }, 1000);
  };

  const buttons = ref(
    new Array(4).fill(0).map(() => {
      return { color: '#4a4a4a', click: false };
    })
  );

  const inputWidth = computed(() => {
    return `${(
      (title.value === '' ? '请输入标题' : title.value).length * 14 +
      8
    ).toString()}px`;
  });

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
  };

  const getClick = (id: number) => {
    return buttons.value[id].click;
  };
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    box-shadow: 0 2px 4px rgb(49 70 102 / 10%);
  }

  .left-side {
    display: flex;
    align-items: center;

    padding-left: 20px;
    overflow: hidden;
  }

  .middle-side {
    display: flex;
    align-items: center;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    align-items: center;
    list-style: none;
    :deep(.locale-select) {
      border-radius: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }
    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }
    .trigger-btn {
      margin-left: 14px;
    }
  }
</style>

<style lang="less" scoped>
  :root {
    --primary-color: royalblue;
  }

  .input-borderless {
    padding: 0 0 0 0 !important;
    border: none;
    border-radius: 2px;
    background-color: var(--color-bg-1);
    margin-bottom: 4px;
    width: var(--inputWidth);
    :hover {
      background-color: #f2f3f5;
    }
    :focus {
      background-color: #f7f8fa;
    }
    > * {
      padding-left: 4px !important;
      padding-right: 4px !important;
      border-radius: 2px !important;
    }
  }

  .edit-time {
    --grey: #78808c;
    display: flex;
    align-items: center;
    margin-bottom: 0px;
    font-size: 12px;
    color: var(--grey);
  }

  .arrow {
    position: relative;
    overflow: hidden;
    border: none;
    outline: none;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px !important;
    background-color: transparent;
    transition: 0.3s;
    cursor: pointer;
  }

  .arrow:hover {
    background-color: #c3e7fe;
  }

  .primary-button {
    border-radius: 8px;
  }
</style>

<style>
  span.ripple {
    background-color: rgba(0, 190, 255, 0.7);
    border-radius: 50%;
    position: absolute;
    transform: scale(0);
    animation: ripple 0.5s linear forwards;
  }

  @keyframes ripple {
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
