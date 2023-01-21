<template>
  <div>
    <a-layout class="layout">
      <a-layout style="display: flex">
        <a-layout-sider class="layout-sider">
          <div class="sider-title">
            <span>内容</span>
            <iconButton
              :style="button.click ? 'background-color:#c3e7fe' : ''"
              @click="click"
            >
              <api-app
                theme="outline"
                size="16"
                fill="#4a90e2"
                stroke-linecap="square"
              />
            </iconButton>
          </div>
          <div class="sider-content">
            <add-button
              :style="'background-color:#FFE8FB'"
              @click="router.push({ path: 'Cover' })"
            >
              <new-picture
                theme="multi-color"
                size="31"
                :fill="['#9013fe', '#9013fe', '#FFF', '#ffffff']"
              />
              <span>封面</span>
            </add-button>
            <add-button
              v-for="(item, index) in chapters"
              :key="index"
              :style="'background-color:#89E9E0'"
              @click="router.push({ path: 'Chapter' })"
            >
              <read-book theme="outline" size="31" fill="#14C9C9" />
              <span>{{
                `${index + 1}. ${item.name ? item.name : `专题${index + 1}`}`
              }}</span>
            </add-button>
            <add-button
              v-for="(item, index) in exams"
              :key="index"
              :style="'background-color:#ffa39e'"
              @click="router.push({ path: 'Exam' })"
            >
              <poker theme="outline" size="31" fill="#ff4d4f" />
              <span>考试</span>
            </add-button>
            <add-button
              v-for="(item, index) in resource"
              :key="index"
              :style="'background-color:#b7eb8f'"
            >
              <document-folder theme="outline" size="31" fill="#52c41a" />
              <span>资料</span>
            </add-button>
          </div>
        </a-layout-sider>
        <a-layout-content class="layout-content">
          <div class="info-container">
            <div
              class="popup"
              :class="popupClass"
              :style="popupDisplay ? '' : 'display:none'"
              @animationend="handleAnimationEnd"
            >
              <div :size="20" class="popup-content">
                <span>基础</span>
                <div class="popup-content-bottons">
                  <add-button
                    :style="'background-color:#89E9E0'"
                    @click="chapters.push(defaultChapter(chapters.length))"
                  >
                    <read-book theme="outline" size="18" fill="#14C9C9" />
                    <span>专题</span>
                  </add-button>
                  <add-button
                    :style="'background-color:#ffa39e'"
                    @click="exams.push(defaultExam(exams.length))"
                  >
                    <poker theme="outline" size="18" fill="#ff4d4f" />
                    <span>考试</span>
                  </add-button>
                  <add-button
                    :style="'background-color:#b7eb8f'"
                    @click="resource.push(defaultResource(resource.length))"
                  >
                    <document-folder theme="outline" size="18" fill="#52c41a" />
                    <span>资料</span>
                  </add-button>
                </div>
              </div>
            </div>
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { ref, Ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    ApiApp,
    ReadBook,
    Poker,
    DocumentFolder,
    NewPicture,
  } from '@icon-park/vue-next';
  import { Chapter, Exam, Resource } from '@/api/trainplan';
  import {
    ChapterList,
    defaultChapter,
    ExamList,
    defaultExam,
    defaultResource,
    ResourceList,
  } from '../../mock';
  import iconButton from './iconButton.vue';
  import addButton from './addButton.vue';
  import { ButtonStyle } from '../../button';

  const router = useRouter();

  const popupClass = ref('');
  const popupDisplay = ref(false);
  const chapters: Ref<Chapter[]> = ref([]);
  const exams: Ref<Exam[]> = ref([]);
  const resource: Ref<Resource[]> = ref([]);

  chapters.value = ChapterList;
  exams.value = ExamList;
  resource.value = ResourceList;

  const button: Ref<ButtonStyle> = ref({
    color: '#4a4a4a',
    click: false,
  });

  const click = () => {
    button.value.click = !button.value.click;
    if (!button.value.click) {
      popupClass.value = 'zoom-big-leave-active zoom-big-leave-to';
    } else {
      popupDisplay.value = true;
      popupClass.value = 'zoom-big-enter-active zoom-big-enter-to';
    }
  };

  const handleAnimationEnd = function (event: any) {
    const ea = event.animationName;

    if (ea.match('zoomBigIn') || ea.match('zoomBigOut')) {
      if (button.value.click) {
        popupClass.value = '';
      } else if (!button.value.click) {
        popupClass.value = '';
        popupDisplay.value = false;
      }
    }
  };
