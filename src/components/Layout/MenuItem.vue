<template>
  <li :class="['nav-item', 'mb-2', expanded ? 'px-lg-2' : '']">
    <RouterLink
      :to="to"
      class="nav-link px-2 custom-nav-link rounded-1"
      :class="{ active: isActive }"
      replace
    >
      <div class="hstack" v-if="expanded">
        <component :is="icon" />
        <span class="ms-2">{{ label }}</span>
        <slot></slot>
      </div>
      <div class="d-flex justify-content-center" v-else>
        <component :is="icon" />
      </div>
    </RouterLink>
  </li>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // Имя компонента иконки
      required: true,
    },
    expanded: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();

    const isActive = computed(() => {
      return props.to === route.path;
    });

    return {
      isActive,
    };
  },
};
</script>

<style scoped>
</style>
