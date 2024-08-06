<template>
  <div class="subscriptionPlan">
    <div v-if="idPlan" class="subscriptionPlan__items">
      <div class="subscriptionPlan__items_x-wrapper">
        <div class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Code *</label>
          <div class="subscriptionPlan__item-field">
            <input
              :disabled="true"
              class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
              v-model="fetchData.code"
              type="text"
              placeholder="Enter promo code"
            />
            <div
              @click="handleGenetateCode"
              class="subscriptionPlan__item-field-generate"
            >
              <RiRefreshLine :size="20" />
            </div>
          </div>
        </div>
        <div v-if="fetchData.expiredAt" class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Expired Date *</label>
          <div
            class="subscriptionPlan__item-field subscriptionPlan__item-field-date"
          >
            <DatePickerInput
              :disabled="true"
              :oneDate="true"
              v-model="fetchData.expiredAt"
            />
          </div>
        </div>
      </div>

      <div class="subscriptionPlan__item">
        <label class="subscriptionPlan__item-label">Amount *</label>
        <div class="subscriptionPlan__item-field">
          <input
            :disabled="true"
            class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
            v-model="fetchData.value"
            type="number"
            placeholder="Enter discount amount"
          />
          <select
            :disabled="true"
            class="subscriptionPlan__item-select"
            v-model="fetchData.valueType"
          >
            <option value="FIXED_AMOUNT" key="count">
              {{ '.00' }}
            </option>
            <option value="PERCENTAGE" key="percent">
              {{ '%' }}
            </option>
          </select>
        </div>
      </div>
      <div class="subscriptionPlan__item">
        <label class="subscriptionPlan__item-label">Minimum Constraint</label>
        <div class="subscriptionPlan__item-field">
          <input
            :disabled="true"
            class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
            v-model="fetchData.minConstraint"
            type="number"
            placeholder="Enter minimum useable amount"
          />
        </div>
      </div>
    </div>

    <div v-else class="subscriptionPlan__items">
      <div class="subscriptionPlan__items_x-wrapper">
        <div class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Code *</label>
          <div class="subscriptionPlan__item-field">
            <input
              disabled="true"
              class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
              v-model="promoCodeData.code"
              type="text"
              placeholder="Enter promo code"
            />
            <div
              @click="handleGenetateCode"
              class="subscriptionPlan__item-field-generate"
            >
              <RiRefreshLine :size="20" />
            </div>
          </div>
        </div>
        <div class="subscriptionPlan__item">
          <label class="subscriptionPlan__item-label">Expired Date *</label>
          <div
            class="subscriptionPlan__item-field subscriptionPlan__item-field-date"
          >
            <DatePickerInput
              :oneDate="true"
              v-model="promoCodeData.expiredAt"
            />
          </div>
        </div>
      </div>

      <div class="subscriptionPlan__item">
        <label class="subscriptionPlan__item-label">Amount *</label>
        <div class="subscriptionPlan__item-field">
          <input
            class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
            v-model="promoCodeData.discount"
            type="number"
            placeholder="Enter discount amount"
          />
          <select
            class="subscriptionPlan__item-select"
            v-model="promoCodeData.discountType"
          >
            <option value="count" key="count">
              {{ '.00' }}
            </option>
            <option value="percent" key="percent">
              {{ '%' }}
            </option>
          </select>
        </div>
      </div>
      <div class="subscriptionPlan__item">
        <label class="subscriptionPlan__item-label">Minimum Constraint</label>
        <div class="subscriptionPlan__item-field">
          <input
            class="subscriptionPlan__item-input subscriptionPlan__item-input_borderLeft"
            v-model="promoCodeData.minAmount"
            type="number"
            placeholder="Enter minimum useable amount"
          />
        </div>
      </div>
    </div>

    <div class="subscriptionPlan-footer">
      <div
        @click="editPromocode"
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
import { RiRefreshLine } from '@remixicon/vue';
import DatePickerInput from '../components/DatePickerInput.vue';
import { formatDateFrom } from '../common/utils';

export default {
  name: 'subscriptionPlanItem',
  components: { RiRefreshLine, DatePickerInput },
  props: {
    id: { type: Number },
  },
  setup(props) {
    const promoCodeData = ref({});
    const idPlan = ref(props.id);
    const fetchData = ref({});
    const newPlanData = ref({ duration: 1, discountType: 'count' });
    const router = useRouter();
    const periods = [
      { text: '1 day', value: '1' },
      { text: '30 days', value: '30' },
      { text: '60 days', value: '60' },
      { text: '90 days', value: '90' },
    ];

    const fetchsubscriptionPlanData = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/subscription-promos/${props?.id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
        fetchData.value.expiredAt = formatDateFrom(fetchData.value.expiredAt);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const generateRandomString = (length) => {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    };

    const handleGenetateCode = () => {
      promoCodeData.value.code = `PROMO${generateRandomString(
        8
      ).toUpperCase()}`;
    };

    const editPromocode = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/subscription-promos`;

      try {
        const response = await fetch(url, {
          method: props.id ? 'PUT' : 'POST',
          body: props.id
            ? JSON.stringify(fetchData.value)
            : JSON.stringify(promoCodeData.value),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        router.push('/settings/promo-codes');
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
      editPromocode,
      periods,
      fetchData,
      newPlanData,
      idPlan,
      promoCodeData,
      handleGenetateCode,
      formatDateFrom,
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
      &-date {
        height: 52px;
      }
      &-generate {
        display: flex;
        width: 50px;
        height: 50px;
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 0 4px 4px 0;
        align-items: center;
        justify-content: center;
        &:hover {
          cursor: pointer;
        }
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
    &-select {
      height: 51px;
      width: 77px;
      padding: 4px 8px;
      border-radius: 0 4px 4px 0;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
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
