import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { isAllowedAdmin } from '../lib/adminAllowlist'

const AdminAuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

async function assertAllowed(user) {
  if (!user) return null
  if (!isAllowedAdmin(user.email)) {
    await signOut(auth)
    throw new Error(
      'Bu e-posta admin listesinde değil. VITE_ADMIN_EMAILS içine ekleyip yeniden dene.',
    )
  }
  return user
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u && !isAllowedAdmin(u.email)) {
        await signOut(auth)
        setUser(null)
      } else {
        setUser(u)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      async login(email, password) {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const allowed = await assertAllowed(result.user)
        setUser(allowed)
        return allowed
      },
      async loginWithGoogle() {
        const result = await signInWithPopup(auth, googleProvider)
        const allowed = await assertAllowed(result.user)
        setUser(allowed)
        return allowed
      },
      async logout() {
        await signOut(auth)
        setUser(null)
      },
    }),
    [user, loading],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
