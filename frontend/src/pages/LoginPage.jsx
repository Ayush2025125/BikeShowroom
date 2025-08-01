import React, { useState } from "react";
// If using React Router, uncomment the line below:
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // If using React Router, uncomment the line below:
  // const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const endpoint = isLogin
      ? "http://localhost:5000/api/admin/login"
      : "http://localhost:5000/api/admin/register";

    const payload = {
      username,
      password,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess(data.message || (isLogin ? "Login successful!" : "Registration successful!"));

        if (isLogin) {
          // Save token and username in localStorage
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminUsername", username);
          
          // Show success message briefly then redirect to landing page
          setTimeout(() => {
            // Option 1: Using window.location (works without React Router)
            window.location.href = "/";
            
            // Option 2: If using React Router, uncomment the line below and comment out the line above
            // navigate("/");
          }, 1500); // 1.5 second delay to show success message
        }

        // Reset form
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setError("Server not responding");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Admin Login" : "Admin Registration"}
        </h2>

        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline ml-1"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;