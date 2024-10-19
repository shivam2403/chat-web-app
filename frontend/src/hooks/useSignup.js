import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const {setAuthUser} = useAuthContext(); 

    const signup=async({fullName,username,password,confirmPassword,gender})=>{
        // console.log(fullName,username,password,confirmPassword,gender)
        const success=handleInputErrors({fullName,username,password,confirmPassword,gender})
        if(!success)return;

        setLoading(true);
        try {
            console.log(fullName,username,password,confirmPassword,gender)
            const res=await fetch('/api/auth/signup',{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender})
            })

            const data=await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("authUser", JSON.stringify(data))
            setAuthUser(data);
            // console.log(data)
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    return {signup,loading}
}

export default useSignup

const handleInputErrors=({fullName,username,password,confirmPassword,gender})=>{
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all the fields')
        return false
    }

    if(password !== confirmPassword){
        toast.error('Passwords do not match')
        return false
    }

    if(password.length < 6){
        toast.error('Password must be at least 6 characters')
        return false;
    }

    return true;
}