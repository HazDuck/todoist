import React, { createContext, useContext } from 'react';
import { useProjects } from '../hooks'

// Context has a provider (top level) and consumer (bottom level) to avoid passing data
// through lots of levels of props. 

//BASICALLY CALL USECONTEXT TO ACCESS THE PROVIDERS VALUES FROM ANYTHING WRAPPED IN
//THE PROVIDER

// Context is required in this project as there is multiple ways to add tasks so you dont 
// want to pass it down through props for all those. 

export const ProjectsContext = createContext();

export const ProjectsProvider = ({children}) => {
  //call custom hook to make accessible from the context's provider
  const { projects, setProjects } = useProjects()
  
  return (
    //pass in an object of values so i can pick out the value i want
    <ProjectsContext.Provider value={{projects, setProjects}}>
      {children}
    </ProjectsContext.Provider>
  )
}

//create a noice function so i dont have to import useContext each time i want to call it
export const useProjectsValue = () => useContext(ProjectsContext)

//use example 
//const { projects } = useProjectsValue()