import { auth } from '@/auth'

export async function getCurrentUserIdOrDemo() {
  const session = await auth()
  return session?.user?.id ?? 'demo-user'
}
