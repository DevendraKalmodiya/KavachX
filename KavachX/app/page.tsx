"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { getCurrentUser, setCurrentUser, type User } from "@/lib/auth"
import { StudentDashboard } from "@/components/student-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { GovernmentDashboard } from "@/components/government-dashboard"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setUser(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  // Render role-based dashboard
  switch (user.role) {
    case "student":
      return <StudentDashboard user={user} onLogout={handleLogout} />
    case "admin":
      return <AdminDashboard user={user} onLogout={handleLogout} />
    case "government":
      return <GovernmentDashboard user={user} onLogout={handleLogout} />
    default:
      return <LoginForm onLogin={handleLogin} />
  }
}
