import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            setError('Invalid Credentials');
        } else {
            router.push('/admin/dashboard'); // Redirect to dashboard
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h1 className="text-2xl mb-4 font-bold text-center">Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </div>
        </div>
    );
}
