//CUSTOM HOOKS = BUILD YOUR OWN FUNCITON AND USE USESTATE METHOD HOLD THE DATA

import { useState, useEffect } from 'react'
//set up all the firebase config and then exported it as firebase
import { firebase } from '../firebase'
import { collatedTasksExist } from '../helpers/index'
//lib to handle dates and timezones
import moment from 'moment'


//this is constantly checking for new tasks
export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTask] = useState([])

  useEffect(() => {
    // using firebase methods --> go get the tasks from the firestore db where userId === 12345
    //called unsubcribe to prevent constantly going back and forth for everything
    //uses REALTIME DB
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', '12345')

    //nested ternary :( but i think this formatting is pretty good. 
    //@TODO what is the pupose of this?
    unsubscribe = 
      selectedProject && !collatedTasksExist(selectedProject) ? 
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject)
        : selectedProject === 'TODAY' ?
          (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
          : selectedProject === 'INBOX' || selectedProject === 0 ?
            (unsubscribe = unsubscribe.where('date', '==', ''))
            : unsubscribe

    //using firebase's onSnapshot to get info from firestore docs-- looks like its an array of objects
    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }))

      //filter to only show tasks that appear in next 7 days
      setTasks(
        selectedProject === 'NEXT_7' ? 
          newTasks.filter(
            task => moment(task.date, 'DD-MM-YYY').diff(moment(), 'days') <= 7 && task.archived !== true
          )
          : newTasks.filter(task => task.archived !== true)
      )

      setArchivedTask(newTasks.filter(task => task.archived !== false))
    
    })
    //use effect returns a called function
    return () => unsubscribe()

  }, [selectedProject])

  //this custom hook return the value and the means to set it in an object
  return { tasks, archivedTasks }
}


//this only grabs projects once
export const useProjects = () => {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    firebase
    .firestore()
    .collection('projects')
    .where('userId', '==', '12345')
    .orderBy('projectId')
    //use get as only gets projects once
    .get()
    .then(snapshot => {
      const allProjects = snapshot.docs.map(project => ({
        ...project.data(),
        docId: project.id
      }))
      //want to run this when projects changes but to avoid getting in a loop
      //only call setProjects when projects changes - stringify it to compare prims
      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects)
      }
    })
  }, [projects])
  
  //this custom hook return sthe value and the means to set it in an object
  return { projects, setProjects }
}