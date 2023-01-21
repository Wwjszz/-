<template>
  <div class="container">
    <Breadcrumb :items="['menu.question', 'question.list']" />
    <a-card class="general-card">
      <h1 class="logo">{{ $t('question.title') }}</h1>
      <a-row>
        <a-input-search
          class="input"
          :placeholder="$t('question.search.text')"
        />
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        :stripe="true"
        :hoverable="false"
        @page-change="onPageChange"
      >
        <template #title="{ record }">
          <a-space>
            <question-link :questionId="record.id">{{
              record.title
            }}</question-link>
          </a-space>
        </template>
        <template #difficulty="{ record }">
          <a-space>
            <a-tag
              v-if="record.difficulty == 0"
              color="#00b42a
"
              >{{ t('question.difficulty.easy') }}</a-tag
            >
            <a-tag
              v-else-if="record.difficulty == 1"
              color="#ff7d00
"
              >{{ t('question.difficulty.medium') }}</a-tag
            >
            <a-tag
              v-else-if="record.difficulty == 2"
              color="#f53f3f
"
              >{{ t('question.difficulty.hard') }}</a-tag
            >
          </a-space>
        </template>
        <template #rate="{ record }">
          <a-space style="opacity: 0.5">
            {{
              (record.attempt ? record.pass / record.attempt : 0) * 100 + '%'
            }}
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import {
    queryQuestionList,
    QuestionParamsWithExamine,
    QuestionRecord,
  } from '@/api/question';
  import { useRouter } from 'vue-router';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: '',
    };
  };
  const router = useRouter();
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<QuestionRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('question.columns.id'),
      dataIndex: 'id',
    },
    {
      title: t('question.columns.title'),
      dataIndex: 'title',
      slotName: 'title',
      ellipsis: true,
      tooltip: true,
      width: 600,
    },
    {
      title: t('question.columns.major'),
      dataIndex: 'major',
    },
    {
      title: t('question.columns.rate'),
      dataIndex: 'rate',
      slotName: 'rate',
    },
    {
      title: t('question.columns.difficulty'),
      dataIndex: 'difficulty',
      slotName: 'difficulty',
    },
  ]);
  const fetchData = async (
    params: QuestionParamsWithExamine = {
      current: 1,
      pageSize: 20,
      examine: 'y',
    }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryQuestionList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as QuestionParamsWithExamine);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current, examine: 'y' });
  };

  fetchData();

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );

  const toSingle = (id: number) => {
    router.push({ path: `/question/${id}` });
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .input {
    width: 500px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .logo {
    font-size: 36px;
    text-align: center;
    margin: 0 auto;
    padding-top: 25px;
    padding-bottom: 25px;
  }

  :deep(.arco-table-th) {
    background-color: white;
    font-weight: bold;
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
