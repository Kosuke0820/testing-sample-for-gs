import { shallowMount } from '@vue/test-utils'
import { toBeVisible } from '@testing-library/jest-dom/matchers'
import AddTodoForm from '~/components/AddTodoForm'

expect.extend({ toBeVisible })

jest.mock('uuid', () => ({
  v4: () => '123',
}))

describe('AddTodoForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AddTodoForm)
  })

  describe('template', () => {
    describe('title input', () => {
      it('入力内容が trim されて title に反映されること', () => {
        const input = wrapper.find('.title-input')
        input.setValue(' hoge ')
        expect(wrapper.vm.title).toBe('hoge')
      })
    })

    describe('deadline input', () => {
      it('入力内容が deadline に反映されること', () => {
        const input = wrapper.find('.deadline-input')
        input.setValue('2020-09-01')
        expect(wrapper.vm.deadline).toBe('2020-09-01')
      })
    })

    describe('button', () => {
      it('addTodo メソッドが呼ばれること', () => {
        const addTodoSpy = jest.spyOn(AddTodoForm.methods, 'addTodo')
        wrapper = shallowMount(AddTodoForm)
        const button = wrapper.find('button')
        button.trigger('click')
        expect(addTodoSpy).toHaveBeenCalled()
      })
    })

    describe('error-message', () => {
      describe('validateError が false のとき', () => {
        beforeEach(() => {
          wrapper.setData({ validateError: false })
        })

        it('表示されないこと', () => {
          const errorMessage = wrapper.find('.error-message')
          expect(errorMessage.element).not.toBeVisible()
        })
      })

      describe('validateError が true のとき', () => {
        beforeEach(() => {
          wrapper.setData({ validateError: true })
        })

        it('表示されること', () => {
          const errorMessage = wrapper.find('.error-message')
          expect(errorMessage.element).toBeVisible()
        })
      })
    })
  })

  describe('methods', () => {
    describe('init', () => {
      it('title と deadlint がリセットされること', () => {
        wrapper = shallowMount(AddTodoForm, {
          data: () => ({
            title: 'hoge',
            deadline: '2020-09-01',
          }),
        })
        wrapper.vm.init()
        expect(wrapper.vm.title).toBe('')
        expect(wrapper.vm.deadline).toBe('')
      })
    })

    describe('addTodo', () => {
      describe('title が空文字のとき', () => {
        beforeEach(() => {
          wrapper = shallowMount(AddTodoForm, {
            data: () => ({
              title: '',
              deadline: '2020-09-01',
            }),
          })
          wrapper.vm.init = jest.fn()
          wrapper.vm.addTodo()
        })

        it('validateError が true に変更されること', () => {
          expect(wrapper.vm.validateError).toBe(true)
        })

        it('addTodo emit が呼ばれないこと', () => {
          expect(wrapper.emitted('addTodo')).toBeUndefined()
        })

        it('init が呼ばれないこと', () => {
          expect(wrapper.vm.init).not.toHaveBeenCalled()
        })
      })

      describe('deadline が空文字のとき', () => {
        beforeEach(() => {
          wrapper = shallowMount(AddTodoForm, {
            data: () => ({
              title: 'hoge',
              deadline: '',
            }),
          })
          wrapper.vm.init = jest.fn()
          wrapper.vm.addTodo()
        })

        it('validateError が true に変更されること', () => {
          expect(wrapper.vm.validateError).toBe(true)
        })

        it('addTodo emit が呼ばれないこと', () => {
          expect(wrapper.emitted('addTodo')).toBeUndefined()
        })

        it('init が呼ばれないこと', () => {
          expect(wrapper.vm.init).not.toHaveBeenCalled()
        })
      })

      describe('title と deadline が空文字ではないとき', () => {
        beforeEach(() => {
          wrapper = shallowMount(AddTodoForm, {
            data: () => ({
              title: 'hoge',
              deadline: '2020-09-01',
              validateError: true,
            }),
          })
          wrapper.vm.init = jest.fn()
          wrapper.vm.addTodo()
        })

        it('validateError が false に変更されること', () => {
          expect(wrapper.vm.validateError).toBe(false)
        })

        it('addTodo emit が呼ばれること', () => {
          expect(wrapper.emitted('addTodo')[0][0]).toEqual({
            title: 'hoge',
            deadline: '2020-09-01',
            id: '123',
            isDone: false,
          })
        })

        it('init が呼ばれること', () => {
          expect(wrapper.vm.init).toHaveBeenCalled()
        })
      })
    })
  })
})
