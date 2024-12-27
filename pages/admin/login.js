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
        // Check if session already exists
        const checkSession = async () => {
            const session = await getSession();
            console.log('Session on mount:', session);
            if (session) {
                router.replace('/admin/dashboard');
            }
        };
        checkSession();
    }, [router]);

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
                    router.push('/admin/dashboard'); // Redirect after session
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
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
