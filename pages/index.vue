<template>
  <div class="wrapper">
    <MainHeader />
    <div class="container">
      <p v-if="isError" class="error-notify">通信エラー 再度お試しください</p>
      <div class="input-container">
        <AddTodoForm @addTodo="addTodo" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MainHeader from '~/components/MainHeader'
import AddTodoForm from '~/components/AddTodoForm'
export default {
  components: {
    MainHeader,
    AddTodoForm,
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
  methods: {
    addTodo(todo) {
      this.todos.push(todo)
      this.saveTodo(todo)
    },
    async saveTodo(todo) {
      try {
        this.isError = false
        await axios.post('http://localhost:8000/todos', todo)
      } catch {
        this.isError = true
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  padding-top: 56px;
}

.container {
  width: 920px;
  margin: 0 auto;
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
</style>
