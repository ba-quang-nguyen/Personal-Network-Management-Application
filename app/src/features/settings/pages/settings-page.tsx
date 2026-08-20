import { useRef, useState } from 'react'
import { Download, LogOut, Trash2, Upload } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { Switch } from '@/shared/components/ui/switch'
import { useTheme } from '@/shared/hooks/use-theme'
import { useLocale, useMessages } from '@/shared/i18n'
import { useAuth } from '@/features/auth/auth-provider'
import { usePeople } from '@/features/people/hooks/use-people'
import { APP_MESSAGES } from '@/app/messages'

import { parsePeopleJson, serializePeople } from '../lib/transfer'
import { SETTINGS_MESSAGES } from '../messages'

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function SettingsPage() {
  const m = useMessages(SETTINGS_MESSAGES)
  const app = useMessages(APP_MESSAGES)
  const { theme, setTheme } = useTheme()
  const { locale, setLocale } = useLocale()
  const { signOut } = useAuth()
  const { people, createPerson, deletePerson } = usePeople()

  const fileRef = useRef<HTMLInputElement>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  function onExport() {
    download('network-management-backup.json', serializePeople(people))
    toast.success(m.toast_exported)
  }

  async function onImportFile(file: File) {
    try {
      const text = await file.text()
      const imported = parsePeopleJson(text)
      for (const person of imported) {
        await createPerson({ ...person })
      }
      toast.success(m.toast_imported.replace('{count}', String(imported.length)))
    } catch {
      toast.error(m.toast_import_error)
    }
  }

  async function onDeleteAll() {
    for (const person of people) {
      await deletePerson(person.id)
    }
    setConfirmDelete(false)
    toast.success(m.toast_deleted_all)
  }

  return (
    <div className="mx-auto max-w-xl px-10 py-8">
      <div className="mb-6">
        <div className="text-xs font-medium tracking-wider text-ink-3 uppercase">
          {m.settings_kicker}
        </div>
        <h1 className="text-2xl font-semibold">{m.settings_title}</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border bg-card p-4">
          <div className="text-sm font-semibold">{m.settings_language}</div>
          <div className="mt-3 flex gap-2">
            {(['vi', 'en', 'ja'] as const).map((l) => (
              <Button
                key={l}
                variant={locale === l ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocale(l)}
              >
                {l.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border bg-card p-4">
          <div>
            <div className="text-sm font-semibold">{m.settings_dark}</div>
            <div className="text-xs text-ink-3">{m.settings_dark_sub}</div>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
          />
        </div>

        <Separator />

        <div className="rounded-xl border bg-card p-4">
          <div className="text-sm font-semibold">{m.settings_data}</div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm">{m.settings_export}</div>
                <div className="text-xs text-ink-3">{m.settings_export_sub}</div>
              </div>
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="size-4" />
                {m.settings_export}
              </Button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm">{m.settings_import}</div>
                <div className="text-xs text-ink-3">{m.settings_import_sub}</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="size-4" />
                {m.settings_import}
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void onImportFile(file)
                  e.target.value = ''
                }}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-destructive">{m.settings_delete}</div>
                <div className="text-xs text-ink-3">{m.settings_delete_sub}</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setConfirmDelete(true)}>
                <Trash2 className="size-4 text-destructive" />
                {app.common_delete}
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <Button variant="outline" onClick={() => void signOut()}>
          <LogOut className="size-4" />
          {app.auth_sign_out}
        </Button>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{m.delete_all_title}</AlertDialogTitle>
            <AlertDialogDescription>{m.delete_all_desc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{app.common_cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void onDeleteAll()}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {app.common_delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
