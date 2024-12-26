import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log('Received credentials:', credentials); // Debug credentials

                const adminUser = {
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                };

                if (
                    credentials.email === adminUser.email &&
                    credentials.password === adminUser.password
                ) {
                    console.log('Authorization successful');
                    return { email: adminUser.email }; // Successful login
                }

                console.error('Authorization failed');
                return null; // Login failed
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
    pages: {
        signIn: '/admin/login', // Custom login page
    },
    callbacks: {
        async session({ session, token }) {
            console.log('Session callback triggered', { session, token });
            return session; // Customize session as needed
        },
        async jwt({ token, user }) {
            console.log('JWT callback triggered', { token, user });
            if (user) token.user = user;
            return token;
        },
    },
});
