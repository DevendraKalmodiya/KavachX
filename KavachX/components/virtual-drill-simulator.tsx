"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface DrillStep {
  id: string
  title: string
  description: string
  duration: number
  completed: boolean
}

export function VirtualDrillSimulator() {
  const [currentDrill, setCurrentDrill] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timer, setTimer] = useState(0)

  const drills = {
    earthquake: {
      title: "Earthquake Evacuation Drill",
      description: "Learn and practice the Drop, Cover, and Hold procedure",
      steps: [
        {
          id: "drop",
          title: "Drop",
          description: "Immediately drop to your hands and knees",
          duration: 5,
          completed: false,
        },
        {
          id: "cover",
          title: "Take Cover",
          description: "Crawl under a sturdy desk or table for protection",
          duration: 10,
          completed: false,
        },
        {
          id: "hold",
          title: "Hold On",
          description: "Hold onto your shelter and protect your head and neck",
          duration: 15,
          completed: false,
        },
        {
          id: "evacuate",
          title: "Evacuate",
          description: "When shaking stops, evacuate using designated routes",
          duration: 30,
          completed: false,
        },
      ],
    },
    fire: {
      title: "Fire Evacuation Drill",
      description: "Practice safe evacuation procedures during a fire emergency",
      steps: [
        {
          id: "alert",
          title: "Sound Alert",
          description: "Activate fire alarm and alert others nearby",
          duration: 5,
          completed: false,
        },
        {
          id: "evacuate",
          title: "Evacuate Immediately",
          description: "Leave the building using nearest safe exit",
          duration: 20,
          completed: false,
        },
        {
          id: "assembly",
          title: "Assembly Point",
          description: "Gather at designated assembly point",
          duration: 10,
          completed: false,
        },
        {
          id: "headcount",
          title: "Head Count",
          description: "Ensure all students and staff are accounted for",
          duration: 15,
          completed: false,
        },
      ],
    },
  }

  const startDrill = (drillType: string) => {
    setCurrentDrill(drillType)
    setCurrentStep(0)
    setTimer(0)
    setIsRunning(true)
  }

  const resetDrill = () => {
    setCurrentDrill(null)
    setCurrentStep(0)
    setTimer(0)
    setIsRunning(false)
  }

  const drill = currentDrill ? drills[currentDrill as keyof typeof drills] : null

  return (
    <div className="space-y-6">
      {!currentDrill ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(drills).map(([key, drill]) => (
            <Card key={key} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{drill.title}</CardTitle>
                <CardDescription>{drill.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">{drill.steps.length} steps</div>
                  <Button className="w-full" onClick={() => startDrill(key)}>
                    <span className="mr-2">▶️</span>
                    Start Drill
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{drill?.title}</CardTitle>
                <CardDescription>{drill?.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={resetDrill}>
                <span className="mr-2">🔄</span>
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>
                  {currentStep + 1}/{drill?.steps.length}
                </span>
              </div>
              <Progress value={((currentStep + 1) / (drill?.steps.length || 1)) * 100} />
            </div>

            {/* Current Step */}
            {drill && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-primary">⚠️</span>
                    Step {currentStep + 1}: {drill.steps[currentStep]?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{drill.steps[currentStep]?.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Duration: {drill.steps[currentStep]?.duration}s</Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setIsRunning(!isRunning)}
                        variant={isRunning ? "secondary" : "default"}
                      >
                        {isRunning ? "⏸️" : "▶️"}
                        {isRunning ? "Pause" : "Start"}
                      </Button>
                      {currentStep < drill.steps.length - 1 && (
                        <Button size="sm" variant="outline" onClick={() => setCurrentStep(currentStep + 1)}>
                          Next Step
                        </Button>
                      )}
                      {currentStep === drill.steps.length - 1 && (
                        <Button size="sm" onClick={resetDrill} className="bg-primary">
                          <span className="mr-2">✅</span>
                          Complete Drill
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Steps Overview */}
            <div>
              <h4 className="font-semibold mb-3">Drill Steps Overview</h4>
              <div className="space-y-2">
                {drill?.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      index === currentStep ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        index < currentStep
                          ? "bg-primary text-primary-foreground"
                          : index === currentStep
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index < currentStep ? "✅" : index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-muted-foreground">{step.description}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {step.duration}s
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
