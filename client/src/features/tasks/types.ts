export interface Task {
    _id?: string
    user?: string
    name?: string
    done?: boolean
}

export type TaskResponse = Task[]