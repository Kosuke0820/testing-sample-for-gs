describe('TodoCard', () => {
  describe('template', () => {
    describe('.todo-card ', () => {
      it('todo が完了済みのとき、is-done class が付与されていること', () => {})

      it('todo が完了済みのとき、is-done class が付与されていないこと', () => {})
    })
  })

  describe('computed', () => {
    describe('checkboxLabel', () => {
      it('todo が完了済みのとき、Undone を返すこと', () => {})

      it('todo が未完了のとき、Undone を返すこと', () => {})
    })
  })

  describe('methods', () => {
    describe('handleChange', () => {
      it('todo.isDone が変更されること', () => {})

      it('updateDone が emit されること', () => {})
    })
  })
})
