"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { EvacuationGame } from "./3d-games/evacuation-game"
import { HazardGame } from "./3d-games/hazard-game"
import { useLanguage } from "@/contexts/language-context"
import { Trophy, Clock, Target, Zap, Shield, AlertTriangle, Gamepad2 } from "lucide-react"

interface GameScore {
  game: string
  score: number
  timestamp: Date
  difficulty: string
  timeSpent: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  requirement: string
}

export function ThreeDGamesHub() {
  const { t } = useLanguage()
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [gameDifficulty, setGameDifficulty] = useState<string>("normal")
  const [gameScores, setGameScores] = useState<GameScore[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_evacuation",
      name: "First Evacuation",
      description: "Complete your first evacuation drill",
      icon: "🏃‍♂️",
      unlocked: false,
      requirement: "Complete evacuation game once",
    },
    {
      id: "speed_demon",
      name: "Speed Demon",
      description: "Complete evacuation in under 30 seconds",
      icon: "⚡",
      unlocked: false,
      requirement: "Evacuation time < 30s",
    },
    {
      id: "hazard_expert",
      name: "Hazard Expert",
      description: "Identify all hazards in one game",
      icon: "🔍",
      unlocked: false,
      requirement: "100% hazard identification",
    },
    {
      id: "perfect_score",
      name: "Perfect Score",
      description: "Achieve maximum score in any game",
      icon: "🏆",
      unlocked: false,
      requirement: "Score 100 points",
    },
    {
      id: "dedicated_learner",
      name: "Dedicated Learner",
      description: "Play games for 30 minutes total",
      icon: "📚",
      unlocked: false,
      requirement: "30 minutes total playtime",
    },
  ])

  const handleGameComplete = (game: string, score: number, timeSpent: number) => {
    const newScore: GameScore = {
      game,
      score,
      timestamp: new Date(),
      difficulty: gameDifficulty,
      timeSpent,
    }
    setGameScores((prev) => [...prev, newScore])

    // Check for achievements
    checkAchievements(game, score, timeSpent)
  }

  const checkAchievements = (game: string, score: number, timeSpent: number) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.unlocked) return achievement

        let shouldUnlock = false

        switch (achievement.id) {
          case "first_evacuation":
            shouldUnlock = game === "evacuation"
            break
          case "speed_demon":
            shouldUnlock = game === "evacuation" && timeSpent < 30
            break
          case "hazard_expert":
            shouldUnlock = game === "hazard" && score >= 95
            break
          case "perfect_score":
            shouldUnlock = score === 100
            break
          case "dedicated_learner":
            const totalTime = gameScores.reduce((sum, s) => sum + s.timeSpent, 0) + timeSpent
            shouldUnlock = totalTime >= 1800 // 30 minutes
            break
        }

        return { ...achievement, unlocked: shouldUnlock }
      }),
    )
  }

  const getHighScore = (game: string) => {
    const filteredScores = gameScores.filter((s) => s.game === game)
    return filteredScores.length > 0 ? Math.max(...filteredScores.map((s) => s.score)) : 0
  }

  const getAverageScore = (game: string) => {
    const filteredScores = gameScores.filter((s) => s.game === game)
    if (filteredScores.length === 0) return 0
    return Math.round(filteredScores.reduce((sum, s) => sum + s.score, 0) / filteredScores.length)
  }

  const getTotalPlayTime = () => {
    return gameScores.reduce((sum, s) => sum + s.timeSpent, 0)
  }

  const getUnlockedAchievements = () => {
    return achievements.filter((a) => a.unlocked).length
  }

  if (activeGame === "evacuation") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setActiveGame(null)} className="border-gray-200 hover:bg-gray-50">
              ← Back to Games
            </Button>
            <h2 className="text-xl font-semibold text-gray-900">School Evacuation Challenge</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Difficulty: {gameDifficulty}</Badge>
          </div>
        </div>
        <EvacuationGame
          onComplete={(score, timeSpent) => handleGameComplete("evacuation", score, timeSpent)}
          difficulty={gameDifficulty}
        />
      </div>
    )
  }

  if (activeGame === "hazard") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setActiveGame(null)} className="border-gray-200 hover:bg-gray-50">
              ← Back to Games
            </Button>
            <h2 className="text-xl font-semibold text-gray-900">Hazard Identification Challenge</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Difficulty: {gameDifficulty}</Badge>
          </div>
        </div>
        <HazardGame
          onComplete={(score, timeSpent) => handleGameComplete("hazard", score, timeSpent)}
          difficulty={gameDifficulty}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">{t("gamesTitle")}</h2>
        <p className="text-gray-600 text-lg">{t("gamesDescription")}</p>
      </div>

      {/* Player Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{getUnlockedAchievements()}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{Math.round(getTotalPlayTime() / 60)}m</div>
            <div className="text-sm text-gray-600">Play Time</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{gameScores.length}</div>
            <div className="text-sm text-gray-600">Games Played</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {gameScores.length > 0
                ? Math.round(gameScores.reduce((sum, s) => sum + s.score, 0) / gameScores.length)
                : 0}
            </div>
            <div className="text-sm text-gray-600">Avg Score</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="games" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-50 p-1">
          <TabsTrigger value="games" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">
            <Gamepad2 className="h-4 w-4 mr-2" />
            Games
          </TabsTrigger>
          <TabsTrigger value="scores" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">
            <Target className="h-4 w-4 mr-2" />
            Scores
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-white data-[state=active]:text-emerald-600"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="space-y-6">
          {/* Difficulty Selector */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Shield className="h-5 w-5 text-emerald-600" />
                Difficulty Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={gameDifficulty === "easy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGameDifficulty("easy")}
                  className={
                    gameDifficulty === "easy"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                >
                  Easy
                </Button>
                <Button
                  variant={gameDifficulty === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGameDifficulty("normal")}
                  className={
                    gameDifficulty === "normal"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                >
                  Normal
                </Button>
                <Button
                  variant={gameDifficulty === "hard" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGameDifficulty("hard")}
                  className={
                    gameDifficulty === "hard"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                >
                  Hard
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Evacuation Game */}
            <Card className="hover:shadow-lg transition-all duration-200 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  Evacuation Challenge
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Navigate through a virtual school during an emergency evacuation. Practice finding exits and moving
                  safely through obstacles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    3D Simulation
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    Best: {getHighScore("evacuation")}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">High Score</span>
                    <span className="font-medium text-gray-900">{getHighScore("evacuation")}/100</span>
                  </div>
                  <Progress value={getHighScore("evacuation")} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium text-gray-900">{getAverageScore("evacuation")}/100</span>
                  </div>
                  <Progress value={getAverageScore("evacuation")} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-600">WASD movement controls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600">Find the exit quickly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="text-gray-600">Avoid obstacles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-gray-600">Score based on time & safety</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setActiveGame("evacuation")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Play Evacuation Game
                </Button>
              </CardContent>
            </Card>

            {/* Hazard Identification Game */}
            <Card className="hover:shadow-lg transition-all duration-200 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  Hazard Hunter
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Explore a 3D environment and identify potential safety hazards. Train your eye to spot dangers before
                  they become emergencies.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-red-200 text-red-700">
                    3D Exploration
                  </Badge>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Best: {getHighScore("hazard")}</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">High Score</span>
                    <span className="font-medium text-gray-900">{getHighScore("hazard")}/100</span>
                  </div>
                  <Progress value={getHighScore("hazard")} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium text-gray-900">{getAverageScore("hazard")}/100</span>
                  </div>
                  <Progress value={getAverageScore("hazard")} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-gray-600">Fire hazards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-600">Electrical dangers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-gray-600">Chemical risks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-gray-600">Structural hazards</span>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setActiveGame("hazard")}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Play Hazard Game
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scores" className="space-y-6">
          {gameScores.length === 0 ? (
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <Gamepad2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No games played yet. Start playing to see your scores!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Game History</h3>
              <div className="space-y-3">
                {gameScores
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .map((score, index) => (
                    <Card key={index} className="border-gray-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${score.game === "evacuation" ? "bg-blue-100" : "bg-red-100"}`}
                            >
                              {score.game === "evacuation" ? (
                                <Shield className="h-4 w-4 text-blue-600" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {score.game === "evacuation" ? "Evacuation Challenge" : "Hazard Hunter"}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{score.timestamp.toLocaleDateString()}</span>
                                <span>{Math.round(score.timeSpent)}s</span>
                                <Badge variant="outline" className="text-xs">
                                  {score.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Badge
                            className={`text-lg ${
                              score.score >= 90
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : score.score >= 70
                                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                  : "bg-red-100 text-red-700 hover:bg-red-100"
                            }`}
                          >
                            {score.score} pts
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-gray-200 shadow-sm ${
                    achievement.unlocked ? "bg-green-50 border-green-200" : "bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${achievement.unlocked ? "text-green-800" : "text-gray-600"}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${achievement.unlocked ? "text-green-700" : "text-gray-500"}`}>
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.requirement}</p>
                      </div>
                      {achievement.unlocked && <Badge className="bg-green-600 hover:bg-green-600">Unlocked</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
