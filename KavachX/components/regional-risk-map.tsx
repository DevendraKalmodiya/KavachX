"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const regionRisks = [
  {
    name: "Delhi NCR",
    position: { x: 45, y: 35 },
    risks: {
      earthquake: 28,
      flood: 65,
      fire: 15,
      cyclone: 20,
    },
    overallRisk: "medium",
    schools: 485,
    alerts: 3,
  },
  {
    name: "Mumbai",
    position: { x: 25, y: 55 },
    risks: {
      earthquake: 15,
      flood: 85,
      fire: 25,
      cyclone: 70,
    },
    overallRisk: "high",
    schools: 392,
    alerts: 5,
  },
  {
    name: "Chennai",
    position: { x: 50, y: 75 },
    risks: {
      earthquake: 20,
      flood: 40,
      fire: 20,
      cyclone: 85,
    },
    overallRisk: "high",
    schools: 318,
    alerts: 4,
  },
  {
    name: "Kolkata",
    position: { x: 70, y: 45 },
    risks: {
      earthquake: 25,
      flood: 70,
      fire: 18,
      cyclone: 45,
    },
    overallRisk: "medium",
    schools: 275,
    alerts: 2,
  },
  {
    name: "Bangalore",
    position: { x: 45, y: 65 },
    risks: {
      earthquake: 18,
      flood: 30,
      fire: 22,
      cyclone: 25,
    },
    overallRisk: "low",
    schools: 298,
    alerts: 1,
  },
]

export function RegionalRiskMap() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHighestRisk = (risks: any) => {
    const riskTypes = Object.entries(risks)
    const highest = riskTypes.reduce((max, [type, value]) => (value > max.value ? { type, value } : max), {
      type: "",
      value: 0,
    })
    return highest
  }

  return (
    <div className="space-y-6">
      {/* Interactive Map */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-[400px]">
        <div className="absolute inset-0 bg-[url('/india-map-outline.jpg')] bg-center bg-no-repeat bg-contain opacity-10" />

        {regionRisks.map((region) => {
          const highestRisk = getHighestRisk(region.risks)
          return (
            <div
              key={region.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${region.position.x}%`, top: `${region.position.y}%` }}
            >
              <div className={`w-4 h-4 rounded-full ${getRiskColor(region.overallRisk)} pulse`} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Card className="w-64 shadow-lg">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{region.name}</h4>
                        <Badge
                          variant={region.overallRisk === "high" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {region.overallRisk} risk
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>Schools: {region.schools}</div>
                        <div>Active Alerts: {region.alerts}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium">Risk Breakdown:</div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-600">🏠</span>
                            Earthquake: {region.risks.earthquake}%
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-blue-600">🌊</span>
                            Flood: {region.risks.flood}%
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-red-600">🔥</span>
                            Fire: {region.risks.fire}%
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-purple-600">🌪️</span>
                            Cyclone: {region.risks.cyclone}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">Risk Levels:</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm">High</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Hover over regions for detailed risk breakdown</div>
      </div>
    </div>
  )
}
