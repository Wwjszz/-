<template>
  <div class="container">
    <a-form :model="curNote">
      <a-card class="s-card">
        <a-form-item>
          <template #label>
            {{ t('question.note.title') }}
          </template>
          <a-input
            v-model="curNote.title"
            :placeholder="t('question.note.title')"
            :style="{ width: '500px' }"
          />
        </a-form-item>
      </a-card>
      <a-card class="md-card">
        <template #title>{{ $t('question.note.content') }}</template>
        <v-md-editor height="500px"></v-md-editor>
      </a-card>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { NoteRecord, queryNote } from '@/api/note';
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();
  const curNote = ref({} as NoteRecord);
</script>

<style lang="less" scoped>
  .md-card {
    padding: 0px 0px 10px;
    border-radius: 4px;
    border: none;
    & > .arco-card-header {
      height: auto;
      padding: 10px;
      border: none;
    }
    & > .arco-card-body {
      padding: 0 20px 20px 20px;
      width: 500px;
    }
  }
</style>
