<template>
  <div>
    <div class="form-container">
      <input v-model.trim="title" class="title-input" type="text" />
      <input v-model="deadline" class="deadline-input" type="date" />
      <button @click="addTodo">追加</button>
    </div>
    <p v-show="validateError" class="error-message">内容を入力してください</p>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'AddTodoForm',
  data: () => ({
    title: '',
    deadline: '',
    validateError: false,
  }),
  methods: {
    init() {
      this.title = ''
      this.deadline = ''
    },
    addTodo() {
      // バリデーションチェック
      if (!this.title || !this.deadline) {
        this.validateError = true
        return
      }
      this.validateError = false

      // Todo追加のemitを発火
      this.$emit('addTodo', {
        title: this.title,
        deadline: this.deadline,
        id: uuidv4(),
        isDone: false,
      })

      // フォームを初期化する
      this.init()
    },
  },
}
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
}
.title-input {
  flex: 1;
  height: 36px;
  padding: 0 8px;
  letter-spacing: 0.4px;
}

.deadline-input {
  padding: 0 8px;
  height: 36px;
  letter-spacing: 0.4px;
  margin-left: 16px;
}

button {
  height: 36px;
  padding: 0 16px;
  background: steelblue; /*ボタン色*/
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  border: none;
  margin-left: 16px;
  transition: ease 0.3s;
}

button:hover {
  opacity: 0.7;
}

.error-message {
  color: red;
  margin-top: 8px;
}
</style>
