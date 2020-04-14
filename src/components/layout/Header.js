import React, { useState } from 'react'
import { FaPizzaSlice } from 'react-icons/fa' 

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
            <li className="settings__add" data-testid="quick-add-task-action">+</li>
              <li 
                className="settings__darkmode" 
                data-testid="dark-mode-action"
                onClick={()=> setDarkMode(!darkMode)}
                >
                <FaPizzaSlice/>
              </li>
          </ul>
        </div>
      </nav>
    </header>
  ) 
}