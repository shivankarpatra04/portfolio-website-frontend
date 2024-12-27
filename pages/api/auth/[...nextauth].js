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
                console.log('Received credentials:', credentials);

                const adminUser = {
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                };

                if (
                    credentials.email === adminUser.email &&
                    credentials.password === adminUser.password
                ) {
                    console.log('Authorization successful');
                    return { email: adminUser.email };
                }

                console.error('Authorization failed');
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async session({ session, token }) {
            console.log('Session callback:', { session, token });
            session.user = token.user || null; // Ensure user is attached to the session
            return session;
        },
        async jwt({ token, user }) {
            console.log('JWT callback:', { token, user });
            if (user) token.user = user;
            return token;
        },
    },
});
