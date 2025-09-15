"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const riskData = [
  { month: "Jan", earthquake: 20, flood: 15, fire: 10, cyclone: 5 },
  { month: "Feb", earthquake: 22, flood: 18, fire: 12, cyclone: 8 },
  { month: "Mar", earthquake: 25, flood: 25, fire: 15, cyclone: 12 },
  { month: "Apr", earthquake: 28, flood: 35, fire: 18, cyclone: 15 },
  { month: "May", earthquake: 30, flood: 45, fire: 25, cyclone: 20 },
  { month: "Jun", earthquake: 32, flood: 65, fire: 30, cyclone: 35 },
]

const currentRisks = [
  { type: "Earthquake", level: "Medium", probability: 28, icon: "🏠", color: "text-yellow-600" },
  { type: "Flood", level: "High", probability: 65, icon: "🌊", color: "text-blue-600" },
  { type: "Fire", level: "Low", probability: 15, icon: "🔥", color: "text-red-600" },
  { type: "Cyclone", level: "Medium", probability: 35, icon: "🌪️", color: "text-purple-600" },
]

export function RiskPredictionChart() {
  return (
    <div className="space-y-6">
      {/* Current Risk Levels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentRisks.map((risk) => {
          return (
            <Card key={risk.type}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{risk.icon}</span>
                  <span className="font-medium text-sm">{risk.type}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{risk.probability}%</div>
                  <Badge
                    variant={risk.level === "High" ? "destructive" : risk.level === "Medium" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {risk.level} Risk
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Risk Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Risk Trend Analysis</CardTitle>
          <CardDescription>AI-predicted disaster probabilities for Delhi NCR region</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earthquake" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="flood" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="fire" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="cyclone" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Regional Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Risk Comparison</CardTitle>
          <CardDescription>Current month risk levels across different regions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { region: "Delhi NCR", earthquake: 28, flood: 65, fire: 15, cyclone: 35 },
                { region: "Mumbai", earthquake: 15, flood: 45, fire: 25, cyclone: 55 },
                { region: "Chennai", earthquake: 20, flood: 40, fire: 20, cyclone: 70 },
                { region: "Kolkata", earthquake: 25, flood: 55, fire: 18, cyclone: 45 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earthquake" fill="#f59e0b" />
              <Bar dataKey="flood" fill="#3b82f6" />
              <Bar dataKey="fire" fill="#ef4444" />
              <Bar dataKey="cyclone" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
