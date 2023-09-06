import useTheme from "../../hook/useTheme";
import check from "../../images/icon-check.svg";
import "./list.css";
export default function List({ list, setList, active, completedList }) {
  const handleCompleted = (name) => {
    setList((prev) => {
      if (active || completedList) {
        return prev;
      } else {
        return prev.map((e) => {
          if (e.task === name.task && e.completed === false) {
            return { ...e, completed: true };
          }
          if (e.task === name.task && e.completed === true) {
            return { ...e, completed: false };
          } else {
            return e;
          }
        });
      }
    });
  };
  const { mode } = useTheme();
  return (
    <div className={mode === "dark" ? "list dark" : "list light"}>
      {list.map((item, index) => (
        <div
          key={index}
          className={item.completed ? "item active" : "item"}
          onClick={() => {
            handleCompleted(item);
          }}
        >
          {item.completed && <img src={check} alt="check" />}
          {!item.completed && <div className="confirm"></div>}
          <p> {item.task}</p>
        </div>
      ))}
    </div>
  );
}
