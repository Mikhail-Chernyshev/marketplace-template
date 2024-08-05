<template>
  <div class="category">
    <div class="category__items">
      <div class="category__item">
        <h3 class="category__item_title">Permissions</h3>
        <div v-if="user.permissions" class="category__item-fields">
          <div
            v-for="permission in permissionsGroup"
            :key="permission"
            class="category__item-field"
          >
            <span class="category__item-field-name">
              {{ permission.name }}
            </span>
            <div
              v-for="el in permission.permissions"
              :key="el"
              class="category__item-field-checkbox-box"
            >
              <input
                class="category__item-field-checkbox"
                :checked="isChecked(permission.name, el)"
                @change="togglePermission(permission.name, el)"
                type="checkbox"
              />
              <label class="category__item-field-checkbox-label">{{
                el
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="category-footer">
      <div
        @click="editUserPermissions"
        class="category-footer-close"
        type="button"
      >
        Save
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'UserPermissionsCard',
  components: {},
  props: {
    user: { type: Object },
  },
  setup(props, { emit }) {
    const permissionsGroup = [
      {
        name: 'Dashboard',
        permissions: ['Read'],
      },
      {
        name: 'Banner',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'Category',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'City',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'Shop',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'Product',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'User',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'Subscription Plan',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'Promo Code',
        permissions: ['Read', 'Write'],
      },
      {
        name: 'Subscription History',
        permissions: ['Read'],
      },
      {
        name: 'Site Setting',
        permissions: ['Write'],
      },
    ];
    const permissionsUser = ref(props.user.permissions);
    console.log(100, permissionsUser.value);

    const isChecked = (permission, item) => {
      console.log(102, permission, item, props.user.permissions);
      return props.user.permissions.find(
        (el) =>
          el ===
          `${permission.toUpperCase().replace(' ', '_')}_${item.toUpperCase()}`
      );
    };

    const editUserPermissions = () => {
      emit('putCategoriesData');
    };

    const togglePermission = (permission, item) => {
      const permissionKey = `${permission
        .toUpperCase()
        .replace(' ', '_')}_${item.toUpperCase()}`;
      if (props.user.permissions.includes(permissionKey)) {
        // Удаляем разрешение, если оно уже есть
        permissionsUser.value = props.user.permissions.filter(
          (p) => p !== permissionKey
        );
      } else {
        // Добавляем разрешение, если его нет
        permissionsUser.value.push(permissionKey);
      }
      emit('update-permissions', permissionsUser.value);
    };

    onMounted(() => {});

    return {
      permissionsGroup,
      isChecked,
      togglePermission,
      permissionsUser,
      editUserPermissions,
    };
  },
};
</script>

<style scoped lang="scss">
.category {
  width: 58%;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 8px;
  &__items {
    display: flex;
    flex-direction: column;
    padding: 0 24px 24px 24px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 12px;
    &_title {
      font-size: 26px;
      font-weight: 800;
      margin: 0;
      margin-bottom: 16px;
    }
    &-button-upload {
      width: 120px;
      height: 120px;
      background-color: #ffffff;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.175);
      &:hover {
        cursor: pointer;
      }
      &-input {
        width: 0;
        height: 0;
      }
    }
    &-label {
      font-size: 16px;
      font-weight: 800;
      margin: 0 0 8px 0;
      &_checkbox {
        margin-bottom: 0;
      }
    }
    &-fields {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      gap: 14px;
    }
    &-field {
      display: flex;
      flex-direction: column;
      width: calc(50% - 7px);
    }
    &-field {
      display: flex;
      &-checkbox-box {
        display: flex;
        gap: 4px;
        margin-bottom: 4px;
      }

      &-name {
        padding-bottom: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.175);
      }
    }
    &-input {
      height: 42px;
      padding: 4px 12px;
      border-radius: 4px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      flex: 1 1 auto;
      font-size: 16px;
      color: black;
      &_borderLeft {
        border-radius: 4px 0 0 4px;
      }
    }
    &-checkbox {
      height: 20px;
      margin: 0;
      margin-right: 12px;
    }
    &-lang {
      line-height: 42px;
      padding: 4px 12px;
      border-radius: 0 4px 4px 0;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      font-size: 16px;
      color: black;
      width: 32px;
    }
  }
  &-footer {
    padding: 12px 16px;
    background-color: #21252908;
    border-top: 1px solid rgba(0, 0, 0, 0.175);
    display: flex;
    align-items: center;
    &-close {
      appearance: none;
      font-size: 16px;
      padding: 6px 12px;
      border: none;
      background-color: #e15b51;
      border-radius: 6px;
      height: 26px;
      line-height: 26px;
      font-weight: 700;
      color: #ffffff;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
