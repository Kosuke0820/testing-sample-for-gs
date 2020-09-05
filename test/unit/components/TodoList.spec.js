import { shallowMount } from '@vue/test-utils'
import TodoList from '~/components/TodoList'

describe('TodoList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(TodoList, {
      propsData: {
        title: 'hoge',
        todos: [
          {
            id: '123',
            title: 'fuga',
            deadline: '2020-09-01',
            isDone: false,
          },
        ],
      },
    })
  })

  describe('template', () => {
    describe('h2', () => {
      it('title props の値が表示されていること', () => {
        const h2 = wrapper.find('h2')
        expect(h2.text()).toBe('hoge')
      })
    })
  })

  describe('methods', () => {
    describe('updateDone', () => {
      it('updateDone が emit されること', () => {
        const args = { id: '123', isDone: true }
        wrapper.vm.updateDone(args)
        expect(wrapper.emitted('updateDone')[0][0]).toEqual(args)
      })
    })
  })
})
