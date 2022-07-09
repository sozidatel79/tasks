import React, {useState, useEffect, useMemo} from 'react';
import 'animate.css';
import './App.css';
import Header from './components/header/header';
import AddTaskForm from './components/addTaskForm/addTaskForm';
import TaskList from './components/taskList/taskList';
import Counter from "./components/counters/counters";
import ErrorModal from "./components/errorModal/errorModal";
import {getTasks} from "./components/api/api";
import moment from "moment";
import Filter from "./components/filter/filter";
import lodash from "lodash"


const App = () => {

    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [date, setDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [modalText, setModalText] = useState("");

    const [filterStartDate, setFilterStartDate] = useState(new Date());
    const [filterEndDate, setFilterEndDate] = useState(new Date());
    const [filterBy, setFilterBy] = useState("all")
    const [orderBy, setOrderBy] = useState("id")
    const [sortDirection, setSortDirection] = useState("asc")

    useEffect( () => {
        getTasks(setTasks)
    }, [])

    const dateStringToObjectDate = (date) => {
        return new Date(date);
    }

    const filteredTasks = useMemo( () => {
        let data = [...tasks]
        let filtered = []

        if(filterBy === "1"){
            filtered = data.filter(tasks => tasks.completed === 1)
        } else if(filterBy === "0") {
            filtered = data.filter(tasks => tasks.completed === 0)
        } else if(filterStartDate < filterEndDate) {
            filtered = data.filter(tasks =>
                dateStringToObjectDate(tasks.date).getTime() >= filterStartDate.getTime() &&
                dateStringToObjectDate(tasks.date).getTime() <= filterEndDate.getTime())
        } else {
            filtered = data;
        }

        return lodash.orderBy(filtered, [orderBy], sortDirection)
    })

    const diffDays = (start, end) => {
        const dateOne = moment(start);
        const dateTwo = moment(end);

        return dateOne.diff(dateTwo, 'days')
    }

    const renderErrorModal = (text) => {
        setModalText(text)
        setModalVisible(true)
    }

    return (
        <div className='wrapper'>
            {modalVisible ? <ErrorModal modalVisible={modalVisible} modalText={modalText}
                                        setModalVisible={setModalVisible}/> : false}
            <div className='container'>
                <Header headerTitle="Tasks List"/>
                <Counter tasks={tasks} />
                <AddTaskForm
                    dateStringToObjectDate={dateStringToObjectDate}
                    setTasks={setTasks}
                    date={date}
                    setDate={setDate}
                    tasks={filteredTasks}
                    renderErrorModal={renderErrorModal}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEditTask={setEditTask}
                    editTask={editTask}
                />
                <Filter
                    filterStartDate={filterStartDate}
                    setFilterStartDate={setFilterStartDate}
                    filterEndDate={filterEndDate}
                    setFilterEndDate={setFilterEndDate}
                    filterBy={filterBy}
                    setFilterBySelect={setFilterBy}
                    orderBySelect={orderBy}
                    setOrderBySelect={setOrderBy}
                    setTasks={setTasks}
                    setSortDirection={setSortDirection}
                    sortDirection={sortDirection}
                />

                <TaskList
                    tasks={filteredTasks}
                    setTasks={setTasks}
                    setEditTask={setEditTask}
                    diffDays={diffDays}
                    renderErrorModal={renderErrorModal}
                    editTask={editTask}
                />
            </div>
        </div>
    );

}
export default App;
