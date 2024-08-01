<template>
  <div class="datePicker">
    <input
      class="datePicker__input"
      ref="datepickerInput"
      type="text"
      v-model="formattedDate"
      @input="updateDate"
      placeholder="By date range"
    />
    <span class="datePicker__icon">
      <RiCalendarLine :size="20" />
    </span>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { RiCalendarLine } from '@remixicon/vue';

export default {
  name: 'DatePickerInput',
  components: { RiCalendarLine },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    selectedDates: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const formattedDate = ref(props.modelValue);
    const datepicker = ref(null);
    const datepickerInput = ref(null);
    const selectedDates = ref(props.selectedDates);

    const updateDate = () => {
      emit('update:modelValue', formattedDate.value);
    };

    const formatDateString = (date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;
    };

    onMounted(() => {
      datepicker.value = flatpickr(datepickerInput.value, {
        mode: 'range',
        dateFormat: 'Y-m-d',
        onChange: (dates) => {
          if (dates.length === 2) {
            const [startDate, endDate] = dates.map(formatDateString);
            selectedDates.value[0] = startDate;
            selectedDates.value[1] = endDate;
            formattedDate.value = `${startDate} to ${endDate}`;
          } else if (dates.length === 0) {
            delete selectedDates.value[0];
            delete selectedDates.value[1];
            formattedDate.value = '';
          }
          updateDate();
        },
      });
    });

    onBeforeUnmount(() => {
      if (datepicker.value) {
        datepicker.value.destroy();
      }
    });

    return {
      formattedDate,
      datepickerInput,
    };
  },
};
</script>

<style scoped lang="scss">
.datePicker {
  display: flex;
  &__input {
    appearance: none;
    border-radius: 6px 0px 0px 6px;
    border: 1px solid #e5e7eb;
    background-color: #f9fafb;
    padding: 6px 16px;
    width: 233px;
    font-size: 16px;
  }
  &__icon {
    border-radius: 0 6px 6px 0px;
    border: 1px solid #e5e7eb;
    background-color: #f9fafb;
    padding: 6px 12px;
    display: flex;
    align-items: center;
  }
}
</style>
