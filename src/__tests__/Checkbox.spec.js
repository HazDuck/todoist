import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Checkbox } from '../components/Checkbox'


beforeEach(cleanup) //removes any leftover dom elements ==> cleans the DOM!

// mocking = faking a file, function, db so you can test e.g. a fake version of firebase

//there is apparently a nice module to mock firebase for us but here we are doing it manually
//basically we are returning the firebase object that contains a funciton for each of the 
//functions that we ue when calling firebase in react - we are just faking these :)
jest.mock('../firebase', () =>({
  firebase: {
    firestore: jest.fn(()=>({
      collection: jest.fn(()=>({
        doc: jest.fn(()=> ({
          update: jest.fn()
        })),
      }))
    })),
  },
}))

describe('<Checkbox/>', ()=> {
  describe('Success', ()=> {
    it('renders the task checkbox', ()=>{
      const { queryByTestId, debug } = render(<Checkbox id="1"/>)

      //renders out the full component in the console
      // debug()

      //checks that the componen
      expect(queryByTestId('checkbox-action')).toBeTruthy()
    })
    describe('renders the tasks checkbox and accepts a click', ()=> {
      const { queryByTestId, debug } = render(<Checkbox id="1"/>)
      expect(queryByTestId('checkbox-action')).toBeTruthy()
      fireEvent.click(queryByTestId('checkbox-action'))
    })
  })
})

