import React, { useState } from 'react';
import { firebase } from '../firebase'
import { generatePushId } from '../helpers'
import { useProjectsValue } from '../context'

export const AddProject = ({ shouldShow = false }) => {

  const [projectName, setProjectName] = useState('')
  const [show, setShow] = useState(shouldShow)
  const { setProjects } = useProjectsValue()
  const projectId = generatePushId() 

  const addProject = () => 
    projectName &&
      firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: '12345'
      })
      .then(()=> {
        //trick to call firebase and pass it an empty to kick everything off
        setProjects([])
        setProjectName('')
        setShow(false)
      })

      console.log(show, 'show')
  //remember this is how you do a react form! as i always forget
  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            onClick={()=> {
              addProject()
              setShow(!show)
              }
            }
            type="button"
            data-testid="add-project-submit"
          >
            Add project
          </button>
          <span
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={()=> setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
        <span 
        className="add-project__plus"
        onClick={()=> {
          console.log(show)
          setShow(!show)}}
        >+</span>
        <span
          data-testid="add-project-action"
          className="add-project__text"
        >
        </span>
    </div>
  )
}
