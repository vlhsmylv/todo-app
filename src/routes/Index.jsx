import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [todos, setTodos] = React.useState([]);
  const [todoTitle, setTodoTitle] = React.useState("");
  const [xp, setXp] = React.useState("");

  React.useEffect(() => {
    try {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    } catch (error) {}

    try {
      setXp(JSON.parse(localStorage.getItem("user")).xp);
    } catch (error) {
      if (error.message === "localStorage.getItem(...) is null") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            xp: 0,
          })
        );
      }
    }
  }, []);

  const handleCreateNewTodo = (e) => {
    e.preventDefault();
    if (todoTitle !== "") {
      const _todos = JSON.parse(localStorage.getItem("todos"));
      _todos.push({
        title: todoTitle,
        date: new Date(),
      });
      localStorage.setItem("todos", JSON.stringify(_todos));
      toast.success("Task created successfully!", {
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        autoClose: 2000,
      });
      setTodos(JSON.parse(localStorage.getItem("todos")));
      setTodoTitle("");
    } else {
      toast.error("Todo title must be provided", {
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        autoClose: 2000,
      });
    }
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const _todos = JSON.parse(localStorage.getItem("todos"));
    const id = e.target.id.substring(14);
    _todos.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(_todos));

    const user = JSON.parse(localStorage.getItem("user"));

    user.xp += 1;

    localStorage.setItem("user", JSON.stringify(user));

    setXp(JSON.parse(localStorage.getItem("user")).xp);
    setTodos(JSON.parse(localStorage.getItem("todos")));

    toast.success("Task finished successfully!", {
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      autoClose: 2000,
    });
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const _todos = JSON.parse(localStorage.getItem("todos"));
    const id = e.target.id.substring(12);
    _todos.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(_todos));
    toast.info("Task deleted successfully!", {
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      autoClose: 2000,
    });
    setTodos(JSON.parse(localStorage.getItem("todos")));
  };

  const resetApp = (e) => {
    e.preventDefault();
    if(window.confirm("Do you want to reset app?")) {
        localStorage.setItem("todos", JSON.stringify([]));
        localStorage.setItem("user", JSON.stringify({xp:0}));

        setXp(JSON.parse(localStorage.getItem("user")).xp);
        setTodos(JSON.parse(localStorage.getItem("todos")));

        toast.info("Application reset successfully!", {
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            autoClose: 2000,
        })
    }
  }

  return (
    <div id="app">
      <div id="credits">
        <div>
            <span id="text">Developed by</span> <a id="developer" href="https://valehismayilov.com">Valeh Ismayilov</a>
        </div>
        <div>
            <button id="reset-button" onClick={resetApp}>
                Reset
            </button>
        </div>
        <div>
            <button id="view-on-github" onClick={() => {
                window.open("https://github.com/")
            }}>
                <i className="fa-brands fa-github"></i> View on Github
            </button>
        </div>
      </div>
      <div id="header">
        <h1>Todo Application</h1>
      </div>
      <div id="xp">{xp === "" ? <>Loading...</> : <>{xp} xp</>}</div>
      <div id="main">
        <form id="control" onSubmit={handleCreateNewTodo}>
          <input
            type="text"
            autoComplete="off"
            placeholder="New todo title"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
          <input type="submit" value="Add" />
        </form>
        <div id="todos">
          {todos.length === 0 ? (
            <>There is no todo. Create new one now!</>
          ) : (
            <>
              {todos.map((todo, i) => {
                return (
                  <div
                    key={i}
                    className="todo-container"
                    id={`todo-container-${i}`}
                  >
                    <span id={`todo-title-${i}`}>{todo.title}</span>
                    <span className="control-container">
                      <input
                        type="button"
                        id={`todo-remove-${i}`}
                        value="Remove"
                        className="remove-button"
                        onClick={handleRemove}
                      />
                      <input
                        type="checkbox"
                        id={`todo-checkbox-${i}`}
                        checked={todo.checked}
                        className="checkbox"
                        onClick={handleCheck}
                      />
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <ToastContainer limit={3} />
    </div>
  );
};

export default Index;
