import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Plus, Search, Trash2 } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Textarea } from '@/shared/components/ui/textarea'
import { useMessages } from '@/shared/i18n'

import { APP_MESSAGES } from '@/app/messages'
import { usePeople } from '../hooks/use-people'
import { PEOPLE_MESSAGES } from '../messages'
import { SAMPLE_PEOPLE } from '../mocks/sample-people'
import type { Person } from '../types'

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return (parts[0]?.[0] ?? '?').toUpperCase()
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function PersonAvatar({ person }: { person: Person }) {
  if (person.photo) {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
        <img src={person.photo} alt={person.name} className="size-full object-cover" />
      </div>
    )
  }
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
      style={{ background: person.color ?? '#8D867C' }}
    >
      {initialsOf(person.name)}
    </div>
  )
}

export function PeoplePage() {
  const m = useMessages(PEOPLE_MESSAGES)
  const app = useMessages(APP_MESSAGES)
  const navigate = useNavigate()
  const { people, loading, createPerson, deletePerson } = usePeople()

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<Person | null>(null)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [notes, setNotes] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return people
    return people.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.company ?? '').toLowerCase().includes(q) ||
        (p.role ?? '').toLowerCase().includes(q),
    )
  }, [people, query])

  function resetForm() {
    setName('')
    setCompany('')
    setRole('')
    setNotes('')
  }

  async function loadSample() {
    for (const sample of SAMPLE_PEOPLE) {
      await createPerson(sample)
    }
    toast.success(m.toast_created)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    await createPerson({
      name: name.trim(),
      initials: initialsOf(name),
      company: company.trim() || undefined,
      relationshipType: role.trim() || undefined,
      role: role.trim() || undefined,
      about: notes.trim() || undefined,
      color: '#8D867C',
      strength: 'normal',
      active: true,
    })
    toast.success(m.toast_created)
    resetForm()
    setOpen(false)
  }

  async function onDelete() {
    if (!pending) return
    await deletePerson(pending.id)
    toast.success(m.toast_deleted)
    setPending(null)
  }

  return (
    <div className="px-10 py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium tracking-wider text-ink-3 uppercase">
            {m.people_kicker}
          </div>
          <h1 className="text-2xl font-semibold">{m.people_title}</h1>
          <p className="mt-1 text-sm text-ink-2">{m.people_sub}</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          {m.add_person_title}
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-3" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={m.people_search_ph}
          className="pl-9"
        />
      </div>

      <div className="mb-2 text-xs text-ink-3">
        {m.people_count.replace('{count}', String(people.length))}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-10 text-center">
          <div className="text-sm font-medium">{m.people_empty}</div>
          <div className="text-sm text-ink-3">{m.people_empty_sub}</div>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => void loadSample()}>
            {m.load_sample}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((person) => (
            <div key={person.id} className="flex items-center gap-3 rounded-xl border bg-card p-3">
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                onClick={() => navigate(`/people/${person.id}`)}
              >
                <PersonAvatar person={person} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{person.name}</div>
                  <div className="truncate text-xs text-ink-2">
                    {[person.role, person.company].filter(Boolean).join(' · ') ||
                      person.currentCity ||
                      '—'}
                  </div>
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPending(person)}
                aria-label={app.common_delete}
              >
                <Trash2 className="size-4 text-ink-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{m.add_person_title}</DialogTitle>
            <DialogDescription>{m.add_person_sub}</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-name">{m.field_name}</Label>
              <Input
                id="p-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={m.field_name_ph}
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-company">{m.field_company}</Label>
              <Input
                id="p-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={m.field_company_ph}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-role">{m.field_role}</Label>
              <Input
                id="p-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={m.field_role_ph}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-notes">{m.field_notes}</Label>
              <Textarea
                id="p-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={m.field_notes_ph}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {app.common_cancel}
              </Button>
              <Button type="submit" disabled={!name.trim()}>
                {app.common_save}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!pending} onOpenChange={(v) => !v && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{m.delete_title}</AlertDialogTitle>
            <AlertDialogDescription>
              {m.delete_desc.replace('{name}', pending?.name ?? '')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{app.common_cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void onDelete()}
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
