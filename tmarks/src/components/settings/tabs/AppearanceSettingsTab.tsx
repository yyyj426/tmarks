/**
 * 外观设置标签页
 * 包含图标样式、列表显示等外观相关设置
 */

import { useTranslation } from 'react-i18next'
import { Palette, Image, Globe, FileText, Hash, LayoutGrid, List, Columns } from 'lucide-react'
import { SettingsSection, SettingsDivider } from '../SettingsSection'
import { InfoBox } from '../InfoBox'
import type { DefaultBookmarkIcon } from '@/lib/types'

interface AppearanceSettingsTabProps {
  defaultIcon: DefaultBookmarkIcon
  onIconChange: (icon: DefaultBookmarkIcon) => void
  listDensity?: 'compact' | 'normal' | 'comfortable'
  onListDensityChange?: (density: 'compact' | 'normal' | 'comfortable') => void
  defaultView?: 'list' | 'grid' | 'card'
  onDefaultViewChange?: (view: 'list' | 'grid' | 'card') => void
}

const ICON_OPTIONS: { value: DefaultBookmarkIcon; icon: React.ReactNode; labelKey: string }[] = [
  { value: 'favicon', icon: <Globe className="w-5 h-5" />, labelKey: 'appearance.icon.favicon' },
  { value: 'letter', icon: <FileText className="w-5 h-5" />, labelKey: 'appearance.icon.letter' },
  { value: 'hash', icon: <Hash className="w-5 h-5" />, labelKey: 'appearance.icon.hash' },
  { value: 'none', icon: <Image className="w-5 h-5" />, labelKey: 'appearance.icon.none' },
]

const DENSITY_OPTIONS = [
  { value: 'compact', labelKey: 'appearance.density.compact' },
  { value: 'normal', labelKey: 'appearance.density.normal' },
  { value: 'comfortable', labelKey: 'appearance.density.comfortable' },
]

const VIEW_OPTIONS = [
  { value: 'list', icon: <List className="w-5 h-5" />, labelKey: 'appearance.view.list' },
  { value: 'grid', icon: <LayoutGrid className="w-5 h-5" />, labelKey: 'appearance.view.grid' },
  { value: 'card', icon: <Columns className="w-5 h-5" />, labelKey: 'appearance.view.card' },
]

export function AppearanceSettingsTab({
  defaultIcon,
  onIconChange,
  listDensity = 'normal',
  onListDensityChange,
  defaultView = 'list',
  onDefaultViewChange,
}: AppearanceSettingsTabProps) {
  const { t } = useTranslation('settings')

  return (
    <div className="space-y-6">
      {/* 默认图标设置 */}
      <SettingsSection icon={Palette} title={t('appearance.icon.title')} description={t('appearance.icon.description')}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ICON_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onIconChange(option.value)}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                defaultIcon === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {option.icon}
              <span className="text-xs font-medium">{t(option.labelKey)}</span>
            </button>
          ))}
        </div>
      </SettingsSection>

      <SettingsDivider />

      {/* 默认视图 */}
      <SettingsSection icon={LayoutGrid} title={t('appearance.view.title')} description={t('appearance.view.description')}>
        <div className="grid grid-cols-3 gap-3">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onDefaultViewChange?.(option.value as 'list' | 'grid' | 'card')}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                defaultView === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {option.icon}
              <span className="text-xs font-medium">{t(option.labelKey)}</span>
            </button>
          ))}
        </div>
      </SettingsSection>

      <SettingsDivider />

      {/* 列表密度 */}
      <SettingsSection icon={List} title={t('appearance.density.title')} description={t('appearance.density.description')}>
        <div className="flex gap-2">
          {DENSITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onListDensityChange?.(option.value as 'compact' | 'normal' | 'comfortable')}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all text-sm font-medium ${
                listDensity === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      </SettingsSection>

      <SettingsDivider />

      <InfoBox icon={Palette} title={t('appearance.infoBox.title')} variant="info">
        <ul className="space-y-1 text-xs">
          <li>• {t('appearance.infoBox.tip1')}</li>
        </ul>
      </InfoBox>
    </div>
  )
}
