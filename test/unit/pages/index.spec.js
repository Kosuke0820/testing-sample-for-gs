import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import index from '~/pages/index'

jest.mock('axios')

const undoneTodo = {
  id: '123',
  title: 'hoge',
  deadline: '2020-09-01',
  isDone: false,
}
const doneTodo = {
  id: '456',
  title: 'fuga',
  deadline: '2020-09-31',
  isDone: true,
}

const todos = [undoneTodo, doneTodo]

describe('index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(index, {
      data: () => ({
        todos,
        isError: false,
      }),
    })
  })

  describe('template', () => {
    describe('error-notify', () => {
      describe('isError が false のとき', () => {
        beforeEach(() => {
          wrapper.setData({ isError: false })
        })

        it('存在しないこと', () => {
          const errorNotify = wrapper.find('.error-notify')
          expect(errorNotify.exists()).toBe(false)
        })
      })

      describe('isError が true のとき', () => {
        beforeEach(() => {
          wrapper.setData({ isError: true })
        })

        it('存在しないこと', () => {
          const errorNotify = wrapper.find('.error-notify')
          expect(errorNotify.exists()).toBe(true)
        })
      })
    })
  })

  describe('asyncData', () => {
    describe('正常系のとき', () => {
      const todos = [
        {
          id: '789',
          title: 'foo',
          deadline: '2020-10-01',
          isDone: false,
        },
      ]
      const response = {
        data: todos,
      }
      beforeEach(() => {
        axios.get = jest.fn().mockResolvedValue(response)
      })

      it('GET リクエストが送信されること', async () => {
        await wrapper.vm.$options.asyncData()
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/todos')
      })

      it('todo と isError が返されること', async () => {
        const returnVal = await wrapper.vm.$options.asyncData()
        expect(returnVal).toEqual({ todos, isError: false })
      })
    })

    describe('異常系のとき', () => {
      beforeEach(() => {
        axios.get = jest.fn().mockRejectedValue()
      })

      it('todo と isError が返されること', async () => {
        const returnVal = await wrapper.vm.$options.asyncData()
        expect(returnVal).toEqual({ todos: [], isError: true })
      })
    })
  })

  describe('computed', () => {
    describe('undoneTodos', () => {
      it('未完了のタスクのみが返されること', () => {
        expect(wrapper.vm.undoneTodos).toEqual([undoneTodo])
      })
    })

    describe('doneTodos', () => {
      it('完了済みのタスクのみが返されること', () => {
        expect(wrapper.vm.doneTodos).toEqual([doneTodo])
      })
    })
  })

  describe('methods', () => {
    describe('addTodo', () => {
      const args = {
        id: '789',
        title: 'foo',
        deadline: '2020-10-01',
        isDone: false,
      }

      beforeEach(() => {
        wrapper.vm.saveTodo = jest.fn()
        wrapper.vm.addTodo(args)
      })

      it('引数の todo が追加されること', () => {
        expect(wrapper.vm.todos).toEqual([...todos, args])
      })

      it('saveTodo が呼ばれること', () => {
        expect(wrapper.vm.saveTodo).toHaveBeenCalled()
      })
    })

    describe('updateDone', () => {
      const args = {
        id: '123',
        isDone: true,
      }

      beforeEach(() => {
        wrapper.vm.updateTodo = jest.fn()
        wrapper.vm.updateDone(args)
      })

      it('指定した todo が完了済みになること', () => {
        expect(wrapper.vm.todos[0].isDone).toBe(true)
      })

      it('updatedTodo が呼ばれること', () => {
        expect(wrapper.vm.updateTodo).toHaveBeenCalled()
      })
    })

    describe('saveTodo', () => {
      const args = {
        id: '789',
        title: 'foo',
        deadline: '2020-10-01',
        isDone: false,
      }

      describe('正常系のとき', () => {
        beforeEach(() => {
          axios.post = jest.fn().mockResolvedValue()
        })

        it('POST リクエストが送信されること', async () => {
          await wrapper.vm.saveTodo(args)
          expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8000/todos',
            args
          )
        })

        it('isError が false に変更されること', async () => {
          wrapper.setData({ isError: true })
          await wrapper.vm.saveTodo(args)
          expect(wrapper.vm.isError).toBe(false)
        })
      })

      describe('異常系のとき', () => {
        beforeEach(() => {
          axios.post = jest.fn().mockRejectedValue()
        })

        it('isError が true に変更されること', async () => {
          wrapper.setData({ isError: false })
          await wrapper.vm.saveTodo(args)
          expect(wrapper.vm.isError).toBe(true)
        })
      })
    })

    describe('updateTodo', () => {
      const args = {
        id: '789',
        title: 'foo',
        deadline: '2020-10-01',
        isDone: false,
      }

      describe('正常系のとき', () => {
        beforeEach(() => {
          axios.put = jest.fn().mockResolvedValue()
        })

        it('PUT リクエストが送信されること', async () => {
          await wrapper.vm.updateTodo(args)
          expect(axios.put).toHaveBeenCalledWith(
            'http://localhost:8000/todos/789',
            args
          )
        })

        it('isError が false に変更されること', async () => {
          wrapper.setData({ isError: true })
          await wrapper.vm.updateTodo(args)
          expect(wrapper.vm.isError).toBe(false)
        })
      })

      describe('異常系のとき', () => {
        beforeEach(() => {
          axios.put = jest.fn().mockRejectedValue()
        })

        it('isError が true に変更されること', async () => {
          wrapper.setData({ isError: false })
          await wrapper.vm.updateTodo(args)
          expect(wrapper.vm.isError).toBe(true)
        })
      })
    })
  })
})
