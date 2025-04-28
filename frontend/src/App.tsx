import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/auth/signup/SignUp"
import SignIn from "./pages/auth/signin/SignIn"
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword"
import ResetPassword from "./pages/auth/reset-password/ResetPassword"
import Home from "./pages/home/Home"

const App = () => {
  return (
    <div className='p-4 transition-colors duration-200'>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
        <Route path="/auth/signup" element={<SignUp/>}></Route>
        <Route path="/auth/signin" element={<SignIn/>}></Route>
        <Route path="/auth/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/auth/reset-password" element={<ResetPassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App