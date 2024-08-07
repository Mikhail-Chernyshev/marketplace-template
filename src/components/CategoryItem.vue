<template>
  <div class="category">
    <div class="category__items">
      <div class="category__item">
        <label class="category__item-label">Name *</label>
        <div class="category__item-field">
          <input
            class="category__item-input category__item-input_borderLeft"
            v-model="nameInEnglish"
            type="text"
            placeholder="Enter english category name"
          />
          <span class="category__item-lang">
            {{ 'EN' }}
          </span>
        </div>
      </div>
      <div class="category__item">
        <label class="category__item-label">Name *</label>
        <div class="category__item-field">
          <input
            class="category__item-input category__item-input_borderLeft"
            v-model="nameInLocal"
            type="text"
            placeholder="Enter localized category name"
          />
          <span class="category__item-lang">
            {{ 'MM' }}
          </span>
        </div>
      </div>
      <div class="category__item">
        <label class="category__item-label">Slug *</label>
        <div class="category__item-field">
          <input
            class="category__item-input"
            v-model="slug"
            type="text"
            placeholder="your-category-name"
          />
        </div>
      </div>
      <div class="category__item">
        <label class="category__item-label">Parent Category</label>
        <div class="category__item-field">
          <select
            v-if="categories && categories.length > 0"
            class="category__item-input"
            v-model="category"
          >
            <option v-for="el in categories" :value="el.id" :key="el.name">
              {{ el.name || 'undefined' }}
            </option>
          </select>
          <select v-else class="category__item-input" v-model="category">
            <option value="" disabled selected>
              {{ 'No data' }}
            </option>
          </select>
        </div>
      </div>
      <div class="category__item">
        <div class="category__item-field">
          <input
            id="featuredCheck"
            class="category__item-checkbox"
            type="checkbox"
            role="switch"
            v-model="featured"
          />
          <label
            for="featuredCheck"
            class="category__item-label category__item-label_checkbox"
          >
            Featured
          </label>
        </div>
      </div>

      <div class="category__item">
        <label class="category__item-label">Image</label>

        <div class="category__item-field">
          <button
            v-if="!image"
            class="category__item-button-upload"
            @click="triggerFileInput"
          >
            <RiAddLine :size="46" />
          </button>
          <input
            ref="fileRef"
            type="file"
            accept="image/x-png,image/jpeg"
            class="category__item-button-upload-input"
            @change="handleImageChange"
            style="display: none"
          />
          <img
            @click="triggerFileInput"
            v-if="image"
            :src="image"
            alt="Selected Image"
            class="category__item-button-upload category__item-button-upload-image"
          />
        </div>
      </div>
    </div>

    <div class="category-footer">
      <div @click="createCategory" class="category-footer-close" type="button">
        Save
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { RiAddLine } from '@remixicon/vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CategoryItem',
  components: {
    RiAddLine,
  },
  props: {
    id: { type: Number },
    update: { type: Boolean },
  },
  setup(props) {
    const router = useRouter();
    const nameInEnglish = ref('');
    const nameInLocal = ref('');
    const slug = ref('');
    const category = ref(null);
    const categories = ref([]);
    const featured = ref(false);
    const fileRef = ref(null);
    const image = ref(null);
    const imageFile = ref(null);

    const triggerFileInput = () => {
      fileRef.value.click();
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = () => {
          image.value = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const fetchCategoryData = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/categories/${props.id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        const result = await response.json();
        nameInEnglish.value = result.names?.find(
          (e) => e.lang.toUpperCase() === 'EN'
        )?.name;
        nameInLocal.value = result.names?.find(
          (e) => e.lang.toUpperCase() === 'MM'
        )?.name;
        slug.value = result?.slug;
        featured.value = result?.featured;
        category.value = result?.category?.id;
        image.value = result?.image.replace('localhost', '192.168.0.177:8180');
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const fetchCategoriesData = async (path) => {
      let url = `${process.env.VUE_APP_BASE_URL}/${path}/categories?root=false`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        const result = await response.json();
        categories.value = result;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const createCategory = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/categories`;
      const data = new FormData();
      imageFile.value && data.append('file', imageFile.value);
      const bodyContent = {
        slug: slug.value,
        categoryId: category.value,
        featured: featured.value,
        names: [
          { name: nameInEnglish.value, lang: 'en' },
          { name: nameInLocal.value, lang: 'mm' },
        ],
      };
      props.id ? (bodyContent.id = Number(props.id)) : '';
      const jsonBlob = new Blob([JSON.stringify(bodyContent)], {
        type: 'application/json',
      });
      data.append('body', jsonBlob);
      try {
        const response = await fetch(url, {
          method: props.update ? 'PUT' : 'POST',
          body: data,
        });
        if (!response.ok) {
          const responseBody = await response.text();
          throw new Error('Ошибка: ' + responseBody);
        }
        if (!props.update) {
          router.push('/categories');
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    onMounted(() => {
      if (props.id) {
        fetchCategoryData();
      }
      if (props.update) {
        fetchCategoriesData('content');
      } else {
        fetchCategoriesData('admin');
      }
    });

    return {
      nameInEnglish,
      nameInLocal,
      slug,
      category,
      featured,
      fileRef,
      image,
      triggerFileInput,
      handleImageChange,
      createCategory,
      categories,
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
    margin-top: 24px;
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
    &-field {
      width: 100%;
      display: flex;
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
    padding: 8px 16px;
    background-color: #21252908;
    border-top: 1px solid rgba(0, 0, 0, 0.175);
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
