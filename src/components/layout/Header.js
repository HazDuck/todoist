import React, { useState } from 'react'
import { FaPizzaSlice } from 'react-icons/fa' 
import { AddTask } from '../AddTask'

export const Header = ({ darkMode, setDarkMode }) => {

  const [shouldShowMain, setShouldShowMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li 
              className="settings__add" 
              data-testid="quick-add-task-action"
              onClick={()=> {
                setShowQuickAddTask(true)
                setShouldShowMain(true)
              }}
              aria-label="Quick add task"
              >
              +
            </li>
            <li 
              className="settings__darkmode" 
              data-testid="dark-mode-action"
              onClick={()=> setDarkMode(!darkMode)}
              aria-label="Dark mode on/off"
              >
              <FaPizzaSlice/>
            </li>
          </ul>
        </div>
      </nav>
      <AddTask 
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  ) 
}