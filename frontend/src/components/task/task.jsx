import React from 'react';
import moment from "moment";

const Task = ({task, handleDelete, handleEdit, handleComplete, editTask}) => {
     return (
            <tr className={task.completed ? "task-completed animate__animated animate__flipInX" : "task-active animate__animated animate__bounceIn"}>
                <td data-label="Id">{task.id}</td>
                <td data-label="Date">{task.date}</td>
                <td data-label="Status">{task.completed ? "completed" : "active"}</td>
                <td data-label="Title">{task.title}</td>
                <td data-label="Actions">
                    <div className="task-buttons-container">
                        <button
                            onClick={() => handleComplete(task)}
                            className="button-complete task-button"
                        >
                            <i className={task.completed ? "fa fa-undo" : "fa fa-check-circle"} />
                        </button>
                        <button
                            onClick={ () => handleEdit(task) }
                            className="button-edit task-button"
                        >
                            <i className={editTask && (editTask.id) === task.id ? "fa fa-save" : "fa fa-edit"} />
                        </button>

                        <button
                            onClick={ () => handleDelete(task) }
                            className="button-delete task-button"
                        >
                            <i className="fa fa-trash"/>
                        </button>
                    </div>
                </td>
            </tr>
    );

}

export default Task;

