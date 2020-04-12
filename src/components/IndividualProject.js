import React, { useState } from 'react';
import { FATrashAlt, FaTrashAlt, FaDivide } from 'react-icons/fa'
import { useProjectsValue, useSelectedProjectValue } from '../context/index'
import { firebase } from '../firebase'

export const IndividualProject = ({project}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { projects, setProjects } = useProjectsValue()
  const { setSelectedProject } = useSelectedProjectValue()

  const deleteProject = (docId) => {
    firebase
    .firestore()
    .collection('projects')
    .doc(docId)
    .delete()
    .then(() => {
      setProjects([...projects])
      setSelectedProject('INBOX')
    })
  }

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span 
        className="sidebar__project-delete"
        datatest-id="delete-project"
        onClick={()=>setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="">
            <div className="">
              <p>Are you sure you want to delete this project?</p>
              <button onClick={()=>deleteProject(project.docId)}>
                Delete
              </button>
              <span onClick={()=> {setShowConfirm(!showConfirm)}}>
                Cancel
              </span>
            </div>
          </div>
        )

        }
      </span>
    </>
  )
}