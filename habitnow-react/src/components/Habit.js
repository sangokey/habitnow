import React from "react";

function Habit({ title, complete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <input
        name="complete"
        type="checkbox"
        checked={complete ? "checked" : ""}
        style={{ marginRight: 100 }}
        onClick={() => {
          const habits = JSON.parse(localStorage.getItem("habits"));
          habits.map((habit) => {
            if (habit.title === title) {
              habit.complete = !habit.complete;
            }
          });
          localStorage.setItem("habits", JSON.stringify(habits));
          window.location.reload();
        }}
      />
      <h1>{title}</h1>
    </div>
  );
}

export default Habit;
