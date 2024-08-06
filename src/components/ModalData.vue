<template>
  <div @click="handleCloseModal($event)" class="modal__overlay">
    <div class="modal">
      <div class="modal-header">
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <SubscriptionTransactionDetail v-if="item" :subscription="item" />
      <div class="modal-body">{{ text }}</div>
      <slot name="modal-input"></slot>

      <div class="modal-footer">
        <slot name="modal-buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionTransactionDetail from './SubscriptionTransactionDetail.vue';

export default {
  name: 'ModalData',
  components: { SubscriptionTransactionDetail },
  props: {
    title: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
    },
    text: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const handleCloseModal = (event) => {
      if (event.target.className !== 'modal__overlay') {
        event.stopPropagation();
      } else {
        console.log(event.target.className);
        emit('closeModal');
      }
    };
    return { handleCloseModal };
  },
};
</script>
<style scoped lang="scss">
.modal {
  max-height: calc(100% - 56px);
  height: auto;
  width: 500px;
  max-width: 500px;
  gap: 12px;
  margin: 28px auto;
  background-color: #ffffff;
  border-radius: 8px;
  &__overlay {
    background-color: rgb(18, 18, 18, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  &-header {
    padding: 16px;
    font-size: 24px;
    margin: 0;
    border-bottom: 1px solid #dee2e6;
  }
  &-title {
    margin: 0;
  }
  &-body {
    padding: 16px;
  }
  &-footer {
    border-top: 1px solid #dee2e6;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }
  &-close {
    appearance: none;
    font-size: 16px;
    padding: 6px 12px;
    border: none;
    background-color: #c9c9c9;
    border-radius: 6px;
    height: 38px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
