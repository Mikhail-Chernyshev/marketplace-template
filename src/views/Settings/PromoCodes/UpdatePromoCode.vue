<template>
  <div class="updateCategory">
    <div class="updateCategory__header">
      <h2 class="updateCategory__header_title">Update Promo code</h2>
      <h3 class="updateCategory__header_route">
        <router-link :to="'/settings'">
          {{ capitalizeFirstLetter($route.meta.path) }} </router-link
        >{{ ' / ' }}
        <router-link :to="'/settings'">
          {{ capitalizeFirstLetter($route.meta.subPath) }}
        </router-link>
        /{{ ' Update Promo code' }}
      </h3>
    </div>
    <PromoCodeItem :id="$route.params.id" />
  </div>
</template>

<script>
import PromoCodeItem from '../../../components/PromoCodeItem.vue';
export default {
  name: 'UpdatePromoCodePage',
  components: { PromoCodeItem },
  setup() {
    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    return {
      capitalizeFirstLetter,
    };
  },
};
</script>
<style scoped lang="scss">
.updateCategory {
  padding: 16px 12px;
  flex-grow: 1;
  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 30px;
    &_title {
      font-size: 30px;
      margin: -3px 0 0 0;
      height: 38px;
      flex: 1 0;
    }
    &_route {
      font-size: 16px;
      margin: 0;
      font-weight: 500;
      & > a:visited {
        color: inherit;
      }
    }
  }
  &__selects {
    display: flex;
    gap: 18px;
    margin-bottom: 18px;
  }
  &__select {
    font-size: 16px;
    padding: 6px 16px 6px 12px;
    width: auto;
    height: 50px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    &:focus {
      border-color: rgb(225, 91, 81);
      outline: none;
    }
  }
}
</style>
