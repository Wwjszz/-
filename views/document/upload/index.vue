<template>
  <div class="container">
    <a-form :model="formData">
      <a-tabs size="large" :animation="true">
        <a-tab-pane key="1">
          <template #title>
            <icon-filter /> {{ $t('document.create.article') }}</template
          >
          <Breadcrumb
            :items="['menu.document', 'menu.document.upload']"
          ></Breadcrumb>
          <a-card class="general-card" style="margin-bottom: 10px">
            <template #title> {{ $t('document.create.title') }} </template>
            <a-row>
              <a-col :span="13">
                <a-form-item
                  :label="$t('document.create.title')"
                  style="margin-top: 10px"
                >
                  <a-input
                    v-model="formData.title"
                    :style="{ width: '400px', height: '35px' }"
                    :placeholder="$t('document.create.title')"
                  />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  :label="$t('document.create.major')"
                  style="margin-top: 10px"
                >
                  <a-input
                    v-model="formData.major"
                    :style="{ width: '400px', height: '40px' }"
                    :placeholder="$t('document.create.major')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card class="general-card">
            <template #title>{{ $t('document.create.content') }}</template>
            <v-md-editor
              v-model="formData.content"
              height="500px"
            ></v-md-editor>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #title>
            <icon-history /> {{ $t('document.create.video') }}
          </template>
          <Breadcrumb
            :items="['menu.question', 'document.create.uploadVideo']"
          />
          <a-card class="general-card">
            <template #title>
              {{ $t('document.create.videoUpload') }}
            </template>
            <a-upload draggable action="/" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #title>
            <icon-sun-fill /> {{ $t('document.create.submit') }}
          </template>
          <Breadcrumb :items="['menu.question', 'document.create.submit']" />
          <a-card class="general-card">
            <template #title>
              {{ $t('document.create.result') }}
            </template>
            <a-result
              v-if="!success"
              status="warning"
              :title="$t('document.create.status.warning')"
            >
              <template #subtitle> 请核对后提交 </template>

              <template #extra>
                <a-space>
                  <a-button type="primary" status="success">{{
                    $t('document.create.result.check')
                  }}</a-button>
                  <a-button type="primary">{{
                    $t('document.create.result.save')
                  }}</a-button>
                </a-space>
              </template>
            </a-result>
            <a-result
              v-else
              status="success"
              :title="$t('document.create.status.success')"
            >
              <template #subtitle> 核对成功！可以进行提交 </template>

              <template #extra>
                <a-space>
                  <a-button type="primary" status="success">{{
                    $t('document.create.result.save')
                  }}</a-button>
                  <a-button type="primary">{{
                    $t('document.create.result.submit')
                  }}</a-button>
                </a-space>
              </template>
            </a-result>
          </a-card>
        </a-tab-pane>
      </a-tabs>

      {{ formData }}
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { DocumentCreateRecord } from '@/api/document';

  const formData = ref<DocumentCreateRecord>({} as DocumentCreateRecord);

  const success = ref(false);
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0px;
  }
</style>
