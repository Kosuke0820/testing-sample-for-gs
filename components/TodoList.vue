<template>
  <div class="todo-list">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <TodoCard :todo="todo" @updateDone="updateDone" />
      </li>
    </ul>
  </div>
</template>

<script>
import TodoCard from '~/components/TodoCard'

export default {
  name: 'TodoList',
  components: {
    TodoCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateDone(value) {
      this.$emit('updateDone', value)
    },
  },
}
</script>

<style scoped>
.todo-list {
  width: 48%;
  background: ghostwhite;
  border: 1px solid rgb(222, 222, 222);
  border-radius: 6px;
  padding: 16px 12px 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
}

ul {
  flex: 1;
  overflow-y: auto;
}

li:not(:first-child) {
  margin-top: 8px;
}
</style>
