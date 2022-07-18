import { api } from './api'
import { TaskResponse, Task } from '../../features/tasks/types'

export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllTasks: build.query<TaskResponse, void>({
            query: () => '/tasks'
        }),
        addNewTask: build.mutation<void, Task>({
            query: task => ({
                url: '/tasks',
                method: 'POST',
                body: task
            })
        }),
        toggleTaskStatus: build.mutation<Task, Task>({
            query: ({_id, done}) => ({
                url: `/tasks/toggle-status/${_id}`,
                method: 'PATCH',
                body: { done }
            })
        }),
        updateTask: build.mutation<void, Task>({
            query: ({_id, ...rest}) => ({
                url: `/tasks/edit-name/${_id}`,
                method: 'PATCH',
                body: rest
            })
        }),
        deleteTask: build.mutation<void, string>({
            query: _id => ({
                url: `/tasks/delete/${_id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetAllTasksQuery,
    useAddNewTaskMutation,
    useToggleTaskStatusMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApi