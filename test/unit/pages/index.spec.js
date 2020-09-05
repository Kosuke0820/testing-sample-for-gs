describe('index', () => {
  describe('template', () => {
    describe('error-notify', () => {
      describe('isError が false のとき', () => {
        it('存在しないこと', () => {})
      })

      describe('isError が true のとき', () => {
        it('存在しないこと', () => {})
      })
    })
  })

  describe('asyncData', () => {
    describe('正常系のとき', () => {})

    describe('異常系のとき', () => {})
  })

  describe('computed', () => {
    describe('undoneTodos', () => {})

    describe('doneTodos', () => {})
  })

  describe('methods', () => {
    describe('addTodo', () => {
      it('引数の todo が追加されること', () => {})

      it('saveTodo が呼ばれること', () => {})
    })

    describe('updateDone', () => {
      it('指定した todo が完了済みになること', () => {})

      it('updatedTodo が呼ばれること', () => {})
    })

    describe('saveTodo', () => {
      describe('正常系のとき', () => {
        beforeEach(() => {})

        it('POST リクエストが送信されること', () => {})

        it('isError が false に変更されること', () => {})
      })

      describe('異常系のとき', () => {
        it('isError が true に変更されること', () => {})
      })
    })

    describe('updateTodo', () => {
      describe('正常系のとき', () => {
        it('PUT リクエストが送信されること', () => {})

        it('isError が false に変更されること', () => {})
      })

      describe('異常系のとき', () => {
        it('isError が true に変更されること', () => {})
      })
    })
  })
})
