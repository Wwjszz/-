<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.document', 'document.list', route.params.id]"
    ></Breadcrumb>
    <a-card class="document-card">
      <a-card-meta>
        <template #title>
          <a-spin :loading="loading" dot>
            <a-row>
              <a-typography-title
                :heading="3"
                style="
                  margin-top: 10px;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >
                {{
                  curDocument.id
                    ? `${curDocument.id}. ${curDocument.title}`
                    : '加载中'
                }}
              </a-typography-title>
            </a-row>
          </a-spin>
        </template>

        <template #description>
          <a-row style="align-items: center">
            <p class="op-font">{{ `${$t('document.single.author')}：` }}</p>
            <user-link :userImageUrl="curDocument.imageUrl">{{
              curDocument.author
            }}</user-link>
            <p class="op-font"
              >,&nbsp;{{ curDocument.releaseTime }},&nbsp;
              <span v-if="curDocument.examine">
                <icon-check-circle-fill />&nbsp;已审核
              </span>
              <span v-else><icon-close-circle-fill />&nbsp;未审核</span>
              ,&nbsp; 阅读：{{ curDocument.readers }}</p
            >
            <p style="flex: 1; text-align: right">{{ curDocument.major }}</p>
          </a-row>
        </template>
      </a-card-meta>
      <a-divider />
      <a-row>
        <a-col :span="2">
          <a-row
            ><a-rate
              :count="1"
              style="margin: 0 auto; font-size: 30px; margin-bottom: 10px"
              color="orange"
              ><template #character> <icon-thumb-up-fill /> </template></a-rate
          ></a-row>
          <a-row
            ><p
              style="
                margin: 0 auto;
                font-size: 20px;
                margin-bottom: 18px;
                color: orange;
              "
              >{{ curDocument.likes }}</p
            ></a-row
          >
          <a-row
            ><a-rate
              :count="1"
              style="margin: 0 auto; font-size: 30px; margin-bottom: 18px"
          /></a-row>
          <a-row
            ><p style="margin: 0 auto; font-size: 20px; color: #d4a849">{{
              curDocument.likes
            }}</p></a-row
          >
        </a-col>
        <a-col :span="22">
          <v-md-preview :text="curDocument.content"></v-md-preview>
          <a-divider />
          <div v-if="curDocument.video">
            <h2>配套视频</h2>
            <a-divider />
            <vue3VideoPlay
              v-bind="options"
              poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
            />
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="comment">
      <u-comment
        :config="config"
        :show-size="2"
        @submit="submit"
        @like="like"
        @remove="remove"
        @report="report"
      >
        <!-- <template #list-title>全部评论</template> -->
      </u-comment>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { DocumentDetailRecord, querySingleDocument } from '@/api/document';
  import useLoading from '@/hooks/loading';
  import { useRoute } from 'vue-router';
  import { UToast, CommentApi, ConfigApi } from 'undraw-ui';

  import emoji from './emoji';

  const count = ref(1);
  const route = useRoute();

  const { loading, setLoading } = useLoading(true);

  const curDocument = ref<DocumentDetailRecord>({} as DocumentDetailRecord);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await querySingleDocument({ id: +route.params.id });
      curDocument.value = data;
    } catch (err) {
      // error
    } finally {
      setLoading(false);
      console.log(curDocument.value);
    }
  };

  fetchData();

  const options = reactive({
    width: '800px',
    height: '450px',
    color: '#409eff',
    title: '',
    src: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4',
    muted: false,
    webFullScreen: false,
    speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'],
    autoPlay: false,
    loop: false,
    mirror: false,
    ligthOff: false,
    volume: 0.3,
    control: true,
    controlBtns: [
      'audioTrack',
      'quality',
      'speedRate',
      'volume',
      'setting',
      'pip',
      'pageFullScreen',
      'fullScreen',
    ],
  });

  const config = reactive<ConfigApi>({
    user: {
      id: '1',
      username: 'user',
      avatar:
        'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
      // 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
      likeIds: ['1', '2', '11'],
    },
    emoji,
    comments: [],
  });

  let tempId = 100;
  // 提交评论事件
  const submit = (
    content: string,
    parentId: string,
    finish: (comment: CommentApi) => void
  ) => {
    const comment: CommentApi = {
      id: String((tempId += 1)),
      parentId,
      uid: config.user.id,
      username: config.user.username,
      avatar: config.user.avatar,
      level: 6,
      link: `/${(tempId += 1)}`,
      address: '来自江苏',
      content,
      like: 0,
      createTime: '1分钟前',
      reply: null,
    };
    setTimeout(() => {
      finish(comment);
      UToast({ message: '评论成功!', type: 'info' });
    }, 200);
  };

  // 删除评论
  const remove = (id: number, finish: () => void) => {
    setTimeout(() => {
      finish();
      alert(`删除成功: ${id}`);
    }, 200);
  };

  const report = (id: number, finish: () => void) => {
    console.log(id);
    setTimeout(() => {
      finish();
      alert(`举报成功: ${id}`);
    }, 200);
  };

  const like = (id: number, finish: () => void) => {
    console.log(id);
    setTimeout(() => {
      finish();
    }, 200);
  };

  config.comments = [
    {
      id: '1',
      parentId: null,
      uid: '1',
      username: '落🤍尘',
      avatar:
        'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
      level: 6,
      link: '/1',
      address: '来自上海',
      content:
        '缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]',
      like: 2,
      createTime: '1分钟前',
    },
    {
      id: '2',
      parentId: null,
      uid: '2',
      username: '悟二空',
      avatar:
        'https://static.juzicon.com/user/avatar-bf22291e-ea5c-4280-850d-88bc288fcf5d-220408002256-ZBQQ.jpeg',
      level: 1,
      link: '/2',
      address: '来自苏州',
      content:
        '知道在学校为什么感觉这么困吗？因为学校，是梦开始的地方。[脱单doge]',
      like: 11,
      createTime: '1天前',
      reply: {
        total: 2,
        list: [
          {
            id: '21',
            parentId: '2',
            uid: '3',
            username: '别扰我清梦*ぁ',
            avatar:
              'https://static.juzicon.com/user/avatar-8b6206c1-b28f-4636-8952-d8d9edec975d-191001105631-MDTM.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 5,
            link: '/21',
            address: '来自重庆',
            content: '说的对，所以，综上所述，上课睡觉不怪我呀💤',
            like: 3,
            createTime: '1分钟前',
          },
          {
            id: '22',
            parentId: '2',
            uid: '4',
            username: 'Blizzard',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            link: '/22',
            content:
              '回复 <span style="color: blue;"">@别扰我清梦*ぁ:</span> 看完打了一个哈切。。。会传染。。。[委屈]',
            address: '来自广州',
            like: 9,
            createTime: '1天前',
          },
        ],
      },
    },
  ];
</script>

<style lang="less" scoped>
  .document-card {
    border-radius: 4px;
    border: none;
    & > .arco-card-header {
      height: auto;
      padding: 20px 20px 0px 20px;
      margin-bottom: 0px;
      border: none;
    }
    & > .arco-card-body {
      padding: 0 20px 20px 20px;
    }
  }

  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-typography) {
    margin-bottom: 0px !important;
  }

  .op-font {
    opacity: 0.5;
  }

  :deep(.d-player-wrap) {
    margin: 0 auto;
  }

  .comment {
    margin-top: 10px;
    border-radius: 4px;
    border: none;
    & > .arco-card-header {
      height: auto;
      padding: 20px;
      border: none;
    }
    & > .arco-card-body {
      padding: 0 20px 20px 20px;
    }
  }
</style>
