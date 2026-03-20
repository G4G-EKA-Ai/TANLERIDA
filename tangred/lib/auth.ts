import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

const demoUser = {
  id: 'demo-user',
  email: 'client@tangred.in',
  name: 'Tangred Client',
  image: null,
  tanLeidaAccess: true,
  tanLeidaId: 'TL-AB3K7M2P',
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? 'demo-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? 'demo-google-client-secret',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        return {
          ...demoUser,
          email: String(credentials.email),
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id
        token.tanLeidaAccess = user.tanLeidaAccess ?? false
        token.tanLeidaId = user.tanLeidaId ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? demoUser.id)
        session.user.tanLeidaAccess = Boolean(token.tanLeidaAccess ?? demoUser.tanLeidaAccess)
        session.user.tanLeidaId = token.tanLeidaId ? String(token.tanLeidaId) : demoUser.tanLeidaId
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'tangred-demo-secret',
})
