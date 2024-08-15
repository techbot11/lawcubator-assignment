import Image from "next/image";
import { Inter } from "next/font/google";
import TaskItem from "@/components/TaskItem";
import { useState } from "react";
import { TaskTypes } from "@/helpers/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [taskList, setTaskList] = useState<TaskTypes[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(document.getElementById("input") as HTMLInputElement).value) return;
    const newTask: TaskTypes = {
      id: Date.now().toString(),
      title: (document.getElementById("input") as HTMLInputElement).value,
      completed: false,
    };
    setTaskList([newTask, ...taskList]);
    (document.getElementById("input") as HTMLInputElement).value = "";
  };

  const handleRemoveTask = (id: string) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id: string) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };

  const handleEditTask = (id: string, newTitle: string) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: newTitle,
          };
        }
        return task;
      })
    );
  };

  return (
    <main>
      <div className="container">
        <h1> To-Do List</h1>
        <form onSubmit={handleAddTask}>
          <div className="wrapper">
            <div className="input-wrapper">
              <input
                id="input"
                type="text"
                placeholder="Add a new task here..."
                spellCheck="false"
              />
            </div>
            <div
              id="plus"
              className="plus-wrapper"
              style={{ backgroundColor: "rgb(251, 215, 134)" }}
              onClick={handleAddTask}
            >
              <i
                id="fa-plus"
                className="fas fa-plus fa-lg"
                // style={{ display: "none" }}
              />
            </div>
          </div>
        </form>
        <ol spellCheck="false">
          {taskList?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleRemoveTask={handleRemoveTask}
                handleCompleteTask={handleCompleteTask}
                handleEditTask={handleEditTask}
              />
            );
          })}
        </ol>
      </div>
    </main>
  );
}
