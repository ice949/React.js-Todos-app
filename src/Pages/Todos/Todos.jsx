import React, { useEffect, useState } from "react";
import "./Todos.css";
import { FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc, deleteDoc, query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const Todos = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [todo, setTodo] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [todos, setTodos] = useState([
   {}
  ]);

  const addTodo = async (e) => {
    e.preventDefault();
    const id = new Date().getTime().toString();
    await setDoc(doc(db, `mytodos${userEmail}`, id), {
      todo: todo,
      id: id,
      isCompleted: false,
    });
  };

  const getTodos = async () => {
    const q = query(collection(db, `mytodos${userEmail}`,));
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        let todosArr = [];
        querySnapshot.forEach((doc) => {
          todosArr.push({ ...doc.data(), id: doc.id });
        });
        // let anArr = userProductsArr.slice(-6)
        setTodos(todosArr);
      });
      return () => unSubscribe();
  }

  // const editTodo = async (id, updatedTodo) => {
  //   const todoRef = doc(db, `mytodos${userEmail}`, id);

  //   await updateDoc(todoRef, {
  //     todo: updatedTodo,
  //   });
  // };

  // const deleteTodo = async (id) => {
  //   await deleteDoc(doc(db, `mytodos${userEmail}`, id));
  // }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  useEffect(() => {
    getTodos()
  }, [userEmail]);

  const signout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="Todos">
      <h2>Todo List</h2>
      <form
        className="add-todo-form"
        onSubmit={(e) => {
          addTodo(e);
        }}
      >
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
              {todo.todo}
              <div className="actions">
                <button type="button" className="plain-btn blue">
                  <FaEdit />
                </button>
                <button type="button" className="plain-btn green">
                  <TiTick />
                </button>
                <button type="button" className="plain-btn red" onClick={() => {deleteTodo(todo.id)}}>
                  <FaTimes />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="signout-btn"
          onClick={() => {
            signout();
          }}
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Todos;
