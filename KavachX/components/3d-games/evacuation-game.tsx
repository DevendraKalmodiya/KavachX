"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Box, Plane, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type * as THREE from "three"
import { Shield, Clock, Target, AlertTriangle } from "lucide-react"

interface PlayerProps {
  position: [number, number, number]
  onMove: (position: [number, number, number]) => void
}

function Player({ position, onMove }: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position)
      // Follow camera
      camera.position.set(position[0], position[1] + 3, position[2] + 5)
      camera.lookAt(position[0], position[1], position[2])
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <capsuleGeometry args={[0.3, 1]} />
      <meshStandardMaterial color="#059669" />
    </mesh>
  )
}

interface ObstacleProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}

function Obstacle({ position, size, color }: ObstacleProps) {
  return (
    <Box args={size} position={position}>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

interface SchoolRoomProps {
  difficulty: string
}

function SchoolRoom({ difficulty }: SchoolRoomProps) {
  const obstacles =
    difficulty === "easy"
      ? []
      : difficulty === "normal"
        ? [
            {
              position: [0, 0.5, 0] as [number, number, number],
              size: [1, 1, 3] as [number, number, number],
              color: "#ef4444",
            },
            {
              position: [-3, 0.5, 3] as [number, number, number],
              size: [2, 1, 1] as [number, number, number],
              color: "#f59e0b",
            },
          ]
        : [
            {
              position: [0, 0.5, 0] as [number, number, number],
              size: [1, 1, 3] as [number, number, number],
              color: "#ef4444",
            },
            {
              position: [-3, 0.5, 3] as [number, number, number],
              size: [2, 1, 1] as [number, number, number],
              color: "#f59e0b",
            },
            {
              position: [3, 0.5, -3] as [number, number, number],
              size: [1, 1, 2] as [number, number, number],
              color: "#8b5cf6",
            },
            {
              position: [-1, 0.5, -5] as [number, number, number],
              size: [3, 1, 1] as [number, number, number],
              color: "#06b6d4",
            },
          ]

  return (
    <group>
      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f1f5f9" />
      </Plane>

      {/* Walls */}
      <Plane args={[20, 4]} position={[0, 2, -10]}>
        <meshStandardMaterial color="#ffffff" />
      </Plane>
      <Plane args={[20, 4]} position={[0, 2, 10]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Plane>
      <Plane args={[20, 4]} position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Plane>
      <Plane args={[20, 4]} position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Plane>

      {/* Desks */}
      {Array.from({ length: difficulty === "easy" ? 8 : 12 }, (_, i) => {
        const row = Math.floor(i / 4)
        const col = i % 4
        return (
          <Box key={i} args={[1.5, 0.8, 1]} position={[-4.5 + col * 3, 0.4, -6 + row * 4]}>
            <meshStandardMaterial color="#e5e7eb" />
          </Box>
        )
      })}

      {/* Dynamic obstacles based on difficulty */}
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} {...obstacle} />
      ))}

      {/* Exit door */}
      <Box args={[0.2, 3, 2]} position={[9.9, 1.5, 0]}>
        <meshStandardMaterial color="#22c55e" />
      </Box>

      {/* Exit sign */}
      <Text position={[8, 3.5, 0]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
        EXIT
      </Text>
      <Box args={[2, 0.8, 0.1]} position={[8, 3.5, 0]}>
        <meshStandardMaterial color="#059669" />
      </Box>

      {/* Fire alarm */}
      <Box args={[0.3, 0.3, 0.1]} position={[-8, 2.5, -9.9]}>
        <meshStandardMaterial color="#dc2626" />
      </Box>

      {/* Emergency lighting */}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[8, 3, 0]} intensity={1} color="#51cf66" />
    </group>
  )
}

interface EvacuationGameProps {
  onComplete: (score: number, timeSpent: number) => void
  difficulty: string
}

