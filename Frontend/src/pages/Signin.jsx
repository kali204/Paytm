import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle redirects
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Head from "../components/Head";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";

const Login = () => {
  // State to manage form inputs
  const [username, setUserName] = useState(""); // Username (email)
  const [password, setPassword] = useState(""); // Password
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(false); // State to handle loading state

  // Initialize useNavigate hook to redirect after successful login
  const navigate = useNavigate();

  // Handle form submission (login request)
  const handleLogin = async () => {
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      // Send POST request to the backend for login
      const response = await axios.post(
        'http://127.0.0.1:5000/login',  // Correct endpoint for login
        {
          username,  // User email
          password,  // User password
        },
        {
          headers: {
            "Content-Type": "application/json",  // Make sure the content type is correct
          },
        }
      );

      // If login is successful, save JWT token to local storage
      localStorage.setItem("token", response.data.access_token); // Save token for later use
      alert("Login successful!");  // Notify user of successful login

      // Redirect to dashboard or home page after login
      navigate('/dashboard'); // Or navigate to any other page you want to redirect to

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      // Set error message if login fails
      setError(err.response?.data?.error || "Login failed!");
    } finally {
      setLoading(false); // Stop loading state after request is complete
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Head label={"Log In"} />
          <SubHeading description={"Enter your credentials to login"} />

          {/* Input for username (email) */}
          <InputBox onChange={(e) => setUserName(e.target.value)} placeholder="example@gmail.com" label={"Email"} />

          {/* Input for password */}
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="********" label={"Password"} />

          {/* Display error message if login fails */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          
          <div className="pt-4">
            {/* Button to trigger login */}
            <Button onPress={handleLogin} label={loading ? "Logging In..." : "Log In"} disabled={loading} />
          </div>

          {/* Bottom warning (for redirecting to signup page) */}
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};

export default Login;
