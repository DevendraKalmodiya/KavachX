"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Clock, Users, MapPin, AlertTriangle } from "lucide-react"

interface CoordinationLog {
  id: string
  timestamp: string
  type: "alert" | "response" | "drill" | "resource"
  title: string
  description: string
  region: string
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "in-progress" | "completed" | "cancelled"
  assignedTo: string
  affectedEntities: number
}

const mockLogs: CoordinationLog[] = [
  {
    id: "1",
    timestamp: "2024-01-20 15:30",
    type: "alert",
    title: "Flood Warning Issued",
    description: "Heavy rainfall alert issued for Mumbai region affecting 45 schools",
    region: "Mumbai",
    priority: "high",
    status: "in-progress",
    assignedTo: "Regional Emergency Team",
    affectedEntities: 45,
  },
  {
    id: "2",
    timestamp: "2024-01-20 14:15",
    type: "response",
    title: "Emergency Drill Coordination",
    description: "Coordinated earthquake drill across 125 schools in Delhi NCR",
    region: "Delhi NCR",
    priority: "medium",
    status: "completed",
    assignedTo: "Delhi Disaster Management",
    affectedEntities: 125,
  },
  {
    id: "3",
    timestamp: "2024-01-20 12:45",
    type: "resource",
    title: "Emergency Kit Distribution",
    description: "Distributed 500 emergency kits to schools in Chennai region",
    region: "Chennai",
    priority: "medium",
    status: "completed",
    assignedTo: "Chennai Relief Operations",
    affectedEntities: 78,
  },
  {
    id: "4",
    timestamp: "2024-01-20 10:30",
    type: "drill",
    title: "Fire Safety Training",
    description: "Conducted fire safety training for 25 schools in Bangalore",
    region: "Bangalore",
    priority: "low",
    status: "completed",
    assignedTo: "Bangalore Fire Department",
    affectedEntities: 25,
  },
  {
    id: "5",
    timestamp: "2024-01-19 18:45",
    type: "alert",
    title: "Cyclone Warning",
    description: "Cyclone alert issued for Chennai coastal areas",
    region: "Chennai",
    priority: "critical",
    status: "in-progress",
    assignedTo: "State Emergency Response",
    affectedEntities: 78,
  },
]

export function EmergencyCoordinationLogs() {
  const [logs, setLogs] = useState<CoordinationLog[]>(mockLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || log.type === typeFilter
    const matchesPriority = priorityFilter === "all" || log.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || log.status === statusFilter

    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  const getTypeIcon = (type: CoordinationLog["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "response":
        return <Users className="h-4 w-4 text-blue-600" />
      case "drill":
        return <FileText className="h-4 w-4 text-green-600" />
      case "resource":
        return <MapPin className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getPriorityBadge = (priority: CoordinationLog["priority"]) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: CoordinationLog["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Emergency Coordination Logs
        </CardTitle>
        <CardDescription>Track disaster response actions and coordination efforts</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full lg:w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="response">Responses</SelectItem>
              <SelectItem value="drill">Drills</SelectItem>
              <SelectItem value="resource">Resources</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full lg:w-[150px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50">
              <div className="mt-1">{getTypeIcon(log.type)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{log.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {getPriorityBadge(log.priority)}
                    {getStatusBadge(log.status)}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {log.timestamp}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {log.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {log.affectedEntities} entities
                  </div>
                  <div>Assigned to: {log.assignedTo}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No coordination logs found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
