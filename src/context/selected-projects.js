import React, { createContext, useContext, useState } from 'react';

// Context has a provider (top level) and consumer (bottom level) to avoid passing data
// through lots of levels of props. 

// Context is required in this project as there is multiple ways to add tasks so you dont 
// want to pass it down through props for all those. 

//create my lovely context
export const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({children}) => {
  const [selectedProject, setSelectedProject] = useState('INBOX')
  return (
    //pass in an object of values so i can pick out the value i want
    <SelectedProjectContext.Provider value={{selectedProject, setSelectedProject}}>
      {children}
    </SelectedProjectContext.Provider>
  )
}

//create a noice function so i dont have to import useContext each time i want to call it
export const useSelectedProjectValue = () => useContext(SelectedProjectContext)

//use example 
//const { selectedProject } = useSelectedProjectValue()