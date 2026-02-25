import React, { useState, useEffect } from "react"

const MakingAssessment = () => {
  const assessmentData = {
    title: "Technical Skills Assessment",
    description:
      "Evaluate your technical knowledge and problem-solving abilities through written questions.",
    questionsCount: 3,
    cooldownPeriod: "14 Days",
    estimatedTime: "60 minutes",
    questionTime: 60,
    questions: [
      {
        id: 1,
        text: "Explain the difference between a stack and a queue Include a real-world example for each data structure."
      },
      {
        id: 2,
        text: "Explain the difference between a stack and a queue Include a real-world example for each data structure."
      },
      {
        id: 3,
        text: "Explain the difference between a stack and a queue Include a real-world example for each data structure."
      }
    ]
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(assessmentData.questionTime)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    if (currentQuestionIndex >= assessmentData.questions.length) return

    if (timeLeft === 0) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeLeft(assessmentData.questionTime)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, currentQuestionIndex])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`
  }

  const handleAnswerChange = (id, value) => {
    setAnswers({ ...answers, [id]: value })
  }

  const progress =
    ((assessmentData.questionTime - timeLeft) /
      assessmentData.questionTime) *
    100

  const currentQuestionNumber = currentQuestionIndex + 1

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold dark-blue mb-2">
              {assessmentData.title}
            </h1>
            <p className="text-gray-500 mb-4">
              {assessmentData.description}
            </p>

            <div className="flex gap-3 flex-wrap">
              <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                Questions : {assessmentData.questionsCount}
              </span>
              <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                Cooldown_period : {assessmentData.cooldownPeriod}
              </span>
              <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                Estimated Time : {assessmentData.estimatedTime}
              </span>
            </div>
          </div>

          {currentQuestionIndex < assessmentData.questions.length && (
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 rotate-[-90deg]">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251}
                    strokeDashoffset={251 - (progress / 100) * 251}
                    className="dark-blue"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {formatTime(timeLeft)}
                </div>
              </div>
              <p className="text-sm mt-2">
                Time Of Question {currentQuestionNumber}
              </p>
              <span className="text-xs dark-blue">
                {Math.ceil(timeLeft / 60)} minute remaining
              </span>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold dark-blue">
          Questions
        </h2>

        {assessmentData.questions.map((q, index) => {
          const isActive = index === currentQuestionIndex
          const isDisabled = index < currentQuestionIndex

          return (
            <div
              key={q.id}
              className="bg-white rounded-xl shadow p-6 border border-gray-200"
            >
              <p className="text-gray-400 text-sm mb-1">
                Question {index + 1}
              </p>
              <p className="font-bold mb-4">
                {q.text}
              </p>
              <textarea
                placeholder="Write your answer here"
                value={answers[q.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(q.id, e.target.value)
                }
                disabled={!isActive}
                className={`w-full border border-gray-500 rounded-lg p-4 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-dark-blue ${
                  !isActive ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
          )
        })}

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 rounded-lg border border-red-300 text-red-500 bg-white">
            Cancel
          </button>
          <button className="px-6 py-2 rounded-lg bg-dark-blue text-white">
            Submit
          </button>
        </div>

      </div>
    </div>
  )
}

export default MakingAssessment