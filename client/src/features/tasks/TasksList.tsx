import React, { useEffect } from 'react'
import { useGetAllTasksQuery } from '../../app/services/tasks'
import Task from './Task'

const TasksList = () => {
    const {data, refetch, error, isLoading, isSuccess} = useGetAllTasksQuery()

    useEffect(() => {
        refetch()
    }, [])
    
    const renderTasks = () => {
        if(isSuccess) {
            return (
                data.map(task => {
                    return <li key={task._id}><Task task={task} /></li>
                })
            )
        }
    }

    return(
        <>
            <h2>Tasks List</h2>
            {isLoading && <h3>...Loading</h3>}
            {error && <h3>Something went wrong</h3>}
            <ul>{isSuccess && renderTasks()}</ul>
        </>
    )
}

export default TasksList