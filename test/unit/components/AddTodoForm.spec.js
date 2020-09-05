describe('AddTodoForm', () => {
  describe('template', () => {
    describe('title input', () => {
      it('入力内容が trim されて title に反映されること', () => {})
    })

    describe('deadline input', () => {
      it('入力内容が deadline に反映されること', () => {})
    })

    describe('button', () => {
      it('addTodo メソッドが呼ばれること', () => {})
    })

    describe('error-message', () => {
      describe('validateError が false のとき', () => {
        it('表示されないこと', () => {})
      })

      describe('validateError が true のとき', () => {
        it('表示されること', () => {})
      })
    })
  })

  describe('methods', () => {
    describe('init', () => {
      it('title と deadlint がリセットされること', () => {})
    })

    describe('addTodo', () => {
      describe('title が空文字のとき', () => {
        it('validateError が true に変更されること', () => {})

        it('addTodo emit が呼ばれないこと', () => {})

        it('init が呼ばれないこと', () => {})
      })

      describe('deadline が空文字のとき', () => {
        it('validateError が true に変更されること', () => {})

        it('addTodo emit が呼ばれないこと', () => {})

        it('init が呼ばれないこと', () => {})
      })

      describe('title と deadline が空文字ではないとき', () => {
        it('validateError が false に変更されること', () => {})

        it('addTodo emit が呼ばれること', () => {})

        it('init が呼ばれること', () => {})
      })
    })
  })
})
