import React, { useState } from "react";
import "./Todos.css";
import { FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    "Learn React",
    "Learn Redux",
    "Learn React Router",
    "Learn React Hooks",
  ]);

  return (
    <div className="Todos">
      <h2>Todo List</h2>
      <form className="add-todo-form">
        <h3>Add a Todo</h3>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="btn">
          <FaPlus />
        </button>
      </form>
      <div className="todos">
        <h3>Todos</h3>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <div className="actions">
                <button type="button" className="plain-btn blue">
                  <FaEdit />
                </button>
                <button type="button" className="plain-btn green">
                  <TiTick />
                </button>
                <button type="button" className="plain-btn red">
                  <FaTimes />
                </button>
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
