import  useReducer  from '../slice/userSlice'
const  { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit')


const rootReducer = {
    user: useReducer,
}



const store = configureStore({
    reducer : rootReducer,
})
export default store