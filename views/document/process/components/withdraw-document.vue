<template>
  <div class="container">
    <a-card class="general-card">
      <h1 class="logo">{{ $t('menu.document.withdraw') }}</h1>
      <a-row>
        <a-input-search
          class="input"
          :placeholder="$t('document.search.text')"
        />
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="true"
        :size="size"
        :stripe="true"
        :hoverable="false"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #title="{ record }">
          <a-space>
            <doc-link :docId="record.id">{{ record.title }}</doc-link>
          </a-space>
        </template>
        <template #time="{ record }">
          <a-space style="opacity: 0.5">
            {{ record.interval }}
          </a-space>
        </template>
        <template #author="{ record }">
          <user-link :userImageUrl="record.imageUrl">{{
            record.author
          }}</user-link>
        </template>
        <template #likes="{ record }">
          <a-space>
            <icon-thumb-up-fill />
            {{ record.likes }}
          </a-space>
        </template>
        <template #optional>
          <a-button type="primary" status="danger">
            {{ t('question.examine.unpass') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import {
    queryDocumentList,
    DocumentRecord,
    DocumentParamsWithExamine,
  } from '@/api/document';
  import {
    getDifference,
    parseTimeString,
    TimeInterval,
  } from '@/utils/curTime';

  interface Record extends TimeInterval, DocumentRecord {}

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
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<Record[]>([]);
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
      title: t('document.columns.id'),
      dataIndex: 'id',
    },
    {
      title: t('document.columns.title'),
      dataIndex: 'title',
      slotName: 'title',
      ellipsis: true,
      tooltip: true,
      width: 400,
    },
    {
      title: t('document.columns.author'),
      dataIndex: 'author',
      slotName: 'author',
      ellipsis: true,
      tooltip: true,
      width: 300,
    },
    {
      title: t('document.columns.readers'),
      dataIndex: 'readers',
      slotName: 'readers',
    },
    {
      title: t('document.columns.likes'),
      dataIndex: 'likes',
      slotName: 'likes',
    },
    {
      title: t('document.columns.time'),
      dataIndex: 'releaseTime',
      slotName: 'time',
    },
    {
      title: t('document.examine'),
      slotName: 'optional',
    },
  ]);
  const fetchData = async (
    params: DocumentParamsWithExamine = {
      examine: 'y',
      current: 1,
      pageSize: 20,
    }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryDocumentList(params);
      renderData.value = data.list as Record[];
      renderData.value.forEach((item, index, self) => {
        const interval = parseTimeString(item.releaseTime);
        Object.keys(interval).forEach((key) => {
          (self[index] as any)[key as keyof Record] =
            interval[key as keyof TimeInterval];
        });
      });

      const date = new Date();
      renderData.value.forEach((item, index, self) => {
        getDifference(self[index] as TimeInterval, date);
      });

      setInterval(() => {
        const date = new Date();
        renderData.value.forEach((item, index, self) => {
          getDifference(self[index] as TimeInterval, date);
        });
      }, 60000);

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
    } as unknown as DocumentParamsWithExamine);
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
