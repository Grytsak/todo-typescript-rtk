import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { 
    useGetAllTasksQuery,
    useToggleTaskStatusMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} from '../../app/services/tasks'

const Task = (props: any) => {
    const dispatch = useDispatch()
    const { refetch } = useGetAllTasksQuery()
    const [toggleStatus] = useToggleTaskStatusMutation()
    const [editTaskName] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    const { _id, name, done } = props.task
    const [editedName, setEditedName] = useState(name)
    const [check, setCheck] = useState(done)
    const [timer, setTimer] = useState()


    const onToggleStatus = async () => {
        await toggleStatus({_id, done: !check})
        setCheck(!check)
    }

    const onEditTask = (e: any) => {
        let value = e.target.value

        setEditedName(value)
        clearTimeout(timer)

        const newTimer: any = setTimeout( async() => {
            await editTaskName({_id, name: value})
        }, 500)
        
        setTimer(newTimer)
    }

    const onDeleteTask = async () => {
        await deleteTask(_id)
        refetch()
    }

    return (
        <div>
            <div>{editedName}</div>
            <div>
                Status: {check.toString()}
                <input 
                    type="checkbox"
                    checked={check}
                    onChange={onToggleStatus}
                />
            </div>
            <div>
                <label htmlFor='editName'>Edit Task Name</label>
                <input 
                    type='text'
                    id='editName'
                    name='editName'
                    value={editedName}
                    placeholder='Edit task name'
                    onChange={onEditTask}
                />
            </div>
            <button onClick={onDeleteTask}>Delete</button>
        </div>
    )
}

export default Task
