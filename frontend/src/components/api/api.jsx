import axios from 'axios';

const API = axios.create({
    baseURL: 'http://webbox.live',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 30000,
    responseType: 'json',
});

API.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        return Promise.reject(error);
    },
);


export const getTasks = async (setTasks) => {
    await API.get(
        `/api/tasks`,
    ).then(response => {
        setTasks(response.data.data || [])
    }).catch(error => {
        return error
        }
    )
}

export const createTask = async (setTasks, new_task, tasks) => {
    await API.post(
        `/api/tasks`,
        new_task,
    ).then(response => {
        setTasks([
            ...tasks,
            response.data.data
        ])
        return response.data
    }).catch(error => {
            return error
        }
    )
}

export const UpdateTask = async (updated_task) => {

    await API.put(
        `/api/tasks/${updated_task.id}`,
        updated_task,
    ).then(response => {
        return response.data.data
    }).catch(error => {
        return error
        }
    )
}

export const DeleteTask = async (id) => {
    await API.delete(
        `/api/tasks/${id}`,
    ).then(response => {
        return response.data.data
    }).catch(error => {
        return error
        }
    )
}
