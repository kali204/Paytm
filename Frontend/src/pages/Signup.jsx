import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Head from "../components/Head";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(null);
    setLoading(true);

    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      password: password.trim(),
      phone: phone.trim(),
    };

    console.log("Sending Data:", userData);

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("token", response.data.token);
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Head label="Sign Up Now" />
          <SubHeading description="Enter your information to create an account" />

          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label="First Name" />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label="Last Name" />
          <InputBox onChange={(e) => setUserName(e.target.value)} placeholder="example@gmail.com" label="Email" />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="********" label="Password" />
          <InputBox onChange={(e) => setPhone(e.target.value)} placeholder="1234567890" label="Phone" />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="pt-4">
            <Button onPress={handleSignup} label={loading ? "Signing Up..." : "Sign Up"} disabled={loading} />
          </div>

          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
