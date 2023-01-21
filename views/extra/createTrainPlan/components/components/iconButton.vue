<template>
  <button ref="button" class="button" :style="{ width: width, height: height }">
    <slot
  /></button>
</template>

<script lang="ts">
  export default {
    props: {
      width: {
        type: String,
        default: '32px',
      },
      height: {
        type: String,
        default: '32px',
      },
    },
    data() {
      return {
        isClick: false,
      };
    },

    mounted() {
      const e = this.$refs.button;

      function createRipple(event: any) {
        const ripple = document.createElement('span');

        ripple.classList.add('ripple');

        const max = Math.max(this.offsetWidth, this.offsetHeight);

        ripple.style.height = `${max * 2}px`;
        ripple.style.width = ripple.style.height;

        const rect = this.getBoundingClientRect();

        ripple.style.left = `${event.clientX - rect.left - max}px`;
        ripple.style.top = `${event.clientY - rect.top - max}px`;

        ripple.addEventListener('animationend', () => {
          this.removeChild(ripple);
        });

        this.appendChild(ripple);
      }

      e.addEventListener('click', createRipple);
    },
  };
</script>

<style lang="less" scoped>
  .button {
    position: relative;
    overflow: hidden;
    border: none;
    outline: none;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px !important;
    background-color: transparent;
    transition: 0.3s;
    cursor: pointer;
  }

  .button:hover {
    background-color: #c3e7fe;
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
