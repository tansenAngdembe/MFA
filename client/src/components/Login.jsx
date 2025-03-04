import { useState } from "react";
import axios from "axios"

const Login = () => {

    const [value, setValue] = useState({
        email: '',
        password: "",
        otp:""
    })
    const [showOtp, setShowOtp] = useState(false)
    const uri = "http://localhost:5000"


    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${uri}/login`, value);
            if (response.data.success) {
                setShowOtp(true);
                alert("Verification code send to your email.")
            } else {
                alert("User not found")
            }
            console.log(response)
        } catch (error) {
            console.error(error)

        }


    }
    const verify = async (e) => {
        e.preventDefault();

        try {
            const verify = await axios.post(`${uri}/verify`, value);
            if (verify.data.success) {
                // window.location.href = "/"
                alert("Login success full")
            }

        }catch{
            alert("Verification code doesn't match.")
        }

    }
    return (
        <div>
            <div>
                <h1>Login</h1>
                <form onSubmit={formSubmit}>
                    <input type="text" placeholder="Enter your email"
                        value={value.email}
                        onChange={e => setValue({ ...value, email: e.target.value })}
                    />
                    <input type="password" placeholder="Enter your password"
                        value={value.password}
                        onChange={e => setValue({ ...value, password: e.target.value })}
                    />
                    <input type="submit" value="submit" />
                </form>
            </div>
            <div>
                {showOtp && <div>
                    <h1>Enter OTP</h1>
                    <form onSubmit={verify}>
                        <input type="text" placeholder="Enter OTP" value={value.otp} onChange={e => setValue({...value,otp:e.target.value})} />
                        <input type="submit" value="submit" />
                    </form>
                </div>}
            </div>



        </div>

    )

}


export default Login