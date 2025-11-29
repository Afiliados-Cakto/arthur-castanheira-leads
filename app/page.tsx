"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  Check,
  Flame,
  Heart,
  Dumbbell,
  Award,
  Sparkles,
  Camera,
  Frown,
  Feather,
  Clock,
  DollarSign,
  Gift,
} from "lucide-react"
import Image from "next/image"

// Tipos para os dados do formulário
type FormData = {
  name: string
  currentWeight: number
  height: number
  goalWeight: number
  weightLossGoal: string
  weightImpact: string
  appearanceHappiness: string // Added field for appearance happiness question
  barriers: string // Added field for barriers question
  goal: string
  activity: string
  diet: string
  water: string
}

export default function QuizFunnel() {
  const [step, setStep] = useState(0) // Start at step 0 for the new intro page
  const [formData, setFormData] = useState<FormData>({
    name: "",
    currentWeight: 70,
    height: 170,
    goalWeight: 60,
    weightLossGoal: "",
    weightImpact: "",
    appearanceHappiness: "", // Initialized new field
    barriers: "", // Initialized new field
    goal: "",
    activity: "",
    diet: "",
    water: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [prizeWon, setPrizeWon] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [showWinMessage, setShowWinMessage] = useState(false)
  const [revealedBonuses, setRevealedBonuses] = useState<number[]>([])
  const [selectedPrize, setSelectedPrize] = useState<any>(null) // State to store the selected prize

  const totalSteps = 18 // Updated from 16 to 18 to include new bonus and loading pages

  const progress = (step / totalSteps) * 100

  // Effect for bonus reveal animation on step 15
  useEffect(() => {
    if (step === 15) {
      const allBonuses = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]
      if (revealedBonuses.length < allBonuses.length) {
        const timer = setTimeout(() => {
          setRevealedBonuses((prev) => [...prev, allBonuses[prev.length].id])
        }, 800) // Reveal one bonus every 0.8 seconds
        return () => clearTimeout(timer)
      }
    }
  }, [step, revealedBonuses])

  useEffect(() => {
    if (step === 16) {
      setIsLoading(true)
      setLoadingProgress(0)
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 2
        setLoadingProgress(currentProgress)
        if (currentProgress >= 100) {
          clearInterval(interval)
          setStep(17)
          setIsLoading(false)
        }
      }, 80)
      return () => clearInterval(interval)
    }
  }, [step])

  useEffect(() => {
    if (step === 14 && showWinMessage) {
      // Changed from step === 3 to step === 14 for wheel spin
      const timer = setTimeout(() => {
        setShowWinMessage(false)
        setStep(15) // Go to bonus reveal page
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [step, showWinMessage])

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0 && !isLoading) {
      setStep(step - 1)
    }
  }

  const spinWheel = () => {
    if (isSpinning) return
    setIsSpinning(true)

    const targetAngle = 282.5 // Position to land on 100% bonus sector
    const spins = 1440 + 720 // 6 full rotations for dramatic effect
    const finalRotation = wheelRotation + spins + targetAngle

    setWheelRotation(finalRotation)

    setTimeout(() => {
      // Determine the prize based on the final rotation.
      // This logic needs to be precise and match the wheel segments.
      // For simplicity, let's assume a direct mapping or a calculation based on finalRotation.
      // In a real app, you'd have a more robust way to determine the prize.
      const prizeIndex = Math.floor(Math.random() * 7) // Simplified random prize selection
      const prizes = [
        {
          id: 1,
          name: "Protocolo Mounjaro de Pobre",
          subtitle: "Guia completo passo a passo",
          emoji: "🫖",
          image: "📋",
          color: "#22c55e",
          angle: 0,
          size: 65,
        },
        {
          id: 2,
          name: "100% de Bônus",
          subtitle: "Pacote Completo",
          emoji: "🎁",
          image: "🎁",
          color: "#fbbf24",
          angle: 65,
          size: 25,
        },
        {
          id: 3,
          name: "Cardápio Inteligente",
          subtitle: "Plano alimentar personalizado",
          emoji: "🥗",
          image: "🍽️",
          color: "#ef4444",
          angle: 90,
          size: 55,
        },
        {
          id: 4,
          name: "Guia de Treino",
          subtitle: "Exercícios adaptados para você",
          emoji: "💪",
          image: "🏋️",
          color: "#3b82f6",
          angle: 145,
          size: 55,
        },
        {
          id: 5,
          name: "Receitas Detox",
          subtitle: "30 receitas de chás poderosos",
          emoji: "🍋",
          image: "🍵",
          color: "#8b5cf6",
          angle: 200,
          size: 55,
        },
        {
          id: 6,
          name: "Planner Saudável",
          subtitle: "Acompanhe sua evolução diária",
          emoji: "📒",
          image: "📅",
          color: "#ec4899",
          angle: 255,
          size: 55,
        },
        {
          id: 7,
          name: "Desafio 30 Dias Premium",
          subtitle: "Comunidade exclusiva + suporte",
          emoji: "🔥",
          image: "🚀",
          color: "#22c55e",
          angle: 310,
          size: 50,
        },
      ]
      const wonPrize = prizes[prizeIndex]
      setPrizeWon(wonPrize.name)
      setSelectedPrize(wonPrize) // Set the selected prize
      setShowConfetti(true)
      setShowWinMessage(true)
      setIsSpinning(false)

      setTimeout(() => {
        setShowConfetti(false)
        // setShowWinMessage(false) // Keep win message visible until user clicks continue
        // setStep(step + 1) // Now goes to bonus reveal page (step 16)
      }, 3500)
    }, 4000)
  }

  const calculateIMC = () => {
    const heightInMeters = formData.height / 100
    return (formData.currentWeight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const calculateWeightLoss = () => {
    return (formData.currentWeight - formData.goalWeight).toFixed(1)
  }

  // Página inicial (Step 0)
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-4xl w-full space-y-6 sm:space-y-10 animate-fade-in relative z-10">
          <div className="flex justify-center px-3">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-white border border-green-600 text-green-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-green-100">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center">Mais de 10.000 mulheres já transformaram seus corpos</span>
            </div>
          </div>

          <div className="flex justify-center -mt-2">
            <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-16 sm:h-20 w-auto drop-shadow-lg" />
          </div>

          <div className="space-y-3 px-3 sm:px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 text-balance leading-tight text-center tracking-tight">
              Sente que perdeu o controle do próprio corpo? Conheça a nova receita do{" "}
              <span className="text-green-600 block mt-2">Mounjaro!</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-3 sm:px-4">
            <Card className="p-6 sm:p-8 space-y-3 sm:space-y-4 border-2 border-green-100 bg-white hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
              <div className="flex justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Check className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">100% Natural</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ingredientes e resultados sem substâncias químicas.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 space-y-3 sm:space-y-4 border-2 border-green-100 bg-white hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
              <div className="flex justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Flame className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Resultados em 30 Dias</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Perda de até 10kg já no primeiro mês com resultados visíveis e sustentáveis.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 space-y-3 sm:space-y-4 border-2 border-green-100 bg-white hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl sm:col-span-2 md:col-span-1">
              <div className="flex justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Dumbbell className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Aplicativo Personalizado</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Guia de treino e dietas adaptados para você.</p>
              </div>
            </Card>
          </div>

          <div className="px-3 sm:px-4">
            <Card className="p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-xl sm:text-2xl font-bold">⚠️</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base sm:text-lg">Atenção!</p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-0.5">
                    Apenas 1 consulta por pessoa. Se sair, perde sua vaga.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="px-3 sm:px-4">
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 sm:px-8 py-6 sm:py-7 text-lg sm:text-xl rounded-2xl shadow-2xl shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-300 hover:scale-[1.02] font-bold"
            >
              QUERO A RECEITA →
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Página 1: Boas-vindas (Now Step 1)
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-white flex flex-col">
        <div className="w-full bg-gray-200 h-2.5 sm:h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 sm:h-3 transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-xl w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img
                src="/images/mounjaro-logo.png"
                alt="Mounjaro Logo"
                className="h-12 sm:h-14 w-auto mx-auto mb-4 sm:mb-6 drop-shadow-md"
              />
            </div>

            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-gray-600 transition-all hover:scale-110 active:scale-95 p-2 -ml-2"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Qual seu nome?
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Para montar seu plano personalizado, precisamos do seu nome. Fique tranquila, seus dados estão
                protegidos 🔒
              </p>
            </div>

            <Card className="p-6 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl border-2 border-gray-100 rounded-3xl bg-white">
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-base sm:text-lg h-14 sm:h-16 rounded-2xl border-2 focus:ring-4 focus:ring-green-100 transition-all"
              />

              <Button
                onClick={handleNext}
                disabled={!formData.name.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 sm:py-6 text-base sm:text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Continuar ✓
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Página 2: Peso atual (Now Step 2)
  if (step === 2) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Qual é o seu <span className="text-green-600">peso atual</span>?
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Estamos quase lá! Vamos ajustar seu plano de acordo com seu corpo.
              </p>
            </div>

            <Card className="p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-lg border-2 rounded-3xl">
              <div className="flex items-center justify-center gap-3 sm:gap-4 bg-gray-50 rounded-2xl p-3 sm:p-4">
                <button className="px-3 sm:px-4 py-2 bg-white rounded-lg font-medium text-green-600 border-2 border-green-600 text-sm sm:text-base">
                  kg
                </button>
                <button className="px-3 sm:px-4 py-2 text-gray-400 text-sm sm:text-base">lb</button>
              </div>

              <div className="text-center space-y-5 sm:space-y-6">
                <div className="text-5xl sm:text-6xl font-bold text-gray-900">
                  {formData.currentWeight} <span className="text-2xl sm:text-3xl text-gray-500">kg</span>
                </div>

                <Slider
                  value={[formData.currentWeight]}
                  onValueChange={(value) => setFormData({ ...formData, currentWeight: value[0] })}
                  min={40}
                  max={150}
                  step={1}
                  className="w-full touch-none"
                />

                <div className="flex justify-between text-xs sm:text-sm text-gray-400 px-1">
                  <span>40</span>
                  <span>95</span>
                  <span>150</span>
                </div>

                <div className="text-xs sm:text-sm text-gray-500 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <p className="font-medium">Arraste para ajustar</p>
                  <p>Baseado nisso, ajustaremos a dosagem ideal para os melhores resultados!</p>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 sm:py-6 text-base sm:text-lg rounded-full font-semibold"
              >
                Continuar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Página 3: Altura (Now Step 3)
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Qual é a sua <span className="text-green-600">altura</span>?
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Isso nos ajudará a calcular a quantidade exata do Mounjaro de pobre para seu corpo.
              </p>
            </div>

            <Card className="p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-lg border-2 rounded-3xl">
              <div className="flex items-center justify-center gap-3 sm:gap-4 bg-gray-50 rounded-2xl p-3 sm:p-4">
                <button className="px-3 sm:px-4 py-2 bg-white rounded-lg font-medium text-green-600 border-2 border-green-600 text-sm sm:text-base">
                  cm
                </button>
                <button className="px-3 sm:px-4 py-2 text-gray-400 text-sm sm:text-base">pol</button>
              </div>

              <div className="text-center space-y-5 sm:space-y-6">
                <div className="text-5xl sm:text-6xl font-bold text-gray-900">
                  {formData.height} <span className="text-2xl sm:text-3xl text-gray-500">cm</span>
                </div>

                <Slider
                  value={[formData.height]}
                  onValueChange={(value) => setFormData({ ...formData, height: value[0] })}
                  min={140}
                  max={210}
                  step={1}
                  className="w-full touch-none"
                />

                <div className="flex justify-between text-xs sm:text-sm text-gray-400 px-1">
                  <span>140</span>
                  <span>175</span>
                  <span>210</span>
                </div>

                <div className="text-xs sm:text-sm text-gray-500 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <p className="font-medium">Arraste para ajustar</p>
                  <p>Isso nos ajudará a calcular a quantidade exata do Mounjaro de pobre para seu corpo.</p>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 sm:py-6 text-base sm:text-lg rounded-full font-semibold"
              >
                Continuar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Página 4: Impacto do peso (Now Step 4)
  if (step === 4) {
    const impactOptions = [
      {
        value: "fotos",
        label: "Evito tirar fotos porque tenho vergonha",
        icon: Camera,
        bgColor: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        value: "parceiro",
        label: "Meu parceiro não me olha mais com desejo como antes",
        icon: Heart,
        bgColor: "bg-pink-50",
        iconColor: "text-pink-600",
      },
      {
        value: "social",
        label: "Evito encontros sociais porque não me sinto bem comigo mesma",
        icon: Frown,
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600",
      },
      {
        value: "nenhuma",
        label: "Nenhuma das opções",
        icon: Feather,
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Como o seu peso <span className="text-green-600">impacta sua vida</span>?
              </h2>
            </div>

            <div className="space-y-3">
              {impactOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setFormData({ ...formData, weightImpact: option.value })
                      setTimeout(handleNext, 300)
                    }}
                    className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                      formData.weightImpact === option.value
                        ? `border-green-600 ${option.bgColor}`
                        : "border-gray-200 bg-white hover:bg-green-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${option.bgColor} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${option.iconColor}`} />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                        {option.label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Página 5: Felicidade com a aparência (Now Step 5)
  if (step === 5) {
    const happinessOptions = [
      {
        value: "acima-peso",
        label: "Não, porque me sinto acima do peso",
        icon: "😔",
        bgColor: "bg-yellow-50",
      },
      {
        value: "roupas",
        label: "Não, porque não consigo usar as roupas que gosto",
        icon: "😞",
        bgColor: "bg-orange-50",
      },
      {
        value: "energia",
        label: "Não, porque me sinto sem energia e disposição",
        icon: "😢",
        bgColor: "bg-red-50",
      },
      {
        value: "feliz",
        label: "Sim, estou feliz com minha aparência",
        icon: "😊",
        bgColor: "bg-green-50",
      },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Você está realmente <span className="text-green-600">feliz</span> com{" "}
                <span className="text-red-600">sua aparência</span>?
              </h2>
            </div>

            <div className="space-y-3">
              {happinessOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFormData({ ...formData, appearanceHappiness: option.value })
                    setTimeout(handleNext, 300)
                  }}
                  className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                    formData.appearanceHappiness === option.value
                      ? `border-green-600 ${option.bgColor}`
                      : "border-gray-200 bg-white hover:bg-green-50"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl">{option.icon}</span>
                    <span className="text-sm sm:text-base font-medium text-gray-900 leading-snug">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Página 6: Barreiras (Now Step 6)
  if (step === 6) {
    const barriersOptions = [
      {
        value: "tempo",
        label: "Falta de tempo",
        subtitle: "Rotina agitada.",
        icon: Clock,
        bgColor: "bg-gray-50",
        iconColor: "text-gray-600",
      },
      {
        value: "autocontrole",
        label: "Autocontrole",
        subtitle: "Dificuldade em resistir a tentações alimentares.",
        icon: Clock,
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600",
      },
      {
        value: "financeiro",
        label: "Financeiro",
        subtitle: "Achar opções saudáveis mais caras do que alimentos processados.",
        icon: DollarSign,
        bgColor: "bg-green-50",
        iconColor: "text-green-600",
      },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                O que mais te <span className="text-red-600">impede</span> de{" "}
                <span className="text-red-600">emagrecer</span>?
              </h2>
            </div>

            <div className="space-y-3">
              {barriersOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setFormData({ ...formData, barriers: option.value })
                      setTimeout(handleNext, 300)
                    }}
                    className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                      formData.barriers === option.value
                        ? `border-green-600 ${option.bgColor}`
                        : "border-gray-200 bg-white hover:bg-green-50"
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${option.bgColor} rounded-xl flex items-center justify-center mt-1 sm:mt-1.5`}
                      >
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${option.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-bold text-gray-900 leading-snug">{option.label}</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{option.subtitle}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Página 7: Objetivo de peso (Now Step 7)
  if (step === 7) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Qual é o seu <span className="text-green-600">objetivo de peso</span> (desejado)?
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Isso nos ajudará a personalizar um plano especificamente para você.
              </p>
            </div>

            <Card className="p-6 sm:p-8 space-y-6 sm:space-8 shadow-lg border-2 rounded-3xl">
              <div className="flex items-center justify-center gap-3 sm:gap-4 bg-gray-50 rounded-2xl p-3 sm:p-4">
                <button className="px-3 sm:px-4 py-2 bg-white rounded-lg font-medium text-green-600 border-2 border-green-600 text-sm sm:text-base">
                  kg
                </button>
                <button className="px-3 sm:px-4 py-2 text-gray-400 text-sm sm:text-base">lb</button>
              </div>

              <div className="text-center space-y-5 sm:space-y-6">
                <div className="text-5xl sm:text-6xl font-bold text-gray-900">
                  {formData.goalWeight} <span className="text-2xl sm:text-3xl text-gray-500">kg</span>
                </div>

                <Slider
                  value={[formData.goalWeight]}
                  onValueChange={(value) => setFormData({ ...formData, goalWeight: value[0] })}
                  min={40}
                  max={120}
                  step={1}
                  className="w-full touch-none"
                />

                <div className="flex justify-between text-xs sm:text-sm text-gray-400 px-1">
                  <span>40</span>
                  <span>80</span>
                  <span>120</span>
                </div>

                <div className="text-xs sm:text-sm text-gray-500 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <p className="font-medium">Arraste para ajustar</p>
                  <p>Baseado nisso, ajustaremos a dosagem ideal para os melhores resultados!</p>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 sm:py-6 text-base sm:text-lg rounded-full font-semibold"
              >
                Continuar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Página 8: Meta de perda de peso (Now Step 8)
  if (step === 8) {
    const options = [
      { value: "ate-5", label: "Até 5 kg", icon: "🎯" },
      { value: "6-10", label: "De 6 a 10 kg", icon: "💪" },
      { value: "11-15", label: "De 11 a 15 kg", icon: "🔥" },
      { value: "16-20", label: "De 16 a 20 kg", icon: "⚡" },
      { value: "mais-20", label: "Mais de 20 kg", icon: "🚀" },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Quantos quilos você <span className="text-green-600">deseja perder</span>?
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                O protocolo Mounjaro de Pobre ajuda a eliminar gordura de forma acelerada.
              </p>
            </div>

            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFormData({ ...formData, weightLossGoal: option.value })
                    setTimeout(handleNext, 300)
                  }}
                  className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                    formData.weightLossGoal === option.value
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-2xl sm:text-3xl">{option.icon}</span>
                      <span className="text-sm sm:text-base font-medium text-gray-900">{option.label}</span>
                    </div>
                    <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 9 (was 8)
  if (step === 9) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="text-center space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Nosso protocolo</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                <span className="text-green-600">Resolve isso</span> para você!
              </h2>
            </div>

            <Card className="p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-red-600 text-center">
                COMO FUNCIONA O MOUNJARO DE POBRE
              </h3>

              <div className="relative">
                <Image
                  src="/images/design-mode/sdasdasda.png"
                  alt="Como funciona"
                  width={800}
                  height={600}
                  priority
                  unoptimized={true}
                  loading="eager"
                  placeholder="empty"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="bg-green-50 p-5 sm:p-6 rounded-xl space-y-2">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-green-700">Mounjaro de pobre</span> age enquanto você dorme,{" "}
                  <span className="font-bold text-green-700">queimando gordura de forma acelerada!</span>
                </p>
              </div>
            </Card>

            <Button
              onClick={handleNext}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-lg font-semibold"
            >
              Continuar ✓
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Step 10 (was 9)
  if (step === 10) {
    const goals = [
      { value: "emagrecer", label: "Emagrecer e definir", icon: Flame, color: "text-red-500" },
      { value: "massa", label: "Ganhar massa magra", icon: Dumbbell, color: "text-blue-500" },
      { value: "saude", label: "Melhorar energia e saúde", icon: Heart, color: "text-green-500" },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Qual é o seu <span className="text-green-600">principal objetivo</span> nas próximas semanas?
              </h2>
            </div>

            <div className="space-y-4">
              {goals.map((goal) => {
                const Icon = goal.icon
                return (
                  <button
                    key={goal.value}
                    onClick={() => {
                      setFormData({ ...formData, goal: goal.value })
                      setTimeout(handleNext, 300)
                    }}
                    className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                      formData.goal === goal.value ? "border-green-600 bg-green-50" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-xl flex items-center justify-center ${goal.color}`}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-gray-900">{goal.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 11 (was 10)
  if (step === 11) {
    const activities = [
      { value: "nenhuma", label: "Nenhuma", icon: "💤" },
      { value: "1-2", label: "1 a 2 vezes", icon: "🚶‍♀️" },
      { value: "3-5", label: "3 a 5 vezes", icon: "🏋️" },
      { value: "todos", label: "Todos os dias", icon: "🔥" },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Quantas vezes por semana você pratica <span className="text-green-600">atividade física</span>?
              </h2>
            </div>

            <div className="space-y-3">
              {activities.map((activity) => (
                <button
                  key={activity.value}
                  onClick={() => {
                    setFormData({ ...formData, activity: activity.value })
                    setTimeout(handleNext, 300)
                  }}
                  className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                    formData.activity === activity.value ? "border-green-600 bg-green-50" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl">{activity.icon}</span>
                    <span className="text-sm sm:text-base font-medium text-gray-900">{activity.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 12 (was 11)
  if (step === 12) {
    const diets = [
      { value: "desregrada", label: "Desregrada, como o que dá", icon: "🍕" },
      { value: "tento", label: "Tento me alimentar bem, mas acabo desistindo", icon: "🥗" },
      { value: "sigo", label: "Sigo regras, mas não vejo resultados", icon: "🍚" },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Como é sua <span className="text-green-600">alimentação</span> no dia a dia?
              </h2>
            </div>

            <div className="space-y-3">
              {diets.map((diet) => (
                <button
                  key={diet.value}
                  onClick={() => {
                    setFormData({ ...formData, diet: diet.value })
                    setTimeout(handleNext, 300)
                  }}
                  className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                    formData.diet === diet.value ? "border-green-600 bg-green-50" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl">{diet.icon}</span>
                    <span className="text-sm sm:text-base font-medium text-gray-900">{diet.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 13 (was 12)
  if (step === 13) {
    const waterOptions = [
      { value: "menos-3", label: "Menos de 3", icon: "🥤" },
      { value: "4-6", label: "Entre 4 e 6", icon: "💧" },
      { value: "mais-7", label: "Mais de 7", icon: "💦" },
    ]

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="w-full bg-gray-100 h-2.5 sm:h-2">
          <div className="bg-green-600 h-2.5 sm:h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-6 sm:space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 sm:h-12 w-auto mx-auto mb-4" />
            </div>

            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Quantos copos de <span className="text-green-600">água</span> você bebe por dia?
              </h2>
            </div>

            <div className="space-y-3">
              {waterOptions.map((water) => (
                <button
                  key={water.value}
                  onClick={() => {
                    setFormData({ ...formData, water: water.value })
                    setTimeout(handleNext, 300)
                  }}
                  className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all hover:border-green-600 active:scale-[0.98] ${
                    formData.water === water.value ? "border-green-600 bg-green-50" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl">{water.icon}</span>
                    <span className="text-sm sm:text-base font-medium text-gray-900">{water.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 14 (was 13) - Roleta de Bônus
  if (step === 14) {
    const prizes = [
      {
        id: 1,
        name: "Protocolo Mounjaro de Pobre",
        subtitle: "Guia completo passo a passo",
        emoji: "🫖",
        image: "📋",
        color: "#22c55e",
        angle: 0,
        size: 65,
      },
      {
        id: 2,
        name: "100% de Bônus",
        subtitle: "Pacote Completo",
        emoji: "🎁",
        image: "🎁",
        color: "#fbbf24",
        angle: 65,
        size: 25,
      }, // Small sector
      {
        id: 3,
        name: "Cardápio Inteligente",
        subtitle: "Plano alimentar personalizado",
        emoji: "🥗",
        image: "🍽️",
        color: "#ef4444",
        angle: 90,
        size: 55,
      },
      {
        id: 4,
        name: "Guia de Treino",
        subtitle: "Exercícios adaptados para você",
        emoji: "💪",
        image: "🏋️",
        color: "#3b82f6",
        angle: 145,
        size: 55,
      },
      {
        id: 5,
        name: "Receitas Detox",
        subtitle: "30 receitas de chás poderosos",
        emoji: "🍋",
        image: "🍵",
        color: "#8b5cf6",
        angle: 200,
        size: 55,
      },
      {
        id: 6,
        name: "Planner Saudável",
        subtitle: "Acompanhe sua evolução diária",
        emoji: "📒",
        image: "📅",
        color: "#ec4899",
        angle: 255,
        size: 55,
      },
      {
        id: 7,
        name: "Desafio 30 Dias Premium",
        subtitle: "Comunidade exclusiva + suporte",
        emoji: "🔥",
        image: "🚀",
        color: "#22c55e",
        angle: 310,
        size: 50,
      },
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex flex-col overflow-x-hidden relative">
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-0 animate-confetti">
              {[...Array(80)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 animate-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    backgroundColor: ["#22c55e", "#fbbf24", "#ef4444", "#3b82f6", "#ec4899", "#8b5cf6"][
                      Math.floor(Math.random() * 6)
                    ],
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {showWinMessage && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 animate-fade-in p-4">
            <Card className="max-w-lg mx-4 p-8 space-y-6 shadow-2xl border-4 border-green-500 bg-white animate-scale-in">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full animate-bounce">
                  <Award className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">🎉 PARABÉNS!</h2>
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-lg">
                  <p className="text-2xl md:text-3xl font-bold mb-3">100% DE BÔNUS!</p>
                  <p className="text-xl font-semibold">💰 Pacote Completo Desbloqueado 💰</p>
                </div>
                <div className="space-y-3 bg-amber-50 p-6 rounded-xl">
                  <p className="text-xl font-bold text-green-600">🌟 Você está entre os 7% de sortudas! 🌟</p>
                  <div className="bg-red-100 border-2 border-red-500 p-4 rounded-lg">
                    <p className="text-lg font-bold text-red-700">⏰ Expira em 15 minutos!</p>
                  </div>
                  <p className="text-base text-gray-700 font-medium">Aproveite agora essa bonificação especial!</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="w-full bg-gray-100 h-2.5 sm:h-3 shadow-inner">
          <div className="bg-green-600 h-2.5 sm:h-3 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex items-center justify-center p-4 py-8">
          <div className="max-w-3xl w-full space-y-8">
            <div className="text-center">
              <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-14 w-auto mx-auto mb-6" />
            </div>

            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full text-base font-bold shadow-lg animate-pulse">
                <Sparkles className="h-5 w-5" />
                MOMENTO ESPECIAL
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-balance leading-tight">
                Parabéns! Hoje você ganhou a chance de liberar bônus <span className="text-green-600">EXCLUSIVOS</span>{" "}
                do Projeto Mounjaro 30 Dias!
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto text-pretty leading-relaxed">
                Gire a roleta e descubra qual presente especial você vai desbloquear para{" "}
                <span className="font-bold text-green-600">acelerar seus resultados</span>, turbinar sua motivação e
                transformar seu corpo de forma natural e saudável.
              </p>
            </div>

            <Card className="p-6 bg-amber-50 border-2 border-amber-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-gray-900 text-lg">Mas atenção...</p>
                  <p className="text-gray-700 leading-relaxed">
                    A roleta foi programada para oferecer apenas{" "}
                    <span className="font-bold text-red-600">uma oportunidade real por pessoa</span>. Depois que você
                    girar, não é possível tentar novamente.
                  </p>
                </div>
              </div>
            </Card>

            <h3 className="text-xl font-bold text-gray-900 text-center">🎁 Bônus disponíveis na roleta:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {prizes.map((prize) => (
                <div
                  key={prize.id}
                  className={`flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border-2 ${prize.id === 2 ? "border-amber-300 bg-amber-50" : "border-gray-100"}`}
                >
                  <span className="text-2xl">{prize.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{prize.name}</p>
                    <p className="text-xs text-gray-600">{prize.subtitle}</p>
                  </div>
                  {prize.id === 2 && (
                    <span className="ml-auto text-xs bg-amber-500 text-white px-2 py-1 rounded-full font-bold">
                      RARO
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Card className="p-8 space-y-8 bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-2xl">
              <div className="text-center space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">🎯 Sua roleta está pronta!</h3>
                <p className="text-gray-600">
                  Respire fundo... Clique em "Girar" e veja qual presente vai acelerar ainda mais sua jornada rumo ao
                  corpo que você deseja.
                </p>
              </div>

              <div className="relative w-80 h-80 mx-auto">
                <div
                  className="relative w-full h-full rounded-full shadow-2xl transition-transform duration-[4000ms] ease-out"
                  style={{ transform: `rotate(${wheelRotation}deg)` }}
                >
                  <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white shadow-lg">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #22c55e 0deg 65deg, #fbbf24 65deg 90deg, #ef4444 90deg 145deg, #3b82f6 145deg 200deg, #8b5cf6 200deg 255deg, #ec4899 255deg 310deg, #10b981 310deg 360deg)",
                      }}
                    ></div>

                    {prizes.map((prize, index) => (
                      <div
                        key={prize.id}
                        className="absolute w-full h-full flex items-center justify-center"
                        style={{
                          transform: `rotate(${prize.angle + prize.size / 2}deg)`,
                        }}
                      >
                        <div
                          className="text-4xl"
                          style={{
                            transform: `translateY(-120px) rotate(${-(prize.angle + prize.size / 2)}deg)`,
                          }}
                        >
                          {prize.image}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-xl flex items-center justify-center border-4 border-white">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[35px] border-t-red-600 drop-shadow-2xl"></div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-8 text-xl md:text-2xl rounded-full shadow-xl disabled:opacity-50 font-bold hover:scale-105 transition-transform"
                >
                  {isSpinning ? " રૂ Girando a roleta..." : "Gire agora e descubra seu presente ➜"}
                </Button>

                <p className="text-center text-sm font-bold text-red-600 bg-red-50 p-3 rounded-lg">
                  ⏰ Você tem apenas 1 chance! Não perca esta oportunidade.
                </p>
              </div>
            </Card>

            <div className="text-center space-y-2 bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-2xl shadow-lg">
              <p className="text-white font-bold text-lg md:text-xl">✨ Seu momento de mudança começa agora! ✨</p>
              <p className="text-green-100 text-sm">
                Milhares de mulheres já transformaram seus corpos com o Projeto Mounjaro 30 Dias
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 15 (was 14) - Bonus Reveal Page (now step 15.5 after wheel spin)
  if (step === 15) {
    const allBonuses = [
      { id: 1, name: "Protocolo Mounjaro de Pobre", subtitle: "Guia completo passo a passo", emoji: "📋" },
      { id: 2, name: "Cardápio Inteligente", subtitle: "Plano alimentar personalizado", emoji: "🍽️" },
      { id: 3, name: "Guia de Treino", subtitle: "Exercícios adaptados para você", emoji: "🏋️" },
      { id: 4, name: "Receitas Detox", subtitle: "30 receitas de chás poderosos", emoji: "🍵" },
      { id: 5, name: "Planner Saudável", subtitle: "Acompanhe sua evolução diária", emoji: "📅" },
      { id: 6, name: "Desafio 30 Dias Premium", subtitle: "Comunidade exclusiva + suporte", emoji: "🚀" },
    ]

    // Dynamically reveal bonuses
    // Moved this useEffect to the top level

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                backgroundColor: ["#22c55e", "#fbbf24", "#ef4444", "#3b82f6", "#ec4899"][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        <Card className="max-w-2xl w-full p-8 space-y-6 shadow-2xl border-4 border-green-500 bg-white relative z-10 animate-scale-in">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-lg animate-pulse">
              <Gift className="h-12 w-12 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">🎉 Parabéns! Você Desbloqueou:</h2>

            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-3xl font-bold mb-2">100% DE BÔNUS!</p>
              <p className="text-xl font-semibold">💰 Pacote Completo 💰</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-center font-bold text-lg text-gray-900">Seus bônus exclusivos:</p>
            {allBonuses.map((bonus) => (
              <div
                key={bonus.id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                  revealedBonuses.includes(bonus.id)
                    ? "bg-green-50 border-green-500 opacity-100 translate-x-0"
                    : "bg-gray-100 border-gray-300 opacity-30 translate-x-[-20px]"
                }`}
              >
                <div className="flex-shrink-0 text-3xl">{bonus.emoji}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{bonus.name}</p>
                  <p className="text-sm text-gray-600">{bonus.subtitle}</p>
                </div>
                {revealedBonuses.includes(bonus.id) && <Check className="h-6 w-6 text-green-600 animate-scale-in" />}
              </div>
            ))}
          </div>

          {revealedBonuses.length === allBonuses.length && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-xl text-center">
                <p className="text-2xl font-bold text-gray-900 mb-2">Você quer receber seus bônus hoje?</p>
                <p className="text-sm text-gray-600">Esta é uma oferta única e expira em breve!</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setStep(step + 1)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-sm md:text-base rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  ✅ Sim, quero!
                </Button>
                <Button
                  onClick={() => setStep(step + 1)}
                  variant="outline"
                  className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 py-6 text-sm md:text-base rounded-full font-bold"
                >
                  ❌ Não, obrigada
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    )
  }

  // Step 16 (was 15) - Loading Page
  if (step === 16) {
    // Only start loading if not already loading
    // Moved this useEffect to the top level

    const loadingSteps = [
      { progress: 15, text: "Analisando seu peso atual..." },
      { progress: 30, text: "Calculando seu IMC..." },
      { progress: 45, text: "Selecionando nutrientes ideais..." },
      { progress: 60, text: "Ajustando dosagem personalizada..." },
      { progress: 75, text: "Preparando seu protocolo..." },
      { progress: 90, text: "Liberando seus bônus exclusivos..." },
      { progress: 100, text: "✅ Tudo pronto!" },
    ]

    const currentStep = loadingSteps.filter((s) => s.progress <= loadingProgress).pop()

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-8 animate-fade-in">
          <div className="text-center">
            <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-16 w-auto mx-auto mb-8" />
          </div>

          <Card className="p-8 space-y-8 shadow-xl">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full animate-pulse">
                <Sparkles className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Preparando sua fórmula personalizada...</h2>
              <p className="text-gray-600">Estamos analisando seus dados e criando o protocolo perfeito para você!</p>
            </div>

            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{loadingProgress}%</p>
                <p className="text-sm text-gray-600 mt-2 animate-pulse">{currentStep?.text || "Processando..."}</p>
              </div>
            </div>

            <div className="space-y-3">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    loadingProgress >= step.progress ? "bg-green-50 border border-green-200" : "bg-gray-50 opacity-40"
                  }`}
                >
                  {loadingProgress >= step.progress ? (
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                  )}
                  <p
                    className={`text-sm ${loadingProgress >= step.progress ? "text-gray-900 font-medium" : "text-gray-500"}`}
                  >
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <p className="text-center text-sm text-gray-500">⏱️ Isso levará apenas alguns segundos...</p>
        </div>
      </div>
    )
  }

  // Step 17 (was 16) - Final Page
  if (step === 17) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 py-8">
        <div className="max-w-md w-full space-y-6 animate-fade-in">
          <div className="text-center">
            <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 w-auto mx-auto mb-6" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {formData.name}, pronta para <span className="text-green-600">emagrecer de verdade</span>?
            </h1>
            <p className="text-sm text-gray-600">O corpo que você sonha está a 30 dias de distância.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-2 border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Peso Atual</p>
              <p className="text-3xl font-bold text-red-600">{formData.currentWeight}kg</p>
            </Card>
            <Card className="p-4 border-2 border-green-500 bg-green-50">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-700 font-medium">Peso Objetivo</p>
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">ALCANÇÁVEL</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{formData.goalWeight}kg</p>
            </Card>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">Meta de Emagrecimento Saudável</p>
              <p className="text-sm font-bold text-green-600">
                {Math.round(((formData.currentWeight - formData.goalWeight) / formData.currentWeight) * 100)}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{
                  width: `${Math.round(((formData.currentWeight - formData.goalWeight) / formData.currentWeight) * 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Sua meta é perder <span className="font-bold">{calculateWeightLoss()}kg</span> de forma saudável. Nós
              vamos te ajudar!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 text-center">Como funciona o Projeto Mounjaro ?</h2>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">💊</div>
                <p className="text-sm font-bold text-gray-900">Receita Natural Potente</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ingredientes naturais que acionam sua queima de gordura como os medicamentos caros.
                </p>
              </Card>

              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">✨</div>
                <p className="text-sm font-bold text-gray-900">Desbloqueia o Corpo</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Elimina gases acumulados, reduz o inchaço e aumenta sua energia. Saciedade por mais tempo.
                </p>
              </Card>

              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">🏠</div>
                <p className="text-sm font-bold text-gray-900">Cardápio Inteligente</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Acompanhado passo a passo sobre dietas sem medicamentos, sem fórmulas complicadas. Tudo natural e
                  barato.
                </p>
              </Card>

              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">💪</div>
                <p className="text-sm font-bold text-gray-900">Treino em Casa (5min/dia)</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Exercícios simples e eficazes que aceleram o metabolismo sem academias caras.
                </p>
              </Card>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 text-center">
              Ao Garantir Sua Fórmula do Mounjaro 30 Dias Hoje
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xs">24h</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Perda consciente e sustentável:</span> resultado sensível já nos primeiros
                  dias.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xs">48h</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Redução de 80kg:</span> Monitoramento diário sobre resultados de
                  emagrecimento.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">⚡</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Emaça induzida:</span> Controle moderado de gordura nas células sem
                  drogas.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold">🛡️</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Energiza e revitaliza:</span> Acelere seu metabolismo e tenha mais alegria
                  por mais tempo.
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6 bg-green-50 border-2 border-green-500 space-y-3">
            <h3 className="text-base font-bold text-gray-900 text-center mb-3">Tudo que você vai receber hoje:</h3>

            <div className="space-y-2 text-sm">
              {[
                "Protocolo de Manejano Personalizado",
                "Plano de Perda Exclusivo (0 meds)",
                "Cardápio Balanceado com Emagrecimento Rápico",
                "Chás Detox + Sucos Termogênicos (PDF)",
                "Guia de Jejum Intermitente de emergência",
                "Checklists Exclusiva do Metabolizador Ativo",
                "Acesse via Null computador ou 7 dias",
                "Suporte Direto e Atualizações Ilimitadas de conteúdo",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500 line-through">De R$ 297,00</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">por apenas</p>
                <p className="text-5xl font-bold text-green-600">R$ 37,25</p>
                <p className="text-sm text-gray-600">ou 12x de R$ 3,60 sem juros</p>
              </div>
            </div>

            <Button
              onClick={() => (window.location.href = "https://pay.cakto.com.br/32fbed9_600746")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-full shadow-lg font-bold"
            >
              QUERO HOJE AGORA! →
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <span className="text-green-600">🔒</span> Compra 100% protegida
              </span>
              <span>•</span>
              <span>7 dias para pedir reembolso</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 18 (was 17) - Final Page (This seems to be a duplicate of step 17. Assuming it should be a distinct step, I'll keep it as is but note the redundancy.)
  if (step === 18) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 py-8">
        <div className="max-w-md w-full space-y-6 animate-fade-in">
          <div className="text-center">
            <img src="/images/mounjaro-logo.png" alt="Mounjaro Logo" className="h-10 w-auto mx-auto mb-6" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {formData.name}, pronta para <span className="text-green-600">emagrecer de verdade</span>?
            </h1>
            <p className="text-sm text-gray-600">O corpo que você sonha está a 30 dias de distância.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-2 border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Peso Atual</p>
              <p className="text-3xl font-bold text-red-600">{formData.currentWeight}kg</p>
            </Card>
            <Card className="p-4 border-2 border-green-500 bg-green-50">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-700 font-medium">Peso Objetivo</p>
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">ALCANÇÁVEL</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{formData.goalWeight}kg</p>
            </Card>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">Meta de Emagrecimento Saudável</p>
              <p className="text-sm font-bold text-green-600">
                {Math.round(((formData.currentWeight - formData.goalWeight) / formData.currentWeight) * 100)}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{
                  width: `${Math.round(((formData.currentWeight - formData.goalWeight) / formData.currentWeight) * 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Sua meta é perder <span className="font-bold">{calculateWeightLoss()}kg</span> de forma saudável. Nós
              vamos te ajudar!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 text-center">Como funciona o Projeto Mounjaro ?</h2>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">💊</div>
                <p className="text-sm font-bold text-gray-900">Receita Natural Potente</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ingredientes naturais que acionam sua queima de gordura como os medicamentos caros.
                </p>
              </Card>

              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">✨</div>
                <p className="text-sm font-bold text-gray-900">Desbloqueia o Corpo</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Elimina gases acumulados, reduz o inchaço e aumenta sua energia. Saciedade por mais tempo.
                </p>
              </Card>

              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">🏠</div>
                <p className="text-sm font-bold text-gray-900">Cardápio Inteligente</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Acompanhado passo a passo sobre dietas sem medicamentos, sem fórmulas complicadas. Tudo natural e
                  barato.
                </p>
              </Card>

              <Card className="p-4 space-y-2 border border-gray-200">
                <div className="text-3xl">💪</div>
                <p className="text-sm font-bold text-gray-900">Treino em Casa (5min/dia)</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Exercícios simples e eficazes que aceleram o metabolismo sem academias caras.
                </p>
              </Card>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 text-center">
              Ao Garantir Sua Fórmula do Mounjaro 30 Dias Hoje
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xs">24h</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Perda consciente e sustentável:</span> resultado sensível já nos primeiros
                  dias.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xs">48h</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Redução de 80kg:</span> Monitoramento diário sobre resultados de
                  emagrecimento.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">⚡</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Emaça induzida:</span> Controle moderado de gordura nas células sem
                  drogas.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold">🛡️</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-bold">Energiza e revitaliza:</span> Acelere seu metabolismo e tenha mais alegria
                  por mais tempo.
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6 bg-green-50 border-2 border-green-500 space-y-3">
            <h3 className="text-base font-bold text-gray-900 text-center mb-3">Tudo que você vai receber hoje:</h3>

            <div className="space-y-2 text-sm">
              {[
                "Protocolo de Manejano Personalizado",
                "Plano de Perda Exclusivo (0 meds)",
                "Cardápio Balanceado com Emagrecimento Rápico",
                "Chás Detox + Sucos Termogênicos (PDF)",
                "Guia de Jejum Intermitente de emergência",
                "Checklists Exclusiva do Metabolizador Ativo",
                "Acesse via Null computador ou 7 dias",
                "Suporte Direto e Atualizações Ilimitadas de conteúdo",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500 line-through">De R$ 297,00</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">por apenas</p>
                <p className="text-5xl font-bold text-green-600">R$ 37,25</p>
                <p className="text-sm text-gray-600">ou 12x de R$ 3,60 sem juros</p>
              </div>
            </div>

            <Button
              onClick={() => (window.location.href = "https://pay.cakto.com.br/32fbed9_600746")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-full shadow-lg font-bold"
            >
              QUERO HOJE AGORA! →
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <span className="text-green-600">🔒</span> Compra 100% protegida
              </span>
              <span>•</span>
              <span>7 dias para pedir reembolso</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
