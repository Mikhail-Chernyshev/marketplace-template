<template>
  <div class="modal-body">
    <div class="modal-body-column">
      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Subscribe by</h3>
        <p class="modal-body-item-value">{{ subscription?.shop?.name }}</p>
      </div>
      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Subscription plan</h3>
        <p class="modal-body-item-value">{{ subscription?.title }}</p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Duration</h3>
        <p class="modal-body-item-value">{{ subscription?.duration }}</p>
      </div>
      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Promo code</h3>
        <p class="modal-body-item-value">{{ subscription?.promoCode }}</p>
      </div>
      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Subtotal price</h3>
        <p class="modal-body-item-value">
          {{ subscription?.subTotalPrice / 1000 + ',000' }}
        </p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Discount</h3>
        <p class="modal-body-item-value danger">
          -{{ subscription.discount / 1000 + ',000' }}
        </p>
      </div>
      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Total price</h3>
        <p class="modal-body-item-value">
          {{ subscription?.totalPrice / 1000 + ',000' }}
        </p>
      </div>
    </div>
    <div class="modal-body-column">
      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Status</h3>
        <small
          v-if="subscription.status === 'SUCCESS'"
          class="modal-body-item-value modal-body-item-value_approved"
        >
          {{ subscription.status }}
        </small>
        <small
          v-else-if="subscription.status === 'PENDING'"
          class="modal-body-item-value modal-body-item-value_pending"
        >
          {{ subscription.status }}
        </small>
        <small
          v-else-if="subscription.status === 'FAILURE'"
          class="modal-body-item-value modal-body-item-value_disabled"
        >
          {{ subscription.status }}
        </small>
        <span v-else class="modal-body-item-value">{{
          subscription.status
        }}</span>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Invoice no</h3>
        <p class="modal-body-item-value">{{ subscription?.invoiceNo }}</p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Trans ref</h3>
        <p class="modal-body-item-value">{{ fetchData?.tranRef }}</p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Reference no</h3>
        <p class="modal-body-item-value">{{ fetchData?.referenceNo }}</p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Agent code</h3>
        <p class="modal-body-item-value">{{ fetchData?.agentCode }}</p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Channel code</h3>
        <p class="modal-body-item-value">{{ fetchData?.channelCode }}</p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Issued at</h3>
        <p class="modal-body-item-value">
          {{
            fetchData?.transactionDateTime
              ? dayjs(fetchData.transactionDateTime, 'YYYYMMDDHHmmss').format(
                  'MMM DD, YYYY hh:mm A'
                )
              : formatTimestamp(subscription?.audit?.createdAt, true)
          }}
        </p>
      </div>

      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Resp code</h3>
        <p class="modal-body-item-value">{{ fetchData?.respCode }}</p>
      </div>
      <div class="modal-body-item">
        <h3 class="modal-body-item-title">Resp desc</h3>
        <p class="modal-body-item-value">{{ fetchData?.respDesc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { formatTimestamp } from '../common/utils';

export default {
  name: 'SubscriptionTransactionDetail',
  props: {
    subscription: {
      type: Object,
    },
  },
  setup(props) {
    const fetchData = ref({});

    const fetchSubscriptionTransaction = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/shop-subscriptions/${props.subscription.invoiceNo}/transaction`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        fetchData.value = [];
      }
    };

    onMounted(() => {
      fetchSubscriptionTransaction();
    });

    return {
      formatTimestamp,
      fetchData,
    };
  },
};
</script>
<style scoped lang="scss">
.modal-body {
  display: flex;
  padding: 16px;
  gap: 12px;

  &-column {
    width: 50%;
  }
  &-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    &-title {
      margin: 0;
      font-size: 16px;
      font-weight: 900;
    }
    &-value {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      &_approved {
        color: #00a524;
      }
      &_disabled {
        color: #d50002;
      }
      &_pending {
        color: #ff9017;
      }
    }
  }
}
.danger {
  color: #d50002;
}
</style>
