<template>
  <div class="container">
    <div class="text-right">
      <a-button type="primary">
        <template #icon>
          <icon-plus />
        </template>
        我要发贴
      </a-button>
    </div>
    <a-divider />
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="dataSource"
      :pagination-props="paginationProps"
    >
      <template #item="{ item }">
        <a-list-item class="list-demo-item" action-layout="vertical">
          <template #actions>
            <span class="icon-hover"><icon-heart />83</span>
            <span class="icon-hover"><icon-star />{{ item.index }}</span>
            <span class="icon-hover"><icon-message />Reply</span>
            <span style="position: absolute; right: 0px"
              ><a-link class="user-link" :hoverable="false">
                <template #icon>
                  <icon-at
                    style="font-size: 16; margin-right: 0px; margin-left: 0px"
                  />
                </template>
                {{ item.title }}</a-link
              >发表于 2022-12-14</span
            >
          </template>

          <a-list-item-meta :description="item.description">
            <template #avatar>
              <a-avatar>
                <img alt="avatar" :src="item.avatar" />
              </a-avatar>
            </template>
            <template #title>
              <a-link class="title-link" :hoverable="false">{{
                item.title
              }}</a-link>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const names = ['Socrates', 'Balzac', 'Plato'];
  const avatarSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const dataSource = new Array(15).fill(null).map((_, index) => {
    return {
      index,
      avatar: avatarSrc[index % avatarSrc.length],
      title: names[index % names.length],
      description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
      imageSrc: imageSrc[index % imageSrc.length],
    };
  });

  const paginationProps = reactive({
    defaultPageSize: 3,
    total: dataSource.length,
  });
</script>

<style lang="less" scoped>
  .list-demo-action-layout .list-demo-item {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-fill-3);
  }

  svg {
    margin: 0 4px;
  }

  :deep(.arco-link-icon) {
    margin-right: 0px;
  }

  :deep(.arco-link) {
    padding: 0px;
  }
</style>
