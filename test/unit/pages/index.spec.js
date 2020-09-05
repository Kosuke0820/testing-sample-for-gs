import { shallowMount } from '@vue/test-utils'
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
  describe('methods', () => {
    describe('addTodo', () => {
      const args = {
        id: '789',
        title: 'foo',
        deadline: '2020-10-01',
        isDone: false,
      }

      const options = {
        data: () => ({
          todos,
          isError: false,
        }),
      }

      it('引数の todo が追加されること', () => {
        const wrapper = shallowMount(index, options)
        wrapper.vm.saveTodo = jest.fn()
        wrapper.vm.addTodo(args)
        expect(wrapper.vm.todos).toEqual([...todos, args])
      })

      it('saveTodo が呼ばれること', () => {
        const wrapper = shallowMount(index, options)
        wrapper.vm.saveTodo = jest.fn()
        wrapper.vm.addTodo(args)
        expect(wrapper.vm.saveTodo).toHaveBeenCalled()
      })
    })
  })
})
