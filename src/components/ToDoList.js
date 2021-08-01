import React from 'react'

import ToDo from './ToDo'

export default function ToDoList({todoList, onCheckBtnClick}) {
    return (
        <>
            {
                todoList.map(todo => <ToDo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} />)
            }
        </>
    )
}
