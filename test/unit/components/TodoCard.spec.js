import { shallowMount } from '@vue/test-utils'
import TodoCard from '~/components/TodoCard'

const todo = {
  id: '123',
  title: 'hoge',
  deadline: '2020-09-01',
  isDone: false,
}

describe('TodoCard', () => {
  describe('template', () => {
    describe('.todo-card ', () => {
      it('todo が完了済みのとき、is-done class が付与されていること', () => {
        const wrapper = shallowMount(TodoCard, {
          propsData: {
            todo: {
              ...todo,
              isDone: true,
            },
          },
        })
        const todoCard = wrapper.find('.todo-card')
        expect(todoCard.classes()).toContain('is-done')
      })

      it('todo が完了済みのとき、is-done class が付与されていないこと', () => {
        const wrapper = shallowMount(TodoCard, {
          propsData: {
            todo: {
              ...todo,
              isDone: false,
            },
          },
        })
        const todoCard = wrapper.find('.todo-card')
        expect(todoCard.classes()).not.toContain('is-done')
      })
    })
  })

  describe('computed', () => {
    describe('checkboxLabel', () => {
      it('todo が完了済みのとき、Undone を返すこと', () => {
        const wrapper = shallowMount(TodoCard, {
          propsData: {
            todo: {
              ...todo,
              isDone: true,
            },
          },
        })
        expect(wrapper.vm.checkboxLabel).toBe('Undone')
      })

      it('todo が未完了のとき、Undone を返すこと', () => {
        const wrapper = shallowMount(TodoCard, {
          propsData: {
            todo: {
              ...todo,
              isDone: false,
            },
          },
        })
        expect(wrapper.vm.checkboxLabel).toBe('Done')
      })
    })
  })

  describe('methods', () => {
    describe('handleChange', () => {
      const event = {
        target: {
          checked: true,
        },
      }

      it('todo.isDone が変更されること', () => {
        const wrapper = shallowMount(TodoCard, {
          propsData: {
            todo,
          },
        })
        wrapper.vm.handleChange(event)
        expect(wrapper.vm.todo.isDone).toBe(true)
      })

      it('updateDone が emit されること', () => {
        const wrapper = shallowMount(TodoCard, {
          propsData: {
            todo,
          },
        })
        wrapper.vm.handleChange(event)
        expect(wrapper.emitted('updateDone')[0][0]).toEqual({
          id: '123',
          isDone: true,
        })
      })
    })
  })
})