export function EvacuationGame({ onComplete, difficulty }: EvacuationGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([-6, 0.5, -6])
  const [gameTime, setGameTime] = useState(0)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [instructions, setInstructions] = useState("Press WASD keys to move. Find the exit!")
  const [health, setHealth] = useState(100)
  const [collisionCount, setCollisionCount] = useState(0)

  const timeLimit = difficulty === "easy" ? 120 : difficulty === "normal" ? 90 : 60
  const scoreMultiplier = difficulty === "easy" ? 0.8 : difficulty === "normal" ? 1 : 1.5

  useEffect(() => {
    if (!gameStarted) return

    const timer = setInterval(() => {
      setGameTime((prev) => {
        const newTime = prev + 1
        if (newTime >= timeLimit && !gameCompleted) {
          setGameCompleted(true)
          setInstructions("Time's up! Emergency evacuation failed.")
          const finalScore = Math.max(0, Math.round((health / 100) * 20 * scoreMultiplier))
          setScore(finalScore)
          onComplete(finalScore, newTime)
        }
        return newTime
      })
    }, 1000)

    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameCompleted) return

      const speed = difficulty === "easy" ? 0.7 : difficulty === "normal" ? 0.5 : 0.3
      setPlayerPosition((prev) => {
        let [x, y, z] = prev

        switch (event.key.toLowerCase()) {
          case "w":
            z -= speed
            break
          case "s":
            z += speed
            break
          case "a":
            x -= speed
            break
          case "d":
            x += speed
            break
        }

        // Boundary checks
        x = Math.max(-9, Math.min(9, x))
        z = Math.max(-9, Math.min(9, z))

        const obstacles =
          difficulty === "normal"
            ? [
                { pos: [0, 0], size: [1, 3] },
                { pos: [-3, 3], size: [2, 1] },
              ]
            : difficulty === "hard"
              ? [
                  { pos: [0, 0], size: [1, 3] },
                  { pos: [-3, 3], size: [2, 1] },
                  { pos: [3, -3], size: [1, 2] },
                  { pos: [-1, -5], size: [3, 1] },
                ]
              : []

        // Check collision with obstacles
        for (const obstacle of obstacles) {
          const [ox, oz] = obstacle.pos
          const [sx, sz] = obstacle.size
          if (x >= ox - sx / 2 - 0.5 && x <= ox + sx / 2 + 0.5 && z >= oz - sz / 2 - 0.5 && z <= oz + sz / 2 + 0.5) {
            setHealth((prev) => Math.max(0, prev - 10))
            setCollisionCount((prev) => prev + 1)
            setInstructions("Collision! Be more careful during evacuation!")
            // Bounce back
            return prev
          }
        }

        // Check if reached exit
        if (x > 8 && Math.abs(z) < 1) {
          if (!gameCompleted) {
            const timeBonus = Math.max(0, timeLimit - gameTime)
            const healthBonus = health
            const collisionPenalty = collisionCount * 5
            const finalScore = Math.min(
              100,
              Math.round((timeBonus * 2 + healthBonus - collisionPenalty) * scoreMultiplier),
            )
            setScore(finalScore)
            setGameCompleted(true)
            setInstructions("Congratulations! You successfully evacuated!")
            onComplete(finalScore, gameTime)
          }
        }

        return [x, y, z]
      })
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      clearInterval(timer)
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [gameStarted, gameTime, gameCompleted, onComplete, difficulty, health, collisionCount, timeLimit, scoreMultiplier])

  const startGame = () => {
    setGameStarted(true)
    setGameTime(0)
    setScore(0)
    setGameCompleted(false)
    setHealth(100)
    setCollisionCount(0)
    setPlayerPosition([-6, 0.5, -6])
    setInstructions("Fire alarm activated! Find the exit quickly and safely!")
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameTime(0)
    setScore(0)
    setGameCompleted(false)
    setHealth(100)
    setCollisionCount(0)
    setPlayerPosition([-6, 0.5, -6])
    setInstructions("Press WASD keys to move. Find the exit!")
  }

  if (!gameStarted) {
    return (
      <Card className="w-full border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Shield className="h-5 w-5 text-emerald-600" />
            School Evacuation Challenge
          </CardTitle>
          <CardDescription className="text-gray-600">
            Navigate through a virtual classroom during a fire emergency. Use WASD keys to move and find the exit as
            quickly and safely as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-800">Objective:</strong>
                <span className="text-blue-700"> Reach the exit door safely</span>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <strong className="text-green-800">Controls:</strong>
                <span className="text-green-700"> WASD keys to move</span>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <strong className="text-yellow-800">Scoring:</strong>
                <span className="text-yellow-700"> Speed + Safety = Higher score</span>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <strong className="text-red-800">Safety:</strong>
                <span className="text-red-700"> Avoid obstacles and collisions</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">Difficulty: {difficulty}</span>
                <Badge
                  className={`${
                    difficulty === "easy"
                      ? "bg-green-100 text-green-700"
                      : difficulty === "normal"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  } hover:bg-current`}
                >
                  {difficulty === "easy"
                    ? "Beginner Friendly"
                    : difficulty === "normal"
                      ? "Standard Challenge"
                      : "Expert Level"}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Time Limit: {timeLimit} seconds</div>
                <div>Score Multiplier: {scoreMultiplier}x</div>
                <div>Obstacles: {difficulty === "easy" ? "None" : difficulty === "normal" ? "Some" : "Many"}</div>
              </div>
            </div>

            <Button onClick={startGame} className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Start Emergency Evacuation
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Game HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{timeLimit - gameTime}s</div>
            <div className="text-xs text-gray-600">Time Left</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{score}</div>
            <div className="text-xs text-gray-600">Score</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{health}%</div>
            <div className="text-xs text-gray-600">Health</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{collisionCount}</div>
            <div className="text-xs text-gray-600">Collisions</div>
          </CardContent>
        </Card>
      </div>

      {/* Health and Time Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Health</span>
              <span className="font-medium text-gray-900">{health}%</span>
            </div>
            <Progress value={health} className="h-2" />
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Time Remaining</span>
              <span className="font-medium text-gray-900">{timeLimit - gameTime}s</span>
            </div>
            <Progress value={((timeLimit - gameTime) / timeLimit) * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div
        className={`p-3 rounded-lg border ${
          gameCompleted
            ? score > 70
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
            : "bg-yellow-50 border-yellow-200"
        }`}
      >
        <p
          className={`text-sm font-medium ${
            gameCompleted ? (score > 70 ? "text-green-800" : "text-red-800") : "text-yellow-800"
          }`}
        >
          {instructions}
        </p>
      </div>

      {/* 3D Game Canvas */}
      <div className="w-full h-[500px] border border-gray-200 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <Environment preset="warehouse" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />

          <SchoolRoom difficulty={difficulty} />
          <Player position={playerPosition} onMove={setPlayerPosition} />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>

      {gameCompleted && (
        <Card className={`${score > 70 ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"} shadow-sm`}>
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <h3 className={`text-xl font-bold ${score > 70 ? "text-green-800" : "text-red-800"}`}>
                {score > 70 ? "Mission Complete!" : "Mission Failed"}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700">Time Taken</div>
                  <div className="text-lg">{gameTime}s</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Final Health</div>
                  <div className="text-lg">{health}%</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Collisions</div>
                  <div className="text-lg">{collisionCount}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Final Score</div>
                  <div className="text-xl font-bold">{score}/100</div>
                </div>
              </div>
              <Button onClick={resetGame} className="bg-emerald-600 hover:bg-emerald-700">
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
