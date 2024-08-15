import { TaskTypes } from "@/helpers/types";
import React, { useEffect, useState } from "react";

export default function TaskItem({
  task,
  handleCompleteTask,
  handleRemoveTask,
  handleEditTask,
}: {
  task: TaskTypes;
  handleCompleteTask: (id: string) => void;
  handleRemoveTask: (id: string) => void;
  handleEditTask: (id: string, newTitle: string) => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTitle = (document.getElementById("editInput") as HTMLInputElement)
      .value;
    handleEditTask(task.id, newTitle);
    setIsEdit(false);
  };

  useEffect(() => {
    if (!!isEdit)
      (document.getElementById("editInput") as HTMLInputElement).focus();
  }, [isEdit]);

  return (
    <li
      contentEditable="false"
      spellCheck="false"
      className={task.completed ? "completed" : ""}
    >
      <form onSubmit={handleEdit}>
        <span
          className=""
          contentEditable="false"
          title="Click to mark this task as completed"
          onClick={() => handleCompleteTask(task.id)}
        >
          {" "}
          <i
            className={
              task.completed
                ? "far fa-lg fa-check-square green"
                : "far fa-square fa-lg"
            }
          >
            {" "}
          </i>
        </span>
        {isEdit ? (
          <input
            className="inline"
            type="text"
            id="editInput"
            defaultValue={task.title}
            onBlur={handleEdit}
            style={{ width: "70%", background: "transparent" }}
          />
        ) : (
          <span className="task">{task.title} </span>
        )}
        {!isEdit && (
          <span
            className="trash"
            contentEditable="true"
            title="Click to remove this task from the list"
            onClick={() => handleRemoveTask(task.id)}
          >
            {" "}
            <i className="fas fa-trash fa-lg"> </i>
          </span>
        )}
        {!isEdit && (
          <span
            className="edit"
            contentEditable="false"
            title="Click to edit this task"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            {" "}
            <i className="fas fa-pencil-alt fa-lg"> </i>
          </span>
        )}
      </form>
    </li>
  );
}
