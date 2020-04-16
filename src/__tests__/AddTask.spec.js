import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { AddTask } from '../components/AddTask'
import { useSelectedProjectValue } from '../context'
import { firebase } from '../firebase'

beforeEach(cleanup) //removes any leftover dom elements ==> cleans the DOM!

jest.mock('../context', ()=> ({
  useSelectedProjectValue: jest.fn(()=>({
    selectedProject: 1
  })),
  useProjectsValue: jest.fn(()=>({
    projects: []
  }))
}))

jest.mock('../firebase', () =>({
  firebase: {
    firestore: jest.fn(()=>({
      collection: jest.fn(()=>({
        //when we add to firebase we are returned a promise so we need to mock a resolved promise
        //mocking firebase is a ball ache
        add: jest.fn(()=> Promise.resolve('Never mock firebase')),
      }))
    })),
  },
}))

describe('<AddTask />', () => {
  afterEach(()=> {
    //after each 
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the <AddTask />', () => {
      const { queryByTestId } = render(<AddTask />)
      expect(queryByTestId('add-task-comp')).toBeTruthy()
    })

    it('renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn()

      const { queryByTestId } = render(
        <AddTask 
          showAddTaskMain 
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />)
      expect(queryByTestId('add-task-comp')).toBeTruthy()
    })

    it('renders the <AddTask /> main showable when clicked', ()=> {
      const { queryByTestId } = render(<AddTask showAddTaskMain/>)

      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('renders the <AddTask /> project overlay when clicked', ()=> {
      const { queryByTestId } = render(<AddTask showAddTaskMain/>)

      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
      
      fireEvent.click(queryByTestId('show-project-overlay'))
      expect(queryByTestId('project-overlay')).toBeTruthy()
    })
  })
})
