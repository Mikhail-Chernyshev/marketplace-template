<template>
  <li class="navItem" :class="{ navItem_expanded: expanded }">
    <RouterLink
      class="navItem__link"
      :to="to"
      :class="{
        navItem__link_active: isActive,
        navItem__link_expanded: expanded,
      }"
      replace
    >
      <div class="navItem__linkContent" v-if="expanded">
        <slot name="icon"></slot>
        <span class="navItem__linkLabel">{{ label }}</span>
      </div>
      <div class="navItem__linkContent_small" v-else>
        <slot name="icon"></slot>
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
<style scoped lang="scss">
.navItem {
  height: 56px;
  margin: 0 0 8px 0;
  padding: 0px;
  color: #c8c8c8;
  &_expanded {
    height: 40px;
    padding: 0 8px;
  }
  &__link {
    transition: color 0.3s ease, background-color 0.3s ease;
    color: #c8c8c8;
    height: 56px;
    text-decoration: none;
    display: flex;
    border-radius: 0px;
    justify-content: center;
    &_expanded {
      height: 40px;
      border-radius: 4px;
      justify-content: unset;
    }
    &_active {
      color: #ffffff !important;
      background-color: #e15b51;
      height: 40px;
      &:hover {
        background-color: #e15b51 !important;
      }
    }
    &:hover {
      color: #ffffff !important;
      background-color: rgb(243, 244, 246, 0.1);
    }
  }
  &__linkContent {
    margin: 0;
    padding: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    &_small {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  &__linkLabel {
    font-weight: 700;
  }
}
</style>
