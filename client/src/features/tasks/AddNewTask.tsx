import React, { useState } from 'react'
import { useAddNewTaskMutation, useGetAllTasksQuery } from '../../app/services/tasks'

const AddNewTask = () => {
    const [formData, setFormData] = useState({name: ''})
    const { name } = formData
    const [addNewTask] = useAddNewTaskMutation()
    const { refetch } = useGetAllTasksQuery()

    const onChange = (e: any) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const newTask = await addNewTask({name})
            refetch()
            setFormData({name: ''})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='name'>Add Task</label>
                <input
                    name='name'
                    id='name'
                    value={name}
                    placeholder='Enter New Task Name'
                    onChange={onChange}
                 />
            </div>
            <div>
                <button type='submit'>
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AddNewTask