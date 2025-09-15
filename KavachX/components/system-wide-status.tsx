"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const statusData = [
  { name: "Safe", value: 2456, color: "#10b981" },
  { name: "At Risk", value: 156, color: "#f59e0b" },
  { name: "Unresponsive", value: 42, color: "#ef4444" },
]

const preparednessData = [
  { region: "Delhi NCR", score: 92, schools: 485 },
  { region: "Mumbai", score: 89, schools: 392 },
  { region: "Bangalore", score: 90, schools: 298 },
  { region: "Chennai", score: 85, schools: 318 },
  { region: "Kolkata", score: 83, schools: 275 },
]

export function SystemWideStatus() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* School Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏢</span>
            School Status Distribution
          </CardTitle>
          <CardDescription>Current safety status across all enrolled schools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.value} schools</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Preparedness Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🛡️</span>
            Regional Preparedness Scores
          </CardTitle>
          <CardDescription>Average preparedness scores by region</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={preparednessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Critical Metrics */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>⚠️</span>
            Critical System Metrics
          </CardTitle>
          <CardDescription>Key performance indicators requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Emergency Response Time</span>
                <Badge variant="secondary">4.2 min avg</Badge>
              </div>
              <Progress value={85} />
              <p className="text-xs text-muted-foreground">Target: &lt;5 minutes</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Drill Compliance Rate</span>
                <Badge variant="secondary">94%</Badge>
              </div>
              <Progress value={94} />
              <p className="text-xs text-muted-foreground">Target: &gt;95%</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Resource Availability</span>
                <Badge variant="secondary">87%</Badge>
              </div>
              <Progress value={87} />
              <p className="text-xs text-muted-foreground">Target: &gt;90%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
