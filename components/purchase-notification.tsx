"use client"

import { useState, useEffect } from "react"

const feminineNames = [
  "Ana",
  "Maria",
  "Juliana",
  "Fernanda",
  "Camila",
  "Beatriz",
  "Larissa",
  "Isabela",
  "Amanda",
  "Mariana",
  "Letícia",
  "Patrícia",
  "Vanessa",
  "Renata",
  "Carla",
  "Aline",
  "Bruna",
  "Carolina",
  "Daniela",
  "Eduarda",
  "Flávia",
  "Gabriela",
  "Helena",
  "Íris",
  "Jéssica",
  "Karina",
  "Luana",
  "Mônica",
  "Natália",
  "Paula",
  "Rafaela",
  "Sabrina",
  "Tatiana",
  "Vitória",
]

const masculineNames = [
  "João",
  "Pedro",
  "Carlos",
  "Rafael",
  "Lucas",
  "Gabriel",
  "Matheus",
  "Felipe",
  "Bruno",
  "Rodrigo",
  "Thiago",
  "André",
  "Gustavo",
  "Vinícius",
  "Leonardo",
]

const surnames = [
  "Silva",
  "Santos",
  "Oliveira",
  "Costa",
  "Souza",
  "Ferreira",
  "Lima",
  "Alves",
  "Rodrigues",
  "Pereira",
  "Martins",
  "Barbosa",
  "Carvalho",
  "Ribeiro",
  "Araújo",
  "Dias",
  "Cardoso",
  "Castro",
  "Rocha",
  "Gomes",
  "Monteiro",
  "Fernandes",
  "Mendes",
  "Cavalcanti",
  "Ramos",
  "Pinto",
  "Duarte",
  "Azevedo",
  "Moreira",
  "Correia",
  "Teixeira",
  "Freitas",
  "Campos",
  "Melo",
  "Cunha",
  "Barros",
  "Moura",
  "Pires",
  "Nunes",
  "Vieira",
  "Miranda",
  "Macedo",
  "Borges",
  "Farias",
  "Batista",
  "Lopes",
  "Nascimento",
  "Andrade",
  "Cruz",
  "Soares",
  "Rezende",
  "Guimarães",
  "Nogueira",
  "Torres",
  "Fonseca",
  "Santana",
  "Morais",
  "Aguiar",
  "Machado",
  "Coelho",
]

const usedSurnames = new Set<string>()

function getRandomName(): string {
  // 80% chance of feminine name, 20% masculine
  const isFeminine = Math.random() < 0.8
  const firstNames = isFeminine ? feminineNames : masculineNames
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]

  // Get a surname that hasn't been used yet
  let availableSurnames = surnames.filter((s) => !usedSurnames.has(s))

  // If all surnames have been used, reset the set
  if (availableSurnames.length === 0) {
    usedSurnames.clear()
    availableSurnames = [...surnames]
  }

  const surname = availableSurnames[Math.floor(Math.random() * availableSurnames.length)]
  usedSurnames.add(surname)

  return `${firstName} ${surname}`
}

export function PurchaseNotification() {
  const [notification, setNotification] = useState<{ name: string; visible: boolean } | null>(null)

  useEffect(() => {
    const showNotification = () => {
      const randomName = getRandomName()
      setNotification({ name: randomName, visible: true })

      // Hide after 5 seconds
      setTimeout(() => {
        setNotification((prev) => (prev ? { ...prev, visible: false } : null))
      }, 5000)
    }

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(showNotification, 5000)

    // Then show every 15 seconds
    const interval = setInterval(showNotification, 15000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  if (!notification) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
        notification.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-green-100 p-3 max-w-[280px]">
        <div className="flex items-start gap-2.5">
          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-900">{notification.name}</p>
            <p className="text-[11px] text-gray-600 mt-0.5">acabou de adquirir o produto!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
