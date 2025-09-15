"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, BarChart3, TrendingUp, Users } from "lucide-react"

const reportCategories = [
  {
    title: "System Performance Reports",
    description: "Comprehensive analysis of disaster preparedness system performance",
    reports: [
      {
        name: "Monthly System Overview",
        description: "Complete system performance metrics and trends",
        type: "PDF",
        size: "2.4 MB",
        lastGenerated: "2024-01-20",
      },
      {
        name: "Regional Comparison Analysis",
        description: "Comparative analysis across all regions",
        type: "CSV",
        size: "1.8 MB",
        lastGenerated: "2024-01-19",
      },
      {
        name: "Preparedness Score Trends",
        description: "Historical preparedness score analysis",
        type: "PDF",
        size: "3.1 MB",
        lastGenerated: "2024-01-18",
      },
    ],
  },
  {
    title: "Emergency Response Analytics",
    description: "Detailed analysis of emergency response effectiveness",
    reports: [
      {
        name: "Response Time Analysis",
        description: "Emergency response time metrics and optimization",
        type: "PDF",
        size: "2.8 MB",
        lastGenerated: "2024-01-20",
      },
      {
        name: "Incident Response Logs",
        description: "Complete log of all emergency incidents and responses",
        type: "CSV",
        size: "4.2 MB",
        lastGenerated: "2024-01-20",
      },
      {
        name: "Resource Utilization Report",
        description: "Analysis of emergency resource deployment and usage",
        type: "PDF",
        size: "2.1 MB",
        lastGenerated: "2024-01-19",
      },
    ],
  },
  {
    title: "Compliance & Audit Reports",
    description: "Regulatory compliance and audit documentation",
    reports: [
      {
        name: "Compliance Status Report",
        description: "Current compliance status across all regions",
        type: "PDF",
        size: "1.9 MB",
        lastGenerated: "2024-01-17",
      },
      {
        name: "Audit Trail Report",
        description: "Complete audit trail of system activities",
        type: "CSV",
        size: "5.1 MB",
        lastGenerated: "2024-01-15",
      },
      {
        name: "Risk Assessment Summary",
        description: "Comprehensive risk assessment across regions",
        type: "PDF",
        size: "3.5 MB",
        lastGenerated: "2024-01-16",
      },
    ],
  },
  {
    title: "Statistical Analysis",
    description: "Advanced statistical analysis and predictive insights",
    reports: [
      {
        name: "Predictive Risk Analysis",
        description: "AI-powered risk prediction and trend analysis",
        type: "PDF",
        size: "4.8 MB",
        lastGenerated: "2024-01-20",
      },
      {
        name: "Student Engagement Statistics",
        description: "Detailed analysis of student participation and engagement",
        type: "CSV",
        size: "2.3 MB",
        lastGenerated: "2024-01-19",
      },
      {
        name: "Drill Effectiveness Analysis",
        description: "Statistical analysis of drill effectiveness and outcomes",
        type: "PDF",
        size: "2.7 MB",
        lastGenerated: "2024-01-18",
      },
    ],
  },
]

export function GovernmentReports() {
  const downloadReport = (reportName: string) => {
    alert(`Downloading ${reportName}... Download will start shortly.`)
  }

  const generateCustomReport = () => {
    alert("Custom report generator will be available soon.")
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">47</div>
                <div className="text-sm text-muted-foreground">Reports Generated</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Analytics Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Trend Analysis</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-muted-foreground">Compliance Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Custom Report Generator
          </CardTitle>
          <CardDescription>Generate custom reports based on specific criteria and timeframes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={generateCustomReport}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Custom Report
            </Button>
            <div className="text-sm text-muted-foreground">
              Create reports with custom date ranges, regions, and metrics
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      {reportCategories.map((category) => (
        <Card key={category.title}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.reports.map((report) => (
                <div key={report.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Size: {report.size}</span>
                      <span>Last generated: {report.lastGenerated}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => downloadReport(report.name)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
