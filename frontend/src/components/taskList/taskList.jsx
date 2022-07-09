import React from 'react';
import Task from '../task/task';
import {DeleteTask, UpdateTask} from "../api/api";

const TaskList = ({tasks, setTasks, setEditTask, diffDays, renderErrorModal, editTask}) => {

    const handleDelete = ({ id }) => {
        tasks.map( (task) => {
            if(task.id == id) {
                if (diffDays(task.date, new Date()) >= 6) {
                    return renderErrorModal("You can't delete task with UNTIL DATE more then 6 days")
                } else {
                    DeleteTask(id)
                    setTasks( tasks.filter( (task) => task.id !== id ));

                }
            }
        })

    }

    const handleComplete = (task) => {
        setTasks(
            tasks.map( (item) => {
                if(item.id === task.id) {
                    const updated_task = {...item, completed: !item.completed};
                    UpdateTask(updated_task)
                    return updated_task
                }
                return item;
            })
        );
    }

    const handleEdit = ({id}) => {
        const findTask = tasks.find((task) => task.id === id);
        setEditTask(findTask);
    }

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th scope="col"> Id </th>
                    <th scope="col"> Until Date </th>
                    <th scope="col"> Status </th>
                    <th scope="col"> Description </th>
                    <th scope="col"> Actions </th>
                </tr>
                </thead>
                <tbody>
                    {
                        tasks.map( task => {
                            return <Task
                                key={task.id}
                                task={task}
                                handleDelete={handleDelete}
                                handleComplete={handleComplete}
                                handleEdit={handleEdit}
                                diffDays={diffDays}
                                editTask={editTask}
                            />
                        } )
                    }
                </tbody>
            </table>
        </>
    )
}

export default TaskList;