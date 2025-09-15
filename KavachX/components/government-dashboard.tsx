"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Building2,
  Users,
  MapPin,
  TrendingUp,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"
import type { User } from "@/lib/auth"
import { RegionalRiskMap } from "@/components/regional-risk-map"
import { SystemWideStatus } from "@/components/system-wide-status"
import { EmergencyCoordinationLogs } from "@/components/emergency-coordination-logs"
import { GovernmentReports } from "@/components/government-reports"

interface GovernmentDashboardProps {
  user: User
  onLogout: () => void
}

export function GovernmentDashboard({ user, onLogout }: GovernmentDashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")

  // Mock government data
  const systemStats = {
    totalSchools: 2847,
    enrolledSchools: 2654,
    totalStudents: 1250000,
    activeStudents: 1180000,
    drillsPerformed: 15420,
    averagePreparedness: 87,
    criticalAlerts: 12,
    responseTime: "4.2 min",
  }

  const regionData = [
    {
      name: "Delhi NCR",
      schools: 485,
      students: 285000,
      preparedness: 92,
      riskLevel: "medium",
      lastDrill: "2024-01-18",
      alerts: 3,
    },
    {
      name: "Mumbai",
      schools: 392,
      students: 198000,
      preparedness: 89,
      riskLevel: "high",
      lastDrill: "2024-01-15",
      alerts: 5,
    },
    {
      name: "Chennai",
      schools: 318,
      students: 165000,
      preparedness: 85,
      riskLevel: "high",
      lastDrill: "2024-01-20",
      alerts: 4,
    },
    {
      name: "Kolkata",
      schools: 275,
      students: 142000,
      preparedness: 83,
      riskLevel: "medium",
      lastDrill: "2024-01-17",
      alerts: 2,
    },
    {
      name: "Bangalore",
      schools: 298,
      students: 178000,
      preparedness: 90,
      riskLevel: "low",
      lastDrill: "2024-01-19",
      alerts: 1,
    },
  ]

  const recentIncidents = [
    {
      id: "1",
      type: "Flood Alert",
      region: "Mumbai",
      severity: "high",
      timestamp: "2024-01-20 15:30",
      status: "active",
      affectedSchools: 45,
      responseActions: 3,
    },
    {
      id: "2",
      type: "Earthquake Drill",
      region: "Delhi NCR",
      severity: "medium",
      timestamp: "2024-01-20 10:00",
      status: "completed",
      affectedSchools: 125,
      responseActions: 1,
    },
    {
      id: "3",
      type: "Cyclone Warning",
      region: "Chennai",
      severity: "high",
      timestamp: "2024-01-19 18:45",
      status: "monitoring",
      affectedSchools: 78,
      responseActions: 2,
    },
  ]

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Low Risk
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium Risk
          </Badge>
        )
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "monitoring":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Monitoring
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Government Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {user.name} - {user.region} Authority
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="kolkata">Kolkata</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* System-Wide Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enrolled Schools</p>
                  <p className="text-2xl font-bold">{systemStats.enrolledSchools.toLocaleString()}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {Math.round((systemStats.enrolledSchools / systemStats.totalSchools) * 100)}% Coverage
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">{(systemStats.activeStudents / 1000000).toFixed(1)}M</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {Math.round((systemStats.activeStudents / systemStats.totalStudents) * 100)}% Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drills Performed</p>
                  <p className="text-2xl font-bold">{systemStats.drillsPerformed.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  This Month
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Preparedness</p>
                  <p className="text-2xl font-bold">{systemStats.averagePreparedness}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  +3% from last month
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regions">Regional Data</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="coordination">Coordination</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Risk Map */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Regional Risk Assessment
                  </CardTitle>
                  <CardDescription>Real-time disaster risk analysis across regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <RegionalRiskMap />
                </CardContent>
              </Card>
            </div>

            {/* System-Wide Status */}
            <SystemWideStatus />
          </TabsContent>

          {/* Regional Data Tab */}
          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance Overview</CardTitle>
                <CardDescription>Disaster preparedness metrics by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Region</th>
                        <th className="text-left p-3 font-medium">Schools</th>
                        <th className="text-left p-3 font-medium">Students</th>
                        <th className="text-left p-3 font-medium">Preparedness</th>
                        <th className="text-left p-3 font-medium">Risk Level</th>
                        <th className="text-left p-3 font-medium">Last Drill</th>
                        <th className="text-left p-3 font-medium">Active Alerts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionData.map((region) => (
                        <tr key={region.name} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{region.name}</td>
                          <td className="p-3">{region.schools}</td>
                          <td className="p-3">{region.students.toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{region.preparedness}%</span>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  region.preparedness >= 90
                                    ? "bg-green-500"
                                    : region.preparedness >= 80
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                            </div>
                          </td>
                          <td className="p-3">{getRiskBadge(region.riskLevel)}</td>
                          <td className="p-3">{region.lastDrill}</td>
                          <td className="p-3">
                            <Badge variant={region.alerts > 3 ? "destructive" : "secondary"}>{region.alerts}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Incidents & Alerts
                </CardTitle>
                <CardDescription>Monitor active incidents and emergency responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <AlertTriangle
                        className={`h-5 w-5 mt-0.5 ${
                          incident.severity === "high" ? "text-destructive" : "text-yellow-600"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{incident.type}</h4>
                          <Badge variant="outline">{incident.region}</Badge>
                          {getStatusBadge(incident.status)}
                          <Badge
                            variant={incident.severity === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {incident.severity}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {incident.timestamp}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {incident.affectedSchools} schools
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {incident.responseActions} actions
                          </div>
                          <div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coordination Tab */}
          <TabsContent value="coordination" className="space-y-6">
            <EmergencyCoordinationLogs />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <GovernmentReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
