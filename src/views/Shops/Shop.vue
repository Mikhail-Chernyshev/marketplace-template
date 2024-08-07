<template>
  <div class="updateCategory">
    <div class="updateCategory__header">
      <div class="updateCategory__header-column">
        <h2 class="updateCategory__header_title">Shop details</h2>
        <h3 class="updateCategory__header_route">
          <router-link :to="'/'">
            {{ capitalizeFirstLetter($route.meta.path) }} </router-link
          >{{ ' / ' }}
          <router-link :to="'/shops'">
            {{ capitalizeFirstLetter($route.meta.subPath) }}
          </router-link>
          /{{ ' ' + $route.params.id }}
        </h3>
      </div>
      <div class="updateCategory__header-column-x">
        <button class="updateCategory__header-show-page">View shop page</button>
        <RiExternalLinkLine :size="20" />
        <div class="header__locale">
          <div
            class="header__localeToggle"
            @click="handleButtonClick($event, showLocaleChoice)"
          >
            <!-- <span>{locale.toUpperCase()}</span> -->
            <span>EN</span>
          </div>
          <ul v-if="isLocaleChoice" class="header__locales">
            <li role="button" className="header__locales-item">Myanmar</li>
            <div className="header__locales-divider"></div>
            <li role="button" className="header__locales-item">English</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RiExternalLinkLine from '@remixicon/vue';
export default {
  name: 'ShopPage',
  components: { RiExternalLinkLine },
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
    margin-bottom: 30px;
    &-column-x {
      display: flex;
    }
    &-show-page {
      padding: 6px 12px;
      border: none;
      background-color: #c9c9c9;
      height: 37px;
      width: 175px;
      text-align: left;
      border-radius: 6px;
      font-size: 16px;
    }
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
.header__locales {
  position: absolute;
  top: 40px;
  right: 16px;
  width: 160px;
  height: 80px;
  outline: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 8px;
  z-index: 5;
  background-color: #ffffff;
  padding: 10px 0;
  list-style-type: none;
  &-item {
    height: 24px;
    font-weight: 500;
    padding: 4px 16px;
    &:hover {
      cursor: pointer;
      background-color: rgba(252, 91, 91);
      color: #ffffff;
    }
  }
  &-divider {
    height: 0;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.175);
    display: block;
    margin: 8px 0;
  }
}
</style>
