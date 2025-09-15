"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface DrillSession {
  id: string
  type: "earthquake" | "fire" | "flood" | "evacuation"
  date: string
  duration: string
  participants: number
  totalStudents: number
  averageScore: number
  status: "completed" | "scheduled" | "in-progress"
}

const mockDrillSessions: DrillSession[] = [
  {
    id: "1",
    type: "fire",
    date: "2024-01-15",
    duration: "12 min",
    participants: 1180,
    totalStudents: 1250,
    averageScore: 87,
    status: "completed",
  },
  {
    id: "2",
    type: "earthquake",
    date: "2024-01-08",
    duration: "8 min",
    participants: 1205,
    totalStudents: 1250,
    averageScore: 92,
    status: "completed",
  },
  {
    id: "3",
    type: "evacuation",
    date: "2024-02-15",
    duration: "15 min",
    participants: 0,
    totalStudents: 1250,
    averageScore: 0,
    status: "scheduled",
  },
]

const participationData = [
  { month: "Sep", fire: 92, earthquake: 88, flood: 85, evacuation: 90 },
  { month: "Oct", fire: 89, earthquake: 91, flood: 87, evacuation: 88 },
  { month: "Nov", fire: 94, earthquake: 89, flood: 90, evacuation: 92 },
  { month: "Dec", fire: 91, earthquake: 93, flood: 88, evacuation: 89 },
  { month: "Jan", fire: 95, earthquake: 96, flood: 92, evacuation: 0 },
]

export function DrillParticipationTracker() {
  const [selectedDrill, setSelectedDrill] = useState<DrillSession | null>(null)

  const getDrillTypeIcon = (type: DrillSession["type"]) => {
    switch (type) {
      case "fire":
        return "🔥"
      case "earthquake":
        return "🌍"
      case "flood":
        return "🌊"
      case "evacuation":
        return "🚪"
      default:
        return "⚠️"
    }
  }

  const getStatusBadge = (status: DrillSession["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const startDrill = (drill: DrillSession) => {
    alert(`Starting ${drill.type} drill for all students...`)
  }

  return (
    <div className="space-y-6">
      {/* Drill Sessions Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📅</span>
            Drill Sessions
          </CardTitle>
          <CardDescription>Track and manage emergency drill sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDrillSessions.map((drill) => (
              <div key={drill.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                <div className="text-2xl">{getDrillTypeIcon(drill.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium capitalize">{drill.type} Drill</h4>
                    {getStatusBadge(drill.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span>📅</span>
                      {drill.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🕒</span>
                      {drill.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>👥</span>
                      {drill.participants}/{drill.totalStudents}
                    </span>
                    {drill.status === "completed" && (
                      <span className="flex items-center gap-1">
                        <span>✅</span>
                        Avg: {drill.averageScore}%
                      </span>
                    )}
                  </div>
                  {drill.status === "completed" && (
                    <div className="mt-2">
                      <Progress value={(drill.participants / drill.totalStudents) * 100} className="h-2" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {drill.status === "scheduled" && (
                    <Button size="sm" onClick={() => startDrill(drill)}>
                      <span className="mr-2">▶️</span>
                      Start Now
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setSelectedDrill(drill)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Participation Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Participation Trends</CardTitle>
            <CardDescription>Monthly drill participation rates by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="fire" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="earthquake" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="flood" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="evacuation" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Average scores by drill type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { type: "Fire", score: 87, participation: 95 },
                  { type: "Earthquake", score: 92, participation: 96 },
                  { type: "Flood", score: 85, participation: 92 },
                  { type: "Evacuation", score: 89, participation: 89 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#10b981" />
                <Bar dataKey="participation" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✅</span>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Drills Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">👥</span>
              <div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">Avg Participation</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-orange-600">🕒</span>
              <div>
                <div className="text-2xl font-bold">11 min</div>
                <div className="text-sm text-muted-foreground">Avg Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-red-600">⚠️</span>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Upcoming Drills</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
