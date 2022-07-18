import mongoose from 'mongoose'

export interface IUser {
    name: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please add an email']
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model<IUser>('User', userSchema)
export default User