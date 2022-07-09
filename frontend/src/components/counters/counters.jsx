import React from "react";

const Counter = ({tasks}) => {

    const TotalTasksCounter = () => {
        return tasks.length
    }

    const CompletedTasksCounter = () => {
        let counter = 0;
        tasks.map(item => {
            if (item.completed) {
                counter++
            }
        })
        return counter
    }

    const UncompletedTasksCounter = () => {
        let counter = 0;
        tasks.map(item => {
            if (!item.completed) {
                counter++
            }
        })
        return counter
    }

    return(
      <div className="counters-container">
        <div className="counter total-tasks">
            <span className="counter-text">Total Tasks</span>
            <span className="counter-number">{TotalTasksCounter()}</span>
        </div>
        <div className="counter completed-tasks">
            <span className="counter-text">Tasks Completed</span>
            <span className="counter-number">{CompletedTasksCounter()}</span>
        </div>
        <div className="counter uncompleted-tasks">
            <span className="counter-text">Tasks Remaining</span>
            <span className="counter-number">{UncompletedTasksCounter()}</span>
        </div>
      </div>
    );
}

export default Counter;