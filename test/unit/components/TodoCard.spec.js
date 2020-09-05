import { shallowMount } from '@vue/test-utils'
import TodoCard from '~/components/TodoCard'

const todo = {
  id: '123',
  title: 'hoge',
  deadline: '2020-09-01',
  isDone: false,
}

describe('TodoCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(TodoCard, {
      propsData: {
        todo,
      },
    })
  })

  describe('template', () => {
    describe('.title', () => {
      it('todo.title が表示されていること', () => {
        const title = wrapper.find('.title')
        expect(title.text()).toBe('hoge')
      })
    })

    describe('.todo-card ', () => {
      describe('todo が完了済みのとき', () => {
        beforeEach(() => {
          wrapper.setProps({
            todo: {
              ...todo,
              isDone: true,
            },
          })
        })

        it('is-done class が付与されていること', () => {
          const todoCard = wrapper.find('.todo-card')
          expect(todoCard.classes()).toContain('is-done')
        })
      })

      describe('todo が完了済みのとき', () => {
        beforeEach(() => {
          wrapper.setProps({
            todo: {
              ...todo,
              isDone: false,
            },
          })
        })

        it('is-done class が付与されていないこと', () => {
          const todoCard = wrapper.find('.todo-card')
          expect(todoCard.classes()).not.toContain('is-done')
        })
      })
    })

    describe('input[type=checkbox]', () => {
      it('chenge event の発火で handleChange メソッドが呼ばれること', () => {
        const handleChangeSpy = jest.spyOn(TodoCard.methods, 'handleChange')
        wrapper = shallowMount(TodoCard, {
          propsData: {
            todo,
          },
        })
        const input = wrapper.find('input')
        input.setChecked(true)
        expect(handleChangeSpy).toHaveBeenCalled()
      })
    })
  })

  describe('computed', () => {
    describe('checkboxLabel', () => {
      describe('todo が完了済みのとき', () => {
        beforeEach(() => {
          wrapper.setProps({
            todo: {
              ...todo,
              isDone: true,
            },
          })
        })

        it('Undone を返すこと', () => {
          expect(wrapper.vm.checkboxLabel).toBe('Undone')
        })
      })

      describe('todo が未完了のとき', () => {
        beforeEach(() => {
          wrapper.setProps({
            todo: {
              ...todo,
              isDone: false,
            },
          })
        })

        it('Undone を返すこと', () => {
          expect(wrapper.vm.checkboxLabel).toBe('Done')
        })
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

      beforeEach(() => {
        wrapper.vm.handleChange(event)
      })

      it('todo.isDone が変更されること', () => {
        expect(wrapper.vm.todo.isDone).toBe(true)
      })

      it('updateDone が emit されること', () => {
        expect(wrapper.emitted('updateDone')[0][0]).toEqual({
          id: '123',
          isDone: true,
        })
      })
    })
  })
})
