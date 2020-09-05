<template>
  <div class="wrapper">
    <MainHeader />
    <div class="container">
      <p v-if="isError" class="error-notify">通信エラー 再度お試しください</p>
      <div class="input-container">
        <AddTodoForm @addTodo="addTodo" />
      </div>
      <div class="list-container">
        <TodoList title="Todo" :todos="undoneTodos" @updateDone="updateDone" />
        <TodoList title="Done" :todos="doneTodos" @updateDone="updateDone" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MainHeader from '~/components/MainHeader'
import AddTodoForm from '~/components/AddTodoForm'
import TodoList from '~/components/TodoList'
export default {
  components: {
    MainHeader,
    AddTodoForm,
    TodoList,
  },
  async asyncData() {
    let todos = []
    let isError = false
    try {
      const response = await axios.get('http://localhost:8000/todos')
      todos = response.data
    } catch {
      isError = true
    }
    return {
      todos,
      isError,
    }
  },
  computed: {
    undoneTodos() {
      return this.todos.filter((todo) => !todo.isDone)
    },
    doneTodos() {
      return this.todos.filter((todo) => todo.isDone)
    },
  },
  methods: {
    addTodo(todo) {
      this.todos = [...this.todos, todo]
      this.saveTodo(todo)
    },
    updateDone({ id, isDone }) {
      const targetIndex = this.todos.findIndex((todo) => todo.id === id)
      const todo = this.todos[targetIndex]
      this.$set(todo, 'isDone', isDone)
      this.updateTodo(todo)
    },
    async saveTodo(todo) {
      try {
        await axios.post('http://localhost:8000/todos', todo)
        this.isError = false
      } catch {
        this.isError = true
      }
    },
    async updateTodo(todo) {
      try {
        await axios.put(`http://localhost:8000/todos/${todo.id}`, todo)
        this.isError = false
      } catch {
        this.isError = true
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 920px;
  margin: 0 auto 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.error-notify {
  color: white;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  width: 100%;
  height: 40px;
  background: rgb(250, 71, 71);
  border-radius: 4px;
  margin-top: 40px;
}

.input-container {
  margin-top: 40px;
}

.list-container {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  flex: 1;
  overflow: hidden;
}
</style>
