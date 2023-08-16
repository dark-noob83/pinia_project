import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2'

export const useTaskStore = defineStore('main', {

    state: () => {
        return {
            tasks: []
        }
    },
    getters: {
        allTasks(state) {
            return state.tasks
        }
    },
    actions: {
        async fetchTasks() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
                this.tasks = response.data

            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There is a problem, please try again",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        },

        async filterTasks(limit) {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
                this.tasks = response.data

            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There is a problem, please try again",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        },

        async stroeTask(title) {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
                    title: title,
                    completed: false
                })
                this.tasks.unshift(response.data)

                Swal.fire({
                    title: "Task added",
                    icon: "success",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top',
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There is a problem, please try again",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        },

        async updateTask(task) {
            try {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                    id: task.id,
                    title: task.title,
                    completed: !task.completed
                })

                const index = this.tasks.findIndex(task => task.id == response.data.id);
                if (index != -1) {
                    this.tasks.splice(index, 1, response.data)
                }

                Swal.fire({
                    title: "Task Updated",
                    icon: "success",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top',
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There is a problem, please try again",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        },

        async deleteTask(id) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

                this.tasks = this.tasks.filter(task => task.id != id)

                Swal.fire({
                    title: "Task Deleted",
                    icon: "warning",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top',
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There is a problem, please try again",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        },
    }
});