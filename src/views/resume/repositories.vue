<template>
  <collapse show>
    <div class="relative" v-loading="loading">
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
</template>

<script>
  // Functions
  import { ref } from 'vue';
  import { getRepositories } from '@/modules/api/requests/github';
  // Components
  import Collapse from '@/components/collapse';

  export default {
    name: 'resume-repositories',
    components: {
      Collapse,
    },
    setup() {
      const loading = ref(false);
      const repositories = ref([]);
      async function fetchRepositories() {
        if (loading.value) return;

        try {
          loading.value = true;
          const { data } = await getRepositories();
          repositories.value = data ?? [];
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
    @apply mt-4 rounded cursor-pointer hover:shadow-xl;
    margin-left: calc(theme('spacing[3]') / 2);
    margin-right: calc(theme('spacing[3]') / 2);
    width: calc(33.33% - theme('spacing[3]'));
  }
</style>