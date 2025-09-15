"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Box, Sphere, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type * as THREE from "three"

interface Hazard {
  id: string
  position: [number, number, number]
  type: "fire" | "electrical" | "chemical" | "structural"
  found: boolean
  description: string
}

interface HazardObjectProps {
  hazard: Hazard
  onClick: (id: string) => void
}

function HazardObject({ hazard, onClick }: HazardObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && !hazard.found) {
      meshRef.current.rotation.y = state.clock.elapsedTime
    }
  })

  const getColor = () => {
    if (hazard.found) return "#22c55e"
    if (hovered) return "#fbbf24"

    switch (hazard.type) {
      case "fire":
        return "#ef4444"
      case "electrical":
        return "#3b82f6"
      case "chemical":
        return "#8b5cf6"
      case "structural":
        return "#f97316"
      default:
        return "#6b7280"
    }
  }

  const getShape = () => {
    switch (hazard.type) {
      case "fire":
        return <Sphere args={[0.3]} />
      case "electrical":
        return <Box args={[0.4, 0.6, 0.2]} />
      case "chemical":
        return <Sphere args={[0.25]} />
      case "structural":
        return <Box args={[0.5, 0.3, 0.5]} />
      default:
        return <Box args={[0.3, 0.3, 0.3]} />
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={hazard.position}
      onClick={() => onClick(hazard.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {getShape()}
      <meshStandardMaterial
        color={getColor()}
        emissive={hovered ? "#333333" : "#000000"}
        transparent={hazard.found}
        opacity={hazard.found ? 0.3 : 1}
      />
    </mesh>
  )
}

function GameEnvironment() {
  return (
    <group>
      {/* Floor */}
      <Box args={[20, 0.2, 20]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#e5e7eb" />
      </Box>

      {/* Walls */}
      <Box args={[20, 4, 0.2]} position={[0, 2, -10]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>
      <Box args={[20, 4, 0.2]} position={[0, 2, 10]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>
      <Box args={[0.2, 4, 20]} position={[-10, 2, 0]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>
      <Box args={[0.2, 4, 20]} position={[10, 2, 0]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>

      {/* Some furniture */}
      <Box args={[2, 1, 1]} position={[-6, 0.5, -6]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Box>
      <Box args={[1, 2, 1]} position={[6, 1, 6]}>
        <meshStandardMaterial color="#06b6d4" />
      </Box>
      <Box args={[3, 0.8, 1.5]} position={[0, 0.4, -8]}>
        <meshStandardMaterial color="#f59e0b" />
      </Box>
    </group>
  )
}

interface HazardGameProps {
  onComplete: (score: number) => void
}

export function HazardGame({ onComplete }: HazardGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [hazards, setHazards] = useState<Hazard[]>([])
  const [gameTime, setGameTime] = useState(0)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null)

  const initializeHazards = (): Hazard[] => [
    {
      id: "1",
      position: [-7, 1, -7],
      type: "fire",
      found: false,
      description: "Overloaded electrical outlet - fire hazard",
    },
    {
      id: "2",
      position: [5, 1.5, 5],
      type: "electrical",
      found: false,
      description: "Exposed electrical wiring",
    },
    {
      id: "3",
      position: [2, 0.5, -6],
      type: "chemical",
      found: false,
      description: "Unlabeled chemical container",
    },
    {
      id: "4",
      position: [-3, 0.3, 8],
      type: "structural",
      found: false,
      description: "Loose ceiling tile - falling hazard",
    },
    {
      id: "5",
      position: [8, 0.5, -3],
      type: "fire",
      found: false,
      description: "Blocked fire exit",
    },
    {
      id: "6",
      position: [-8, 1, 4],
      type: "electrical",
      found: false,
      description: "Water near electrical equipment",
    },
  ]

  useEffect(() => {
    if (!gameStarted) return

    const timer = setInterval(() => {
      setGameTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted])

  const startGame = () => {
    setGameStarted(true)
    setHazards(initializeHazards())
    setGameTime(0)
    setScore(0)
    setGameCompleted(false)
    setSelectedHazard(null)
  }

  const handleHazardClick = (hazardId: string) => {
    const hazard = hazards.find((h) => h.id === hazardId)
    if (!hazard || hazard.found) return

    setHazards((prev) => prev.map((h) => (h.id === hazardId ? { ...h, found: true } : h)))

    setScore((prev) => prev + 20)
    setSelectedHazard(hazard)

    // Check if all hazards found
    const updatedHazards = hazards.map((h) => (h.id === hazardId ? { ...h, found: true } : h))

    if (updatedHazards.every((h) => h.found)) {
      const timeBonus = Math.max(0, 120 - gameTime)
      const finalScore = score + 20 + timeBonus
      setScore(finalScore)
      setGameCompleted(true)
      onComplete(finalScore)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setHazards([])
    setGameTime(0)
    setScore(0)
    setGameCompleted(false)
    setSelectedHazard(null)
  }

  if (!gameStarted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🔍 Hazard Identification Challenge</CardTitle>
          <CardDescription>
            Explore the 3D environment and identify potential safety hazards. Click on objects that could pose risks to
            safety.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-red-50 rounded-lg">
                <strong>Fire Hazards:</strong> Red spheres
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <strong>Electrical:</strong> Blue boxes
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <strong>Chemical:</strong> Purple spheres
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <strong>Structural:</strong> Orange boxes
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm">
                <strong>Goal:</strong> Find all 6 hidden hazards in the environment
              </p>
            </div>
            <Button onClick={startGame} className="w-full" size="lg">
              🔍 Start Hazard Hunt
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const foundCount = hazards.filter((h) => h.found).length
  const totalCount = hazards.length

  return (
    <div className="w-full space-y-4">
      {/* Game HUD */}
      <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-4">
          <Badge variant="outline">Time: {gameTime}s</Badge>
          <Badge variant="secondary">Score: {score}</Badge>
          <Badge variant={foundCount === totalCount ? "default" : "outline"}>
            Found: {foundCount}/{totalCount}
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          Reset
        </Button>
      </div>

      {/* Selected Hazard Info */}
      {selectedHazard && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-3">
            <p className="text-sm font-medium text-yellow-800">✅ Hazard Identified: {selectedHazard.description}</p>
          </CardContent>
        </Card>
      )}

      {/* 3D Game Canvas */}
      <div className="w-full h-[500px] border rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 8, 12], fov: 60 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <GameEnvironment />

          {hazards.map((hazard) => (
            <HazardObject key={hazard.id} hazard={hazard} onClick={handleHazardClick} />
          ))}

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>

      {gameCompleted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-green-800">Excellent Work!</h3>
              <p className="text-green-700">You identified all hazards in {gameTime} seconds</p>
              <Badge className="bg-green-600">Final Score: {score}/240</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
