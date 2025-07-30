import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                onLoginSuccess(data.user);
                onClose(); // đóng modal
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <div className="bg-white max-w-96 w-full mx-4 md:p-6 p-4 rounded-xl shadow-lg text-sm relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl">&times;</button>
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-transparent border my-3 border-gray-400 outline-none rounded-full py-2.5 px-4"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full bg-transparent border border-gray-400 outline-none rounded-full py-2.5 px-4"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-right py-4">
                        <a href="#" className="text-blue-600 underline text-sm">Forgot Password?</a>
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2.5 rounded-full mb-3">Log in</button>
                </form>
                <p className="text-center mt-4">Don’t have an account? <a href="/register" className="text-blue-500 underline">Signup</a></p>
            </div>
        </div>
    );
};

export default LoginModal;
