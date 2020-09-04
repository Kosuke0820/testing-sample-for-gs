<template>
  <div class="todo-card" :class="{ 'is-done': todo.isDone }">
    <p class="title">{{ todo.title }}</p>
    <div class="options">
      <p class="deadline">
        <img src="~/assets/icons/time.svg" alt="" />
        ~{{ formattedDeadline }}
      </p>
      <input
        :id="todo.id"
        type="checkbox"
        :checked="todo.isDone"
        @change="handleChange"
      />
      <label :for="todo.id" class="checkbox"> {{ checkboxLabel }} </label>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export default {
  name: 'TodoCard',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDeadline() {
      const deadline = dayjs(this.todo.deadline)
      if (deadline.isToday()) return 'Today'
      if (deadline.isTomorrow()) return 'Tomorrow'
      return this.todo.deadline
    },
    checkboxLabel() {
      return this.todo.isDone ? 'Undone' : 'Done'
    },
  },
  methods: {
    handleChange(e) {
      this.todo.isDone = e.target.value
      this.$emit('updateDone', { id: this.todo.id, isDone: e.target.checked })
    },
  },
}
</script>

<style scoped>
.todo-card {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid rgb(222, 222, 222);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.4px;
  line-height: 1.5;
  word-break: break-all;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

img {
  width: 16px;
  position: relative;
  top: 2px;
  margin-right: 2px;
}

input[type='checkbox'] {
  display: none;
}

.checkbox {
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  padding: 5px 30px;
  position: relative;
  width: auto;
}

.checkbox::before {
  background: #fff;
  border: 1px solid #a2a2a2;
  content: '';
  display: block;
  left: 5px;
  margin-top: -8px;
  position: absolute;
  top: 50%;
  height: 18px;
  width: 18px;
  border-radius: 4px;
}

.checkbox::after {
  border-right: 3px solid steelblue;
  border-bottom: 3px solid steelblue;
  content: '';
  display: block;
  height: 12px;
  left: 11px;
  margin-top: -7px;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: rotate(45deg);
  width: 7px;
}
input[type='checkbox']:checked + .checkbox::after {
  opacity: 1;
}

.is-done {
  opacity: 0.4;
}
</style>