</script>

<script lang="ts"></script>

<style lang="less" scoped>
  .sider-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 16px;
    height: 50px;
    box-shadow: inset 0px -1px 0px var(--divider-color);
  }

  .sider-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 110px);
    overflow-y: scroll;
    > * {
      justify-content: flex-start;
      margin: 16px 16px 0px 16px;
      padding: 0px 16px 0px 16px;
      width: 189px !important;
      height: 72px !important;
      :nth-child(2) {
        margin-left: 8px;
      }
    }
  }

  .sider-content::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 10px;
    background-color: #fff;
  }

  .sider-content::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
    background: transparent;
    opacity: 0;
  }

  .sider-content::-webkit-scrollbar-thumb {
    border: 1px solid #fff;
    box-sizing: content-box;
    min-height: 20px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-transition: background-color 0.4s ease-in-out 0s;
    transition: background-color 0.4s ease-in-out 0s;
  }

  .sider-content::-webkit-scrollbar-thumb:active,
  .sider-content::-webkit-scrollbar-thumb:hover {
    background-color: rgba(100, 106, 115, 0.8);
  }

  .sider-content::-webkit-scrollbar-button {
    display: none;
  }

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-content-sider,
  .layout-sider {
    position: fixed;
    z-index: 99;
    height: 100%;
    width: 230px !important;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    padding-bottom: 24px;
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

  .layout-content-sider {
    background-color: #d9d9d9;
  }

  .layout-content {
    display: flex;
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    padding-left: 230px;
  }

  .info-container {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .popup {
    flex-shrink: 0;
    position: absolute;
    left: 6px;
    display: flex;
    height: 20%;
    width: 230px;
    z-index: 199;
    background-clip: content-box;
    background-color: var(--color-bg-1);
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
    margin-top: 8px;
    margin-bottom: 8px;
    transform-origin: 0 0;
    max-height: 100%;
  }

  .popup-content {
    overflow: hidden;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 8px;
    grid-template-rows: 20px auto;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    padding-top: 24px;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 14px;
  }

  .popup-content-title {
    flex-shrink: 0;
    width: 100%;
  }

  .popup-content-bottons {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 8px;
    grid-template-rows: 36px;
    padding-top: 8px;
    > * {
      padding: 0 8px 0 8px;
      > :nth-child(1) {
        margin-right: 8px;
      }
      > :nth-child(2) {
        font-size: 12px;
      }
    }
  }
</style>

<style scoped>
  .zoom-big-enter-active {
    transform: scale(0);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-play-state: paused;
  }

  .zoom-big-enter-active,
  .zoom-big-enter-to {
    animation-name: zoomBigIn;
    animation-play-state: running;
  }

  .zoom-big-enter-to {
    transform: scale(1);
    opacity: 1;
  }

  @keyframes zoomBigIn {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .zoom-big-leave-active {
    animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-play-state: paused;
  }

  .zoom-big-leave-active,
  .zoom-big-leave-to {
    animation-name: zoomBigOut;
    animation-play-state: running;
    pointer-events: none;
  }

  @keyframes zoomBigOut {
    0% {
      transform: scale(1);
    }
    to {
      transform: scale(0.8);
      opacity: 0;
      display: none;
    }
  }

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }
    14% {
      transform: scale(1.5);
    }
    28% {
      transform: scale(1);
    }
    42% {
      transform: scale(1.5);
    }
    70% {
      transform: scale(1);
    }
  }
  .heartBeat {
    animation-name: heartBeat;
    animation-duration: 1.3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  [click-animating='true'] {
    position: relative;
  }
  html {
    --ant-primary-color: #1055ff;
    --antd-wave-shadow-color: var(--ant-primary-color);
    --scroll-bar: 0;
  }

  [click-animating='true']:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    border-radius: inherit;
    box-shadow: 0 0 0 0 var(--ant-primary-color);
    box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);
    opacity: 0.2;
    animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1),
      waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
    animation-fill-mode: forwards;
    content: '';
    pointer-events: none;
  }

  @keyframes waveEffect {
    to {
      box-shadow: 0 0 0 var(--ant-primary-color);
      box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
    }
  }
  @keyframes fadeEffect {
    to {
      opacity: 0;
    }
  }
</style>
