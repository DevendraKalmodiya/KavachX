export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "earthquake" | "fire" | "flood" | "general"
}

export interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: { questionId: string; selectedAnswer: number; correct: boolean }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "eq1",
    question: "What should you do immediately when you feel an earthquake?",
    options: ["Run outside as fast as possible", "Drop, Cover, and Hold On", "Stand in a doorway", "Hide under a bed"],
    correctAnswer: 1,
    explanation:
      "Drop to your hands and knees, take cover under a sturdy desk or table, and hold on until the shaking stops.",
    category: "earthquake",
  },
  {
    id: "eq2",
    question: "Which location is safest during an earthquake if you are indoors?",
    options: ["Near windows", "Under a heavy table or desk", "In an elevator", "Next to tall furniture"],
    correctAnswer: 1,
    explanation:
      "A sturdy table or desk provides protection from falling objects, which cause most earthquake injuries.",
    category: "earthquake",
  },
  {
    id: "fire1",
    question: "What is the first thing you should do if you discover a fire?",
    options: [
      "Try to put it out yourself",
      "Alert others and call for help",
      "Gather your belongings",
      "Open windows for ventilation",
    ],
    correctAnswer: 1,
    explanation: "Alert others immediately and call emergency services. Early warning saves lives.",
    category: "fire",
  },
  {
    id: "fire2",
    question: "When evacuating during a fire, you should:",
    options: [
      "Use elevators for faster evacuation",
      "Stay low and crawl under smoke",
      "Run as fast as possible",
      "Stop to collect important items",
    ],
    correctAnswer: 1,
    explanation: "Smoke rises, so cleaner air is closer to the floor. Crawling keeps you below the smoke.",
    category: "fire",
  },
  {
    id: "flood1",
    question: "How much moving water can knock you down?",
    options: ["12 inches (30 cm)", "6 inches (15 cm)", "18 inches (45 cm)", "24 inches (60 cm)"],
    correctAnswer: 1,
    explanation: "Just 6 inches of moving water can knock you down. Never attempt to walk through flood water.",
    category: "flood",
  },
  {
    id: "flood2",
    question: "If you are trapped in a building during a flood, you should:",
    options: [
      "Go to the basement for safety",
      "Go to the highest floor possible",
      "Stay on the ground floor",
      "Try to swim out immediately",
    ],
    correctAnswer: 1,
    explanation: "Move to the highest floor to avoid rising water. Signal for help from windows or roof.",
    category: "flood",
  },
  {
    id: "gen1",
    question: "What should be included in an emergency kit?",
    options: [
      "Only food and water",
      "Water, food, flashlight, radio, first aid kit",
      "Just important documents",
      "Only communication devices",
    ],
    correctAnswer: 1,
    explanation:
      "A complete emergency kit includes water (1 gallon per person per day), non-perishable food, flashlight, battery-powered radio, first aid kit, and other essentials.",
    category: "general",
  },
  {
    id: "gen2",
    question: "How often should you practice emergency drills?",
    options: ["Once a year", "Every 6 months", "Monthly", "Only when required"],
    correctAnswer: 1,
    explanation:
      "Emergency drills should be practiced every 6 months to ensure everyone remembers procedures and can respond quickly.",
    category: "general",
  },
  {
    id: "gen3",
    question: "What is the universal emergency number in India?",
    options: ["911", "108", "112", "100"],
    correctAnswer: 2,
    explanation: "112 is the single emergency number in India that connects to police, fire, and medical services.",
    category: "general",
  },
  {
    id: "gen4",
    question: "During an emergency evacuation, you should:",
    options: [
      "Take the elevator for speed",
      "Use stairs and stay calm",
      "Wait for instructions",
      "Help others before yourself",
    ],
    correctAnswer: 1,
    explanation: "Always use stairs during evacuations, never elevators. Stay calm and move in an orderly fashion.",
    category: "general",
  },
]

export function getRandomQuestions(count = 5): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function calculateScore(answers: { questionId: string; selectedAnswer: number }[]): QuizResult {
  let correctAnswers = 0
  const detailedAnswers = answers.map((answer) => {
    const question = quizQuestions.find((q) => q.id === answer.questionId)
    const correct = question ? question.correctAnswer === answer.selectedAnswer : false
    if (correct) correctAnswers++
    return {
      questionId: answer.questionId,
      selectedAnswer: answer.selectedAnswer,
      correct,
    }
  })

  return {
    score: Math.round((correctAnswers / answers.length) * 100),
    totalQuestions: answers.length,
    correctAnswers,
    timeSpent: 0, // Will be calculated by the component
    answers: detailedAnswers,
  }
}
