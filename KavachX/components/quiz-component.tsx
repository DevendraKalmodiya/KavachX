"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { getRandomQuestions, calculateScore, type QuizQuestion, type QuizResult } from "@/lib/quiz-data"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface QuizComponentProps {
  onComplete?: (result: QuizResult) => void
}

export function QuizComponent({ onComplete }: QuizComponentProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ questionId: string; selectedAnswer: number }[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>("")
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [startTime, setStartTime] = useState<number>(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Initialize quiz with random questions
    const randomQuestions = getRandomQuestions(8)
    setQuestions(randomQuestions)
  }, [])

  const startQuiz = () => {
    setQuizStarted(true)
    setStartTime(Date.now())
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setCurrentAnswer("")
    setQuizCompleted(false)
    setResult(null)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (value: string) => {
    setCurrentAnswer(value)
  }

  const nextQuestion = () => {
    if (currentAnswer === "") return

    const currentQuestion = questions[currentQuestionIndex]
    const answerIndex = Number.parseInt(currentAnswer)

    // Save the answer
    const newAnswers = [...selectedAnswers]
    const existingAnswerIndex = newAnswers.findIndex((a) => a.questionId === currentQuestion.id)

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questionId: currentQuestion.id, selectedAnswer: answerIndex }
    } else {
      newAnswers.push({ questionId: currentQuestion.id, selectedAnswer: answerIndex })
    }

    setSelectedAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentAnswer("")
      setShowExplanation(false)
    } else {
      // Quiz completed
      completeQuiz(newAnswers)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // Load previous answer if exists
      const currentQuestion = questions[currentQuestionIndex - 1]
      const previousAnswer = selectedAnswers.find((a) => a.questionId === currentQuestion.id)
      setCurrentAnswer(previousAnswer ? previousAnswer.selectedAnswer.toString() : "")
      setShowExplanation(false)
    }
  }

  const completeQuiz = (answers: { questionId: string; selectedAnswer: number }[]) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    const quizResult = calculateScore(answers)
    quizResult.timeSpent = timeSpent

    setResult(quizResult)
    setQuizCompleted(true)

    if (onComplete) {
      onComplete(quizResult)
    }
  }

  const restartQuiz = () => {
    const randomQuestions = getRandomQuestions(8)
    setQuestions(randomQuestions)
    setQuizStarted(false)
    setQuizCompleted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setCurrentAnswer("")
    setResult(null)
    setShowExplanation(false)
  }

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation)
  }

  if (!quizStarted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">🧠 {t("quizTitle")}</CardTitle>
          <CardDescription className="text-lg">{t("quizInstructions")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="p-4 bg-green-500/5 rounded-lg">
              <div className="text-2xl font-bold text-green-600">~5</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="p-4 bg-blue-500/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Mixed</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="p-4 bg-purple-500/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Points</div>
              <div className="text-sm text-muted-foreground">Earn Rewards</div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={startQuiz} size="lg" className="px-8">
              🚀 {t("startQuiz")}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (quizCompleted && result) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">🎉 {t("quizComplete")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{result.score}%</div>
            <div className="text-lg text-muted-foreground">{t("yourScore")}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/5 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">{t("correctAnswers")}</div>
            </div>
            <div className="text-center p-4 bg-red-500/5 rounded-lg">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{result.totalQuestions - result.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-blue-500/5 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Performance Breakdown:</h3>
            {result.answers.map((answer, index) => {
              const question = questions.find((q) => q.id === answer.questionId)
              return (
                <div key={answer.questionId} className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Question {index + 1}</span>
                  {answer.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={restartQuiz} variant="outline">
              🔄 Retake Quiz
            </Button>
            <Button onClick={() => setQuizStarted(false)}>📊 View Results</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
          <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={currentAnswer} onValueChange={handleAnswerSelect}>
          {currentQuestion?.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && currentQuestion && (
          <Alert>
            <AlertDescription>
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
            ← {t("previousQuestion")}
          </Button>

          <Button variant="outline" onClick={toggleExplanation} disabled={currentAnswer === ""}>
            💡 Explanation
          </Button>

          <Button onClick={nextQuestion} disabled={currentAnswer === ""}>
            {currentQuestionIndex === questions.length - 1 ? t("submitQuiz") : t("nextQuestion")} →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
