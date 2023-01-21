<template>
  <section class="cards">
    <article class="card card--1" @click="click">
      <div class="card__info-hover">
        <svg class="card__like" viewBox="0 0 24 24">
          <path
            fill="#000000"
            d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
          />
        </svg>
        <div class="card__clock-info">
          <svg
            v-if="trainPlan.interval !== '已过期'"
            class="card__clock"
            width="12"
            height="12"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.9998 44.3332C34.1251 44.3332 42.3332 36.1251 42.3332 25.9999C42.3332 15.8747 34.1251 7.66656 23.9998 7.66656C13.8746 7.66656 5.6665 15.8747 5.6665 25.9999C5.6665 36.1251 13.8746 44.3332 23.9998 44.3332Z"
              fill="#2F88FF"
              stroke="#333"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M23.7594 15.3536L23.7582 26.3624L31.5305 34.1347"
              stroke="#FFF"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 9.00001L11 4.00001"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M44 9.00001L37 4.00001"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else
            width="12"
            height="12"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 5V30.0036H42V5"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M30 37L24 43L18 37"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24 30V43"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.3442 20.6577L29.6579 9.34401"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M18.3438 9.34326L29.6575 20.657"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
          <span class="card__time">{{ trainPlan.interval }}</span>
        </div>
      </div>
      <div class="card__img"></div>
      <a href="#" class="card_link">
        <div class="card__img--hover"></div>
      </a>
      <div class="card__info">
        <span class="card__category"> {{ trainPlan.major }}</span>
        <h3 class="card__title">{{ trainPlan.name }}</h3>
        <div class="user">
          <img :src="trainPlan.authorImageUrl" alt="user" />
          <div class="user-info">
            <h5>{{ trainPlan.author }}</h5>
            <small>{{ trainPlan.releaseTime }}</small>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
  import { PropType, reactive, watch } from 'vue';
  import { TrainPlanRecord } from '@/api/trainplan';
  import { useUserStore } from '@/store';
  import {
    getTimeString,
    getDifferenceAfter,
    TimeInterval,
    parseTimeString,
  } from '@/utils/curTime';

  interface Record extends TimeInterval, TrainPlanRecord {}

  const user = useUserStore();

  const state = reactive({
    timer: null,
  });

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    trainPlan: {
      type: Object as PropType<Record>,
      default() {
        return {};
      },
    },
  });

  const curTimeString = getTimeString();

  const click = () => {
    console.log('click!');
  };

  const getInterval = () => {
    if (props.trainPlan !== ({} as Record)) {
      const interval = parseTimeString(props.trainPlan.deadLine);
      Object.keys(interval).forEach((key) => {
        (props.trainPlan as any)[key as keyof Record] =
          interval[key as keyof TimeInterval];
      });

      const date = new Date();
      getDifferenceAfter(props.trainPlan as TimeInterval, date);

      setInterval(() => {
        const curDate = new Date();
        getDifferenceAfter(props.trainPlan as TimeInterval, curDate);
      }, 60000);
    }
  };

  if (props.trainPlan.releaseTime) {
    getInterval();
  }

  watch(
    () => props.trainPlan.releaseTime,
    () => {
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
      }
      if (props.trainPlan !== ({} as Record)) {
        getInterval();
        console.log('get CHANGE');
      }
    }
  );
</script>

<style scoped lang="less">
  body,
  html {
    margin: 0;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  body {
    background-color: #d2dbdd;
    display: flex;
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    justify-content: center;
    align-items: center;
  }

  .cards {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    max-width: 820px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .card--1 .card__img,
  .card--1 .card__img--hover {
    background-image: url('https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
  }

  .card__like {
    width: 18px;
  }

  .card__clock {
    width: 15px;
    vertical-align: middle;
    fill: #ad7d52;
  }
  .card__time {
    font-size: 12px;
    color: #ad7d52;
    vertical-align: middle;
    margin-left: 5px;
  }

  .card__clock-info {
    float: right;
  }

  .card__img {
    visibility: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .card__info-hover {
    position: absolute;
    padding: 16px;
    width: 100%;
    opacity: 0;
    top: 0;
  }

  .card__img--hover {
    transition: 0.2s all ease-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    position: absolute;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    top: 0;
  }
  .card {
    margin-right: 25px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
    background-color: #fff;
    width: 100%;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
  }
  .card:hover {
    box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
    transform: scale(1.1, 1.1);
  }

  .card__info {
    z-index: 2;
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px 24px 24px 24px;
  }

  .card__category {
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: 500;
    color: #868686;
  }

  .card__title {
    margin-top: 5px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .card__by {
    font-size: 12px;
    font-weight: 500;
  }

  .card__author {
    font-weight: 600;
    text-decoration: none;
    color: #ad7d52;
  }

  .card:hover .card__img--hover {
    height: 100%;
    opacity: 0.3;
  }

  .card:hover .card__info {
    background-color: transparent;
    position: relative;
  }

  .card:hover .card__info-hover {
    opacity: 1;
  }

  .extra {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user {
    display: flex;
    margin-top: auto;
  }

  .user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .user-info h5 {
    margin: 8px 20px 0 0;
  }
  .user-info small {
    color: #545d7a;
  }
</style>
