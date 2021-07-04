<template>
  <container class="bg-negative-700" content-class="!py-20">
    <resume-section-header
      title="项目"
      description="我开发的项目，更多请到 Github 查看。"
    >
      <template #actions>
        <a href="javascript:;">
          <imager class="w-7 h-7 rounded-full overflow-hidden bg-negative-600" />
        </a>
        <icon name="icon-arrow-right" />
      </template>
    </resume-section-header>
    <collapse show>
      <div class="relative pb-6" v-loading="loading">
        <transition name="fade" mode="out-in">
          <empty type="large" v-if="!repositories.length" />
          <div class="repository-wrapper flex flex-wrap" v-else>
            <div
              class="repository-item"
              v-for="item in repositories"
              :key="item?.id"
            >
              <div class="body h-full flex flex-col bg-negative-900 border border-negative-600">
                <div class="font-bold truncate text-positive-900">{{ item?.name }}</div>
                <div class="mt-2 flex-auto text-sm truncate-3 text-positive-500">{{ item?.description ?? '' }}</div>
                <div class="mt-4 inline-flex items-center text-positive-300">
                  <icon name="icon-more" />
                  <span class="ml-2 text-xs truncate">2021-11-02 16:02</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </collapse>
  </container>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  import { getRepositories } from '@/modules/api/requests/github';
  // Components
  import Collapse from '@/components/collapse';
  import ResumeSectionHeader from './section-header.vue';

  export default {
    name: 'resume-repositories',
    components: {
      Collapse,
      ResumeSectionHeader,
    },
    setup() {
      const loading = ref(false);
      const repositories = ref([]);
      async function fetchRepositories() {
        if (loading.value) return;

        try {
          loading.value = true;
          const { data } = await getRepositories();
          repositories.value = (data ?? []).slice(0, 6);
        } finally {
          loading.value = false;
        }
      }

      fetchRepositories();

      return {
        loading,
        repositories,
      };
    },
  };
</script>

<style lang="less" scoped>
  .truncate-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .repository-wrapper {
    margin-left: calc(theme('spacing[3]') / 2 * -1);
    margin-right: calc(theme('spacing[3]') / 2 * -1);
  }
  .repository-item {
    @apply mt-4 rounded cursor-pointer transform;
    @apply transition duration-300 hover:-translate-y-1 hover:shadow-lg;
    margin-left: calc(theme('spacing[3]') / 2);
    margin-right: calc(theme('spacing[3]') / 2);
    width: calc(33.33% - theme('spacing[3]'));
  }
</style>