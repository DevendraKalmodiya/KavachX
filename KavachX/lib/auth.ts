export type UserRole = "student" | "admin" | "government"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  school?: string
  region?: string
}

// Mock authentication - in production, this would connect to a real auth service
export const mockUsers: User[] = [
  {
    id: "1",
    email: "student@school.edu",
    name: "Priya Sharma",
    role: "student",
    school: "Delhi Public School",
  },
  {
    id: "2",
    email: "admin@school.edu",
    name: "Rajesh Kumar",
    role: "admin",
    school: "Delhi Public School",
  },
  {
    id: "3",
    email: "officer@gov.in",
    name: "Dr. Anita Singh",
    role: "government",
    region: "Delhi NCR",
  },
]

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Mock authentication logic
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "demo123") {
    return user
  }
  return null
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userData = localStorage.getItem("currentUser")
  return userData ? JSON.parse(userData) : null
}

export const setCurrentUser = (user: User | null) => {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}
