import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { OnboardingGuide, useOnboardingStatus } from '@/components/onboarding/OnboardingGuide'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { showOnboarding, checked, completeOnboarding, setShowOnboarding } = useOnboardingStatus()

  // 开发环境下可以跳过登录
  const skipAuth = import.meta.env.VITE_SKIP_AUTH === 'true'

  if (!isAuthenticated && !skipAuth) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Outlet />
      {checked && showOnboarding && (
        <OnboardingGuide
          onClose={() => setShowOnboarding(false)}
          onComplete={completeOnboarding}
        />
      )}
    </>
  )
}
