import { signIn, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await getSession();
                console.log('Session on mount:', session);

                if (session) {
                    // Redirect to dashboard if session exists
                    router.replace('/admin/dashboard');
                }
            } catch (err) {
                console.error('Error checking session:', err);
            }
        };

        checkSession();
    }, [router]); // Ensure this effect runs only once or when `router` changes

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false, // Manual redirection
            });

            console.log('SignIn result:', result);

            if (result?.error) {
                setError('Invalid credentials');
                setLoading(false);
            } else if (result?.ok) {
                const session = await getSession(); // Fetch session after login
                console.log('Session after login:', session);

                if (session) {
                    router.push('/admin/dashboard'); // Redirect to dashboard
                } else {
                    setError('Unable to fetch session. Please try again.');
                    setLoading(false);
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
}
