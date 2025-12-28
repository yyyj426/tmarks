/**
 * 新用户引导组件
 * 在用户首次登录时显示，引导完成基本设置
 */

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  X,
  Key,
  CheckCircle2,
  ArrowRight,
  Puzzle,
  Sparkles,
} from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  completed?: boolean
}

interface OnboardingGuideProps {
  onClose: () => void
  onComplete: () => void
}

const ONBOARDING_STORAGE_KEY = 'tmarks-onboarding-completed'

export function OnboardingGuide({ onClose, onComplete }: OnboardingGuideProps) {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: t('onboarding.welcome.title'),
      description: t('onboarding.welcome.description'),
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      id: 'extension',
      title: t('onboarding.extension.title'),
      description: t('onboarding.extension.description'),
      icon: <Puzzle className="w-8 h-8" />,
      action: {
        label: t('onboarding.extension.action'),
        onClick: () => {
          navigate('/settings?tab=browser')
          markStepCompleted('extension')
        },
      },
    },
    {
      id: 'apiKey',
      title: t('onboarding.apiKey.title'),
      description: t('onboarding.apiKey.description'),
      icon: <Key className="w-8 h-8" />,
      action: {
        label: t('onboarding.apiKey.action'),
        onClick: () => {
          navigate('/settings?tab=api')
          markStepCompleted('apiKey')
        },
      },
    },
    {
      id: 'done',
      title: t('onboarding.done.title'),
      description: t('onboarding.done.description'),
      icon: <CheckCircle2 className="w-8 h-8" />,
    },
  ]

  const markStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const step = steps[currentStep]
      if (step) markStepCompleted(step.id)
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
    onComplete()
  }

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  if (!currentStepData) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* 进度条 */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 内容区域 */}
        <div className="p-8">
          {/* 图标 */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              {currentStepData.icon}
            </div>
          </div>

          {/* 标题和描述 */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">{currentStepData.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{currentStepData.description}</p>
          </div>

          {/* 步骤指示器 */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-6 bg-primary'
                    : index < currentStep || completedSteps.has(step.id)
                      ? 'bg-primary/50'
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col gap-3">
            {currentStepData.action && (
              <button
                onClick={currentStepData.action.onClick}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                {currentStepData.action.label}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="flex gap-3">
              {!isLastStep && (
                <button onClick={handleSkip} className="btn btn-ghost flex-1">
                  {t('onboarding.skip')}
                </button>
              )}
              <button
                onClick={handleNext}
                className={`btn ${isLastStep ? 'btn-primary' : 'btn-ghost'} flex-1 flex items-center justify-center gap-2`}
              >
                {isLastStep ? t('onboarding.start') : t('onboarding.next')}
                {!isLastStep && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 检查是否需要显示引导
 */
export function useOnboardingStatus() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    setShowOnboarding(!completed)
    setChecked(true)
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
    setShowOnboarding(false)
  }

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    setShowOnboarding(true)
  }

  return {
    showOnboarding,
    checked,
    completeOnboarding,
    resetOnboarding,
    setShowOnboarding,
  }
}
