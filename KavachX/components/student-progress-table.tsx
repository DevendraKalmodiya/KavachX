"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Student {
  id: string
  name: string
  class: string
  email: string
  modulesCompleted: number
  totalModules: number
  drillsCompleted: number
  totalDrills: number
  averageScore: number
  badges: number
  lastActive: string
  status: "active" | "inactive" | "at-risk"
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Priya Sharma",
    class: "10-A",
    email: "priya.sharma@school.edu",
    modulesCompleted: 8,
    totalModules: 12,
    drillsCompleted: 4,
    totalDrills: 6,
    averageScore: 95,
    badges: 5,
    lastActive: "2024-01-20",
    status: "active",
  },
  {
    id: "2",
    name: "Arjun Patel",
    class: "9-B",
    email: "arjun.patel@school.edu",
    modulesCompleted: 6,
    totalModules: 12,
    drillsCompleted: 3,
    totalDrills: 6,
    averageScore: 88,
    badges: 3,
    lastActive: "2024-01-19",
    status: "active",
  },
  {
    id: "3",
    name: "Sneha Gupta",
    class: "10-C",
    email: "sneha.gupta@school.edu",
    modulesCompleted: 4,
    totalModules: 12,
    drillsCompleted: 2,
    totalDrills: 6,
    averageScore: 72,
    badges: 2,
    lastActive: "2024-01-15",
    status: "at-risk",
  },
  {
    id: "4",
    name: "Rahul Singh",
    class: "9-A",
    email: "rahul.singh@school.edu",
    modulesCompleted: 10,
    totalModules: 12,
    drillsCompleted: 5,
    totalDrills: 6,
    averageScore: 92,
    badges: 4,
    lastActive: "2024-01-20",
    status: "active",
  },
  {
    id: "5",
    name: "Ananya Reddy",
    class: "10-B",
    email: "ananya.reddy@school.edu",
    modulesCompleted: 2,
    totalModules: 12,
    drillsCompleted: 1,
    totalDrills: 6,
    averageScore: 65,
    badges: 1,
    lastActive: "2024-01-10",
    status: "inactive",
  },
]

export function StudentProgressTable() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = classFilter === "all" || student.class === classFilter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "at-risk":
        return <Badge variant="destructive">At Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const exportData = () => {
    alert("Exporting student progress data... Download will start shortly.")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Student Progress Tracking</CardTitle>
            <CardDescription>Monitor individual student performance and engagement</CardDescription>
          </div>
          <Button onClick={exportData} variant="outline">
            <span className="mr-2">📥</span>
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔍</span>
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="9-A">9-A</SelectItem>
              <SelectItem value="9-B">9-B</SelectItem>
              <SelectItem value="10-A">10-A</SelectItem>
              <SelectItem value="10-B">10-B</SelectItem>
              <SelectItem value="10-C">10-C</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Student</th>
                <th className="text-left p-3 font-medium">Class</th>
                <th className="text-left p-3 font-medium">Modules</th>
                <th className="text-left p-3 font-medium">Drills</th>
                <th className="text-left p-3 font-medium">Avg Score</th>
                <th className="text-left p-3 font-medium">Badges</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline">{student.class}</Badge>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="text-sm">
                        {student.modulesCompleted}/{student.totalModules}
                      </div>
                      <Progress value={(student.modulesCompleted / student.totalModules) * 100} className="h-2" />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="text-sm">
                        {student.drillsCompleted}/{student.totalDrills}
                      </div>
                      <Progress value={(student.drillsCompleted / student.totalDrills) * 100} className="h-2" />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{student.averageScore}%</div>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary">{student.badges}</Badge>
                  </td>
                  <td className="p-3">{getStatusBadge(student.status)}</td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm">
                      <span>👁️</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No students found matching your criteria.</div>
        )}
      </CardContent>
    </Card>
  )
}
