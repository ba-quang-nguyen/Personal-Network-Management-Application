import { NavLink, Outlet } from 'react-router'
import { Bell, Home, LogOut, Moon, Network, Search, Settings, Sun, Users } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useLocale, useMessages } from '@/shared/i18n'
import { useTheme } from '@/shared/hooks/use-theme'
import { useAuth } from '@/features/auth/auth-provider'

import { APP_MESSAGES } from '@/app/messages'

type NavItem = {
  to: string
  key: 'nav_today' | 'nav_people' | 'nav_care' | 'nav_ask' | 'nav_map' | 'nav_settings'
  icon: React.ComponentType<{ className?: string }>
  end?: boolean
}

const NAV: NavItem[] = [
  { to: '/', key: 'nav_today', icon: Home, end: true },
  { to: '/people', key: 'nav_people', icon: Users },
  { to: '/care', key: 'nav_care', icon: Bell },
  { to: '/ask', key: 'nav_ask', icon: Search },
  { to: '/map', key: 'nav_map', icon: Network },
  { to: '/settings', key: 'nav_settings', icon: Settings },
]

export function AppLayout() {
  const m = useMessages(APP_MESSAGES)
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface-2/50">
        <div className="flex items-center gap-2.5 px-4 py-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground">
            NM
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{m.app_name}</div>
            <div className="truncate text-[11px] text-ink-3">{m.tagline}</div>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5 px-2">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-accent text-accent-foreground',
                  )
                }
              >
                <Icon className="size-4" />
                {m[item.key]}
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border p-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-between font-bold tracking-wide"
              onClick={() => setLocale(locale === 'vi' ? 'en' : 'vi')}
            >
              {locale === 'vi' ? 'EN' : 'VI'}
              <span className="text-[10px] font-normal text-ink-3">/ JA</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => void signOut()}
              title={m.auth_sign_out}
            >
              <LogOut className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <div className="flex size-7 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
              {(user?.displayName ?? m.you).slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 text-xs">
              <div className="truncate font-semibold">{user?.displayName ?? m.you}</div>
              <div className="truncate text-ink-3">{m.you_sub}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
