import { createContext, Dispatch, SetStateAction } from 'react'

interface IUserContext {
    token: string
    setToken: Dispatch<SetStateAction<string>> | null
    isAuth: boolean
    setIsAuth: Dispatch<SetStateAction<boolean>> | null
}

const UserContext = createContext<IUserContext>({
    token: '',
    setToken: null,
    isAuth: false,
    setIsAuth: null
})

export default UserContext