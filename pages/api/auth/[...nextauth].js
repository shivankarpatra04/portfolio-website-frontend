import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Admin Credentials from environment variables
                const adminUser = {
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                };

                console.log('Authorizing with credentials:', credentials); // Debug credentials

                // Check if credentials match
                if (
                    credentials.email === adminUser.email &&
                    credentials.password === adminUser.password
                ) {
                    console.log('Authorization successful');
                    return { email: adminUser.email }; // Successful login
                }

                console.error('Authorization failed');
                return null; // Return null if login fails
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env.local
    pages: {
        signIn: '/admin/login', // Custom login page
    },
    callbacks: {
        async session({ session, token }) {
            console.log('Session callback triggered:', { session, token });
            session.user = token?.user || null; // Attach user info to session
            return session;
        },
        async jwt({ token, user }) {
            console.log('JWT callback triggered:', { token, user });
            if (user) {
                token.user = user; // Attach user data to JWT token
            }
            return token;
        },
    },
});
