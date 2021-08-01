import ToDoList from "./components/ToDoList";

import Textfield from '@atlaskit/textfield';

import Button from '@atlaskit/button';

import { useCallback, useState, useEffect } from "react";

import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY =  'TODO_APP'

function App() {
  const [todoList, setTodoList] = useState([]);

  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    
    const storageToDoList = localStorage.getItem(TODO_APP_STORAGE_KEY)
    
    if (localStorage.getItem(TODO_APP_STORAGE_KEY)) {
      setTodoList(JSON.parse(storageToDoList))
    }
    
  }, [])

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList))
  }, [todoList])

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value)
  }, [])

  const onAddBtnClick = useCallback((e) => {
    setTodoList([{id: v4(), name: textInput, isCompleted: false}, ...todoList, ])
    setTextInput("");
  }, [textInput, todoList])

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) => prevState.map((todo) => todo.id === id ? {...todo, isCompleted: true} : todo));
  }, []);

  return (
    <>
      <h3>Todo List</h3>
      <Textfield name="add-todo" placeholder="Thêm việc cần làm..." elemAfterInput={
        <Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnClick}>Thêm</Button>
      }
      css={{padding: "2px 4px 2px"}}
      value={textInput}
      onChange={onTextInputChange}
      ></Textfield>
      <ToDoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
  );
}

export default App;
