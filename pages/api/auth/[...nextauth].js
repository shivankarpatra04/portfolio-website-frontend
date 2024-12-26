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

                // Check if credentials match
                if (
                    credentials.email === adminUser.email &&
                    credentials.password === adminUser.password
                ) {
                    return { email: adminUser.email }; // Successful login
                }

                // Return null if login fails
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/admin/login', // Custom login page
    },
});