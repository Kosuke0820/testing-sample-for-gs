describe('TodoCard', () => {
  describe('template', () => {
    describe('.title', () => {
      it('todo.title が表示されていること', () => {})
    })

    describe('.todo-card ', () => {
      describe('todo が完了済みのとき', () => {
        it('is-done class が付与されていること', () => {})
      })

      describe('todo が完了済みのとき', () => {
        it('is-done class が付与されていないこと', () => {})
      })
    })

    describe('input[type=checkbox]', () => {
      it('chenge event の発火で handleChange メソッドが呼ばれること', () => {})
    })
  })

  describe('computed', () => {
    describe('checkboxLabel', () => {
      describe('todo が完了済みのとき', () => {
        it('Undone を返すこと', () => {})
      })

      describe('todo が未完了のとき', () => {
        it('Undone を返すこと', () => {})
      })
    })
  })

  describe('methods', () => {
    describe('handleChange', () => {
      it('todo.isDone が変更されること', () => {})

      it('updateDone が emit されること', () => {})
    })
  })
})
