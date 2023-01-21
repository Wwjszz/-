<template>
  <button
    class="button"
    :style="{ width: width, height: height }"
    :click-animating="animation"
    @click="animation = true"
    @animationend="animation = false"
  >
    <slot
  /></button>
</template>

<script lang="ts">
  export default {
    props: {
      width: {
        type: String,
        default: '92px',
      },
      height: {
        type: String,
        default: '36px',
      },
    },
    data() {
      return {
        isClick: false,
        animation: false,
      };
    },
  };
</script>

<style lang="less" scoped>
  .button {
    position: relative;
    border: none;
    outline: none;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    border-radius: 4px !important;
    background-color: rgba(0, 102, 255, 0.08);
    transition: background-color 0.2s ease;
    cursor: pointer;
  }

  .button:hover {
    background-color: #e5e6eb;
  }
</style>

<style>
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
