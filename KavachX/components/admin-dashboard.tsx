"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  BarChart3,
  Download,
  LogOut,
  Bell,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  MapPin,
  FileText,
  MessageCircle,
} from "lucide-react"
import type { User } from "@/lib/auth"
import { EmergencyAlertBroadcast } from "@/components/emergency-alert-broadcast"
import { StudentProgressTable } from "@/components/student-progress-table"
import { DrillParticipationTracker } from "@/components/drill-participation-tracker"
import { ChatBot } from "@/components/chat-bot"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [showAlertBroadcast, setShowAlertBroadcast] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false)
  const { t } = useLanguage()

  // Mock admin data
  const schoolStats = {
    totalStudents: 1250,
    activeStudents: 1180,
    completedDrills: 892,
    averageScore: 87,
    emergencyKits: 45,
    evacuationRoutes: 8,
    lastDrillDate: "2024-01-15",
    preparednessScore: 92,
  }

  const recentAlerts = [
    {
      id: "1",
      type: "Weather Alert",
      message: "Heavy rainfall expected in Delhi NCR region",
      timestamp: "2024-01-20 14:30",
      severity: "high",
      recipients: 1250,
    },
    {
      id: "2",
      type: "Drill Reminder",
      message: "Monthly fire drill scheduled for tomorrow",
      timestamp: "2024-01-19 09:00",
      severity: "medium",
      recipients: 1250,
    },
  ]

  const topPerformers = [
    { name: "Priya Sharma", class: "10-A", score: 98, badges: 5 },
    { name: "Arjun Patel", class: "9-B", score: 95, badges: 4 },
    { name: "Sneha Gupta", class: "10-C", score: 93, badges: 4 },
  ]

  const exportReport = (type: string) => {
    // Mock export functionality
    alert(`Exporting ${type} report... Download will start shortly.`)
  }

  return (
    <div className="min-h-screen bg-background admin-theme">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Shield className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t("adminDashboard")}</h1>
                <p className="text-sm text-gray-600">
                  {user.name} - {user.school}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatBot(true)}
                className="border-gray-200 hover:bg-gray-50"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Admin Assistant
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAlertBroadcast(true)}
                className="border-gray-200 hover:bg-gray-50"
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="border-gray-200 hover:bg-gray-50 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("totalStudents")}</p>
                  <p className="text-2xl font-bold text-gray-900">{schoolStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <div className="mt-2">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">
                  {schoolStats.activeStudents} Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drill Completion</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((schoolStats.completedDrills / schoolStats.totalStudents) * 100)}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
              <div className="mt-2">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">
                  {schoolStats.completedDrills} Completed
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{schoolStats.averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-600" />
              </div>
              <div className="mt-2">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">+5% from last month</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Preparedness Score</p>
                  <p className="text-2xl font-bold text-gray-900">{schoolStats.preparednessScore}%</p>
                </div>
                <Shield className="h-8 w-8 text-gray-600" />
              </div>
              <div className="mt-2">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">Excellent</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-50 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-gray-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-white data-[state=active]:text-gray-600">
              Students
            </TabsTrigger>
            <TabsTrigger value="drills" className="data-[state=active]:bg-white data-[state=active]:text-gray-600">
              Drills
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-white data-[state=active]:text-gray-600">
              Resources
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:text-gray-600">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Alerts */}
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Bell className="h-5 w-5 text-gray-600" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                        <AlertTriangle
                          className={`h-4 w-4 mt-0.5 ${alert.severity === "high" ? "text-red-500" : "text-yellow-600"}`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">{alert.type}</span>
                            <Badge
                              className={
                                alert.severity === "high"
                                  ? "bg-red-100 text-red-700 hover:bg-red-100"
                                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                              }
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{alert.timestamp}</span>
                            <span>{alert.recipients} recipients</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((student, index) => (
                      <div key={student.name} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 1
                                ? "bg-gray-100 text-gray-800"
                                : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-600">Class {student.class}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-700">{student.score}%</div>
                          <div className="text-xs text-gray-500">{student.badges} badges</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Status */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  Emergency Resources Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Emergency Kits</span>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        {schoolStats.emergencyKits} Available
                      </Badge>
                    </div>
                    <Progress value={90} className="h-2" />
                    <p className="text-xs text-gray-500">Last updated: Jan 15, 2024</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Evacuation Routes</span>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        {schoolStats.evacuationRoutes} Mapped
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-gray-500">All routes verified</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Last Drill</span>
                      <Badge variant="outline" className="border-gray-200">
                        {schoolStats.lastDrillDate}
                      </Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-500">Next drill due: Feb 15, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <StudentProgressTable />
          </TabsContent>

          {/* Drills Tab */}
          <TabsContent value="drills" className="space-y-6">
            <DrillParticipationTracker />
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Emergency Equipment</CardTitle>
                  <CardDescription className="text-gray-600">Manage and track emergency supplies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">First Aid Kits</div>
                        <div className="text-sm text-gray-600">45 units available</div>
                      </div>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Good</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Fire Extinguishers</div>
                        <div className="text-sm text-gray-600">28 units available</div>
                      </div>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Good</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Emergency Lights</div>
                        <div className="text-sm text-gray-600">12 units available</div>
                      </div>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Low Stock</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Evacuation Routes</CardTitle>
                  <CardDescription className="text-gray-600">Monitor and update evacuation pathways</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Main Building - Route A</div>
                        <div className="text-sm text-gray-600">Primary exit route</div>
                      </div>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Clear</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Main Building - Route B</div>
                        <div className="text-sm text-gray-600">Secondary exit route</div>
                      </div>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Clear</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Science Block - Route A</div>
                        <div className="text-sm text-gray-600">Laboratory exit route</div>
                      </div>
                      <Badge variant="outline" className="border-gray-200">
                        Under Review
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <FileText className="h-5 w-5 text-gray-600" />
                    Performance Reports
                  </CardTitle>
                  <CardDescription className="text-gray-600">Download detailed performance analytics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-200 hover:bg-gray-50"
                    onClick={() => exportReport("Student Performance")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Student Performance Report (CSV)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-200 hover:bg-gray-50"
                    onClick={() => exportReport("Drill Participation")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Drill Participation Report (PDF)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-200 hover:bg-gray-50"
                    onClick={() => exportReport("Preparedness Assessment")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Preparedness Assessment (CSV)
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                    Analytics Reports
                  </CardTitle>
                  <CardDescription className="text-gray-600">Generate custom analytics reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-200 hover:bg-gray-50"
                    onClick={() => exportReport("Monthly Summary")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Monthly Summary Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-200 hover:bg-gray-50"
                    onClick={() => exportReport("Risk Assessment")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Risk Assessment Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gray-200 hover:bg-gray-50"
                    onClick={() => exportReport("Compliance Report")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Compliance Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Emergency Alert Broadcast Modal */}
      {showAlertBroadcast && <EmergencyAlertBroadcast onClose={() => setShowAlertBroadcast(false)} />}

      {/* Admin Chat Bot */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  )
}
