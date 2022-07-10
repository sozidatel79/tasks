import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import dateFormat, {masks} from "dateformat";
import "react-datepicker/dist/react-datepicker.css";
import {createTask, UpdateTask} from "../api/api";


const AddTaskForm = (
    {
        tasks,
        setTasks,
        renderErrorModal,
        setStartDate,
        startDate,
        setEditTask,
        editTask,
        dateStringToObjectDate
    }) => {

    let if_duplicate_item = false;

    const [input, setInput] = useState("");

    const updateTask = (title, id, completed, date) => {
        const newTask = tasks.map((task) =>
            task.id === id ? {title, id, completed, date} : task
        );
        setTasks(newTask);
        setEditTask("");
    }

    const InputChangeHandler = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        if (editTask) {
            setInput(editTask.title);
            setStartDate(dateStringToObjectDate(editTask.date));
        } else {
            setInput("");
        }
    }, [setInput, editTask])

    const addTask = (event) => {
        event.preventDefault()

        if (input === '' || startDate === null) {
            return renderErrorModal("Task Description or Date can't be empty")
        }

        if( !editTask ) {
            const new_task = {
                title: input,
                completed: false,
                date: dateFormat(startDate, "yyyy-mm-dd")
            }

            createTask(setTasks, new_task, tasks)
            setInput("");
        } else {
            const taskToUpdate = {
                id: editTask.id,
                title: input,
                date: dateFormat(startDate, "yyyy-mm-dd"),
                completed: editTask.completed
            }

            UpdateTask(taskToUpdate)
            setStartDate(new Date())
            updateTask( input, editTask.id, editTask.completed, dateFormat(startDate, "yyyy-mm-dd"))
        }


    }

    return (
        <form className="add-task-form">
            <div className="new-task">
                <div>
                <input
                    onChange={InputChangeHandler}
                    placeholder="Enter task description..."
                    type="text"
                    value={input}
                />
                </div>

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inputStyle={{ textAlign: 'center' }}
                />
            </div>
            <button type="submit" onClick={addTask} className="add-task-button">
                {editTask ? <><span>Save Task</span><i className="fa fa-save"/> </>: <><span>Add Task</span><i className="fa fa-plus-circle"/></> }
            </button>
        </form>
    );

}

export default AddTaskForm;