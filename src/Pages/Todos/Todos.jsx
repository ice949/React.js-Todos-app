import React, { useEffect, useState } from "react";
import "./Todos.css";
import { FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Todos = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [todo, setTodo] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [todos, setTodos] = useState([{}]);

  const addTodo = async (e) => {
    e.preventDefault();
    const id = new Date().getTime().toString();
    await setDoc(doc(db, `mytodos${userEmail}`, id), {
      todo: todo,
      id: id,
      isCompleted: false,
    });
    setTodo("");
  };

  const getTodos = async () => {
    const q = query(collection(db, `mytodos${userEmail}`));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      // let anArr = userProductsArr.slice(-6)
      setTodos(todosArr);
    });
    return () => unSubscribe();
  };

  const completeTodo = async (id, state) => {
    if (state) {
      const newOne = false;
      const todoRef = doc(db, `mytodos${userEmail}`, id);
      await updateDoc(todoRef, {
        isCompleted: newOne,
      });
    } else {
      const newOne = true;
      const todoRef = doc(db, `mytodos${userEmail}`, id);
      await updateDoc(todoRef, {
        isCompleted: newOne,
      });
    }
  };

  const editTodo = async (id, updatedTodo) => {
    const todoRef = doc(db, `mytodos${userEmail}`, id);
    await updateDoc(todoRef, {
      todo: updatedTodo,
    });
    setUpdatedTodo("");
    closeModal();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, `mytodos${userEmail}`, id));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  useEffect(() => {
    getTodos();
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


  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000';
  }

  function closeModal() {
    setIsOpen(false);
  }

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
            <li key={index} className={todo.isCompleted ? "completed" : ""}>
              <div className="todo">
                {todo.todo}
                <div className="actions">
                  <button type="button" className="plain-btn blue" onClick={openModal}>
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="plain-btn green"
                    onClick={() => {
                      completeTodo(todo.id, todo.isCompleted);
                    }}
                  >
                    <TiTick />
                  </button>
                  <button
                    type="button"
                    className="plain-btn red"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Todo</h2>
        {/* <button onClick={closeModal}>close</button> */}
        
        <div className="edit-input">
                <input
                  type="text"
                  value={updatedTodo}
                  onChange={(e) => setUpdatedTodo(e.target.value)}
                />
                <button
                  type="button"
                  className="plain-btn"
                  onClick={() => {
                    editTodo(todo.id, updatedTodo);
                  }}
                >
                  <FaEdit />
                </button>
              </div>
      </Modal>
              
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
