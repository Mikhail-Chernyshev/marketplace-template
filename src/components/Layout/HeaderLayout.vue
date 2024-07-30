<template>
  <header class="header">
    <div class="header__container">
      <div class="header__toggle" @click="toggleSideMenuExpansion">
        <RiMenuLine :size="24" />
      </div>
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
  </header>
</template>

<script>
import { RiMenuLine } from '@remixicon/vue';

export default {
  components: { RiMenuLine },
  props: {
    // locale: {
    //   type: String,
    //   required: true,
    // },

    toggleSideMenuExpansion: {
      type: Function,
      default: () => {},
    },
    showLocaleChoice: {
      type: Function,
    },
    isLocaleChoice: {
      type: Boolean,
    },
  },

  setup() {
    function handleButtonClick(event, openMenu) {
      event.stopPropagation();
      openMenu();
    }

    return { handleButtonClick };
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 70px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  &__container {
    padding: 0 16px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__toggle {
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
  &__locale {
    padding-right: 8px;
  }
  &__localeToggle {
    font-weight: 500;
    &:hover {
      cursor: pointer;
      color: rgba(252, 91, 91);
    }
    &::after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: '';
      border-top: 5px solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }
  }
  &__locales {
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
}
</style>
