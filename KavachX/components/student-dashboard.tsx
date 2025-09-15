"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User } from "@/lib/auth"
import { ChatBot } from "@/components/chat-bot"
import { RiskPredictionChart } from "@/components/risk-prediction-chart"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { QuizComponent } from "@/components/quiz-component"
import { ThreeDGamesHub } from "@/components/3d-games-hub"
import {
  GraduationCap,
  Shield,
  Trophy,
  Medal,
  BookOpen,
  Gamepad2,
  TrendingUp,
  MessageCircle,
  LogOut,
  AlertTriangle,
} from "lucide-react"

interface StudentDashboardProps {
  user: User
  onLogout: () => void
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [showChatBot, setShowChatBot] = useState(false)
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const { t } = useLanguage()

  // Mock student data
  const studentProgress = {
    totalModules: 12,
    completedModules: 8,
    totalDrills: 6,
    completedDrills: 4,
    points: 850,
    badges: ["Fire Safety Expert", "Earthquake Preparedness", "First Aid Champion"],
    rank: 2,
    certificates: 3,
  }

  const learningModules = [
    {
      id: "earthquake",
      title: "Earthquake Safety",
      description: "Learn how to stay safe during earthquakes",
      progress: 100,
      completed: true,
      points: 150,
    },
    {
      id: "fire",
      title: "Fire Emergency Response",
      description: "Fire safety protocols and evacuation procedures",
      progress: 100,
      completed: true,
      points: 120,
    },
    {
      id: "flood",
      title: "Flood Preparedness",
      description: "Understanding flood risks and safety measures",
      progress: 75,
      completed: false,
      points: 90,
    },
    {
      id: "cyclone",
      title: "Cyclone Safety",
      description: "Preparing for and responding to cyclones",
      progress: 0,
      completed: false,
      points: 0,
    },
  ]

  const virtualDrills = [
    {
      id: "earthquake-drill",
      title: "Earthquake Evacuation Drill",
      description: "Practice drop, cover, and hold procedures",
      completed: true,
      duration: "5 min",
      score: 95,
    },
    {
      id: "fire-drill",
      title: "Fire Evacuation Drill",
      description: "Learn evacuation routes and assembly points",
      completed: true,
      duration: "7 min",
      score: 88,
    },
    {
      id: "flood-drill",
      title: "Flood Response Drill",
      description: "Emergency response to flooding scenarios",
      completed: false,
      duration: "6 min",
      score: null,
    },
  ]

  const generateCertificate = (moduleId: string) => {
    // Mock certificate generation
    const module = learningModules.find((m) => m.id === moduleId)
    if (module) {
      alert(`Certificate generated for ${module.title}! Download will start shortly.`)
    }
  }

  return (
    <div className="min-h-screen bg-background student-theme">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <GraduationCap className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t("studentDashboard")}</h1>
                <p className="text-sm text-gray-600">
                  {t("welcomeStudent")}, {user.name}
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
                Help
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

      {/* Emergency Alert Banner */}
      <Alert className="m-6 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="font-medium text-red-800">
          <strong>Weather Alert:</strong> Heavy rainfall expected in Delhi NCR region. Review flood safety protocols.
        </AlertDescription>
      </Alert>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Progress Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Trophy className="h-5 w-5 text-emerald-600" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3 text-gray-600">
                    <span>Learning Modules</span>
                    <span className="font-medium">
                      {studentProgress.completedModules}/{studentProgress.totalModules}
                    </span>
                  </div>
                  <Progress
                    value={(studentProgress.completedModules / studentProgress.totalModules) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3 text-gray-600">
                    <span>Virtual Drills</span>
                    <span className="font-medium">
                      {studentProgress.completedDrills}/{studentProgress.totalDrills}
                    </span>
                  </div>
                  <Progress
                    value={(studentProgress.completedDrills / studentProgress.totalDrills) * 100}
                    className="h-2"
                  />
                </div>
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Points</span>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      {studentProgress.points} pts
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Class Rank</span>
                    <Badge variant="outline" className="border-gray-200">
                      #{studentProgress.rank}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges Card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Medal className="h-5 w-5 text-emerald-600" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentProgress.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="w-full justify-start py-2 border-emerald-200 text-emerald-700"
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="learning" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 p-1">
                <TabsTrigger
                  value="learning"
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-600"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learning
                </TabsTrigger>
                <TabsTrigger
                  value="drills"
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-600"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Drills
                </TabsTrigger>
                <TabsTrigger
                  value="games"
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-600"
                >
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Games
                </TabsTrigger>
                <TabsTrigger value="risk" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Risk
                </TabsTrigger>
              </TabsList>

              {/* Learning Modules Tab */}
              <TabsContent value="learning" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Gamified Learning Modules</h2>
                  <Card className="mb-8 border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <BookOpen className="h-5 w-5 text-emerald-600" />
                        {t("practiceQuiz")}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Test your disaster preparedness knowledge with our interactive quiz
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <QuizComponent
                        onComplete={(result) => {
                          console.log("Quiz completed with score:", result.score)
                        }}
                      />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {learningModules.map((module) => (
                      <Card key={module.id} className="hover:shadow-md transition-all duration-200 border-gray-200">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg text-gray-900">{module.title}</CardTitle>
                              <CardDescription className="text-gray-600">{module.description}</CardDescription>
                            </div>
                            {module.completed && (
                              <div className="p-1 bg-emerald-100 rounded-full">
                                <Shield className="h-4 w-4 text-emerald-600" />
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2 text-gray-600">
                                <span>Progress</span>
                                <span className="font-medium">{module.progress}%</span>
                              </div>
                              <Progress value={module.progress} className="h-2" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                {module.points} points
                              </Badge>
                              <div className="flex gap-2">
                                {module.completed ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => generateCertificate(module.id)}
                                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                  >
                                    Certificate
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => setActiveModule(module.id)}
                                    className="bg-emerald-600 hover:bg-emerald-700"
                                  >
                                    {module.progress > 0 ? "Continue" : "Start"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Virtual Drills Tab */}
              <TabsContent value="drills" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Virtual Drill Simulations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {virtualDrills.map((drill) => (
                      <Card key={drill.id} className="hover:shadow-md transition-all duration-200 border-gray-200">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg text-gray-900">{drill.title}</CardTitle>
                              <CardDescription className="text-gray-600">{drill.description}</CardDescription>
                            </div>
                            {drill.completed && (
                              <div className="p-1 bg-emerald-100 rounded-full">
                                <Shield className="h-4 w-4 text-emerald-600" />
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>Duration: {drill.duration}</span>
                              {drill.score && (
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                  Score: {drill.score}%
                                </Badge>
                              )}
                            </div>
                            <Button
                              className={`w-full ${
                                drill.completed
                                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  : "bg-emerald-600 hover:bg-emerald-700"
                              }`}
                              variant={drill.completed ? "outline" : "default"}
                            >
                              {drill.completed ? "Practice Again" : "Start Drill"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* 3D Games Tab */}
              <TabsContent value="games" className="space-y-6">
                <ThreeDGamesHub />
              </TabsContent>

              {/* Risk Prediction Tab */}
              <TabsContent value="risk" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">AI-Powered Risk Prediction</h2>
                  <Card className="border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Regional Risk Assessment - {user.school}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Real-time disaster risk analysis for your region
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RiskPredictionChart />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Chat Bot */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  )
}
