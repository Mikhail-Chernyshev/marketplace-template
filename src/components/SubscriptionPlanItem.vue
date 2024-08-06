<template>
  <div class="subscriptionPlan">
    <div v-if="idPlan" class="subscriptionPlan__items">
      <div class="subscriptionPlan__items_x-wrapper">
        <div class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Title *</label>
          <div class="subscriptionPlan__item-field">
            <input
              class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
              v-model="fetchData.title"
              type="text"
              placeholder="Enter plan title"
            />
          </div>
        </div>
        <div class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Price *</label>
          <div class="subscriptionPlan__item-field">
            <input
              class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
              v-model="fetchData.price"
              type="number"
              placeholder="Enter price"
            />
          </div>
        </div>
      </div>

      <div class="subscriptionPlan__item">
        <label class="subscriptionPlan__item-label">Duration *</label>
        <div class="subscriptionPlan__item-field">
          <select
            class="subscriptionPlan__item-input"
            v-model="fetchData.duration"
          >
            <option v-for="el in periods" :value="el.value" :key="el.text">
              {{ el.text || 'undefined' }}
            </option>
          </select>
        </div>
      </div>
      <div class="subscriptionPlan__item">
        <div class="subscriptionPlan__item-field">
          <input
            id="featuredCheck"
            class="subscriptionPlan__item-checkbox"
            type="checkbox"
            role="switch"
            v-model="fetchData.promoUsable"
          />
          <label
            for="featuredCheck"
            class="subscriptionPlan__item-label subscriptionPlan__item-label_checkbox"
          >
            Promo useable
          </label>
        </div>
      </div>
    </div>

    <div v-else class="subscriptionPlan__items">
      <div class="subscriptionPlan__items_x-wrapper">
        <div class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Title *</label>
          <div class="subscriptionPlan__item-field">
            <input
              class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
              v-model="newPlanData.title"
              type="text"
              placeholder="Enter plan title"
            />
          </div>
        </div>
        <div class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Price *</label>
          <div class="subscriptionPlan__item-field">
            <input
              class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
              v-model="newPlanData.price"
              type="number"
              placeholder="Enter price"
            />
          </div>
        </div>
      </div>

      <div class="subscriptionPlan__item">
        <label class="subscriptionPlan__item-label">Duration *</label>
        <div class="subscriptionPlan__item-field">
          <select
            class="subscriptionPlan__item-input"
            v-model="newPlanData.duration"
          >
            <option v-for="el in periods" :value="el.value" :key="el.text">
              {{ el.text || 'undefined' }}
            </option>
          </select>
        </div>
      </div>
      <div class="subscriptionPlan__item">
        <div class="subscriptionPlan__item-field">
          <input
            id="featuredCheck"
            class="subscriptionPlan__item-checkbox"
            type="checkbox"
            role="switch"
            v-model="newPlanData.promoUsable"
          />
          <label
            for="featuredCheck"
            class="subscriptionPlan__item-label subscriptionPlan__item-label_checkbox"
          >
            Promo useable
          </label>
        </div>
      </div>
    </div>

    <div class="subscriptionPlan-footer">
      <div
        @click="editSubscriptionPlan"
        class="subscriptionPlan-footer-close"
        type="button"
      >
        Save
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'subscriptionPlanItem',
  components: {},
  props: {
    id: { type: Number },
  },
  setup(props) {
    const idPlan = ref(props.id);
    const fetchData = ref({});
    const newPlanData = ref({ duration: 1 });
    const router = useRouter();
    const periods = [
      { text: '1 day', value: '1' },
      { text: '30 days', value: '30' },
      { text: '60 days', value: '60' },
      { text: '90 days', value: '90' },
    ];

    const fetchsubscriptionPlanData = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/subscription-plans/${props?.id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const editSubscriptionPlan = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/subscription-plans`;

      try {
        const response = await fetch(url, {
          method: props.id ? 'PUT' : 'POST',
          body: props.id
            ? JSON.stringify(fetchData.value)
            : JSON.stringify(newPlanData.value),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        router.push('/settings/subscription-plans');
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    onMounted(() => {
      if (props.id) {
        fetchsubscriptionPlanData();
      }
    });

    return {
      editSubscriptionPlan,
      periods,
      fetchData,
      newPlanData,
      idPlan,
    };
  },
};
</script>

<style scoped lang="scss">
.subscriptionPlan {
  width: 58%;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 8px;
  &__items {
    display: flex;
    flex-direction: column;
    padding: 0 24px 24px 24px;
    &_x-wrapper {
      display: flex;
      gap: 24px;
    }
  }
  &__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 24px;

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
    }
    &-checkbox {
      height: 20px;
      margin: 0;
      margin-right: 12px;
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
