import "./App.css";
import { useEffect, useState } from "react";
import useTheme from "./hook/useTheme";
import List from "./components/list/List";
import moon from "./images/icon-moon.svg";
import sun from "./images/icon-sun.svg";
import check from "./images/icon-check.svg";

function App() {
  const [list, setList] = useState([
    {
      task: "Complete online JavaScript course",
      completed: false,
    },
    { task: "Jog around the park", completed: false },
    { task: "10 minutes meditation", completed: false },
    { task: "Read for 1 hour", completed: false },
    { task: "Pick up groceries", completed: false },
    { task: "Play guitar", completed: false },
  ]);
  const { mode, changeMode } = useTheme();
  const [isLeft, setIsLeft] = useState({});
  const [newTodo, setNewTodo] = useState("");
  const [all, setAll] = useState(true);
  const [active, setActive] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [linkText, setLinkText] = useState("All");

  if (mode === "light") {
    document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
  } else {
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
  }

  useEffect(() => {
    const tasksLeft = list.filter((task) => {
      return task.completed !== true;
    });
    setIsLeft(tasksLeft);
  }, [list]);

  const handleSubmit = (e) => {
    if (newTodo !== "") {
      setNewTodo("");
      e.preventDefault();
      setList((prev) => {
        return [...prev, { task: newTodo, completed: false }];
      });
    }
  };

  const handleList = (e) => {
    e.preventDefault();
    if (e.target.textContent === "All") {
      setLinkText("All");
      setAll(true);
      setActive([]);
      setCompletedList([]);
      return list;
    } else if (e.target.textContent === "Active") {
      const activeList = list.filter((item) => {
        return item.completed !== true;
      });
      setLinkText("Active");
      setActive(activeList);
      setAll(false);
      setCompletedList([]);
    } else if (e.target.textContent === "Completed") {
      const completed = list.filter((item) => {
        return item.completed === true;
      });
      setLinkText("Completed");
      setCompletedList(completed);
      setActive([]);
      setAll(false);
    }
  };

  const handleClearCompleted = () => {
    setCompletedList([]);
    setList((prev) => {
      return prev.filter((items) => {
        return items.completed === false;
      });
    });
  };

  return (
    <div className={mode === "dark" ? "App" : "App light"}>
      <div className="header">
        <h1>TODO</h1>
        {mode === "dark" && (
          <img src={sun} alt="sun" onClick={() => changeMode("light")} />
        )}
        {mode === "light" && (
          <img src={moon} alt="moon" onClick={() => changeMode("dark")} />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {!newTodo && <div className="confirm"></div>}
        {newTodo && <img src={check} alt="check" onClick={handleSubmit} />}
        <input
          type="text"
          placeholder="Create a new todo..."
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          value={newTodo}
        />
      </form>

      <div className="list-container">
        {all && <List list={list} setList={setList} />}
        {active && <List list={active} setList={setList} active={true} />}
        {completedList && (
          <List
            list={completedList}
            setList={setList}
            completedList={completedList}
          />
        )}

        <div className="links">
          <div className="item-number">
            {isLeft.length + " "}
            items left
          </div>
          <div className="link">
            <a
              href="#"
              onClick={handleList}
              className={linkText === "All" ? "active" : ""}
            >
              All
            </a>
            <a
              href="#"
              onClick={handleList}
              className={linkText === "Active" ? "active" : ""}
            >
              Active
            </a>
            <a
              href="#"
              onClick={handleList}
              className={linkText === "Completed" ? "active" : ""}
            >
              Completed
            </a>
          </div>
          <div className="clear" onClick={handleClearCompleted}>
            Clear Completed
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
