import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Pencil } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Textarea } from '@/shared/components/ui/textarea'
import { useMessages } from '@/shared/i18n'
import { makeId } from '@/shared/lib/id'
import { APP_MESSAGES } from '@/app/messages'

import { usePeople } from '../hooks/use-people'
import { PEOPLE_MESSAGES } from '../messages'
import {
  STRENGTHS,
  type FollowUp,
  type Meeting,
  type Memory,
  type Person,
  type Strength,
} from '../types'

const FREQUENCIES = ['monthly', '2months', 'quarterly', 'biannual', 'yearly', 'custom'] as const

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-2 text-xs font-semibold tracking-wider text-ink-3 uppercase">{title}</div>
      {children}
    </div>
  )
}

function KV({ k, v }: { k: string; v: string | null | undefined }) {
  if (!v) return null
  return (
    <div className="flex gap-2 py-1 text-sm">
      <span className="w-32 shrink-0 text-ink-3">{k}</span>
      <span className="min-w-0 flex-1 break-words">{v}</span>
    </div>
  )
}

function PersonEditDialog({
  person,
  onClose,
  onSave,
}: {
  person: Person
  onClose: () => void
  onSave: (
    id: string,
    input: Parameters<ReturnType<typeof usePeople>['updatePerson']>[1],
  ) => Promise<void>
}) {
  const m = useMessages(PEOPLE_MESSAGES)
  const app = useMessages(APP_MESSAGES)

  const [form, setForm] = useState({
    name: person.name,
    company: person.company ?? '',
    title: person.title ?? '',
    email: person.email ?? '',
    phone: person.phone ?? '',
    currentCity: person.currentCity ?? '',
    industry: person.industry ?? '',
    relationshipType: person.relationshipType ?? '',
    strength: (person.strength ?? 'normal') as Strength,
    frequency: person.frequency ?? '',
    birthday: person.birthday ?? '',
    about: person.about ?? '',
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave(person.id, {
      name: form.name.trim(),
      company: form.company.trim() || undefined,
      title: form.title.trim() || undefined,
      email: form.email.trim() || undefined,
      phone: form.phone.trim() || undefined,
      currentCity: form.currentCity.trim() || undefined,
      industry: form.industry.trim() || undefined,
      relationshipType: form.relationshipType.trim() || undefined,
      strength: form.strength,
      frequency: form.frequency || undefined,
      birthday: form.birthday.trim() || undefined,
      about: form.about.trim() || undefined,
    })
    onClose()
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{m.edit_person_title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="e-name">{m.field_name}</Label>
            <Input
              id="e-name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-company">{m.field_company}</Label>
              <Input
                id="e-company"
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-title">{m.field_title}</Label>
              <Input
                id="e-title"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-email">{m.field_email}</Label>
              <Input
                id="e-email"
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-phone">{m.field_phone}</Label>
              <Input
                id="e-phone"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-city">{m.field_city}</Label>
              <Input
                id="e-city"
                value={form.currentCity}
                onChange={(e) => set('currentCity', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-industry">{m.field_industry}</Label>
              <Input
                id="e-industry"
                value={form.industry}
                onChange={(e) => set('industry', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-role">{m.field_role}</Label>
              <Input
                id="e-role"
                value={form.relationshipType}
                onChange={(e) => set('relationshipType', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{m.field_strength}</Label>
              <Select value={form.strength} onValueChange={(v) => set('strength', v as Strength)}>
                <SelectTrigger id="e-strength">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STRENGTHS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{m.field_frequency}</Label>
              <Select value={form.frequency} onValueChange={(v) => set('frequency', v)}>
                <SelectTrigger id="e-frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">—</SelectItem>
                  {FREQUENCIES.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="e-birthday">{m.field_birthday}</Label>
              <Input
                id="e-birthday"
                value={form.birthday}
                onChange={(e) => set('birthday', e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="e-about">{m.profile_about}</Label>
            <Textarea
              id="e-about"
              value={form.about}
              onChange={(e) => set('about', e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {app.common_cancel}
            </Button>
            <Button type="submit">{app.common_save}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AddEntryDialog({
  type,
  onClose,
  onSave,
}: {
  type: 'meeting' | 'memory' | 'followUp'
  onClose: () => void
  onSave: (entry: Meeting | Memory | FollowUp) => Promise<void>
}) {
  const m = useMessages(PEOPLE_MESSAGES)
  const app = useMessages(APP_MESSAGES)
  const [f1, setF1] = useState('')
  const [f2, setF2] = useState('')
  const [f3, setF3] = useState('')
  const [kind, setKind] = useState<FollowUp['kind']>('meeting')

  const title =
    type === 'meeting' ? m.add_meeting : type === 'memory' ? m.add_memory : m.add_follow_up

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const id = makeId()
    if (type === 'meeting') {
      await onSave({ id, date: f1, type: 'Meeting', title: f2, summary: f3, tags: [] })
    } else if (type === 'memory') {
      await onSave({ id, when: f1, text: f2 })
    } else {
      await onSave({ id, when: f1, what: f2, kind })
    }
    onClose()
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-3">
          {type === 'meeting' && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="e-date">{m.field_date}</Label>
                <Input
                  id="e-date"
                  value={f1}
                  onChange={(e) => setF1(e.target.value)}
                  placeholder="Aug 22, 2026"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="e-title">{m.field_title}</Label>
                <Input id="e-title" value={f2} onChange={(e) => setF2(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="e-summary">{m.field_summary}</Label>
                <Textarea id="e-summary" value={f3} onChange={(e) => setF3(e.target.value)} />
              </div>
            </>
          )}
          {type === 'memory' && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="e-when">{m.field_when}</Label>
                <Input
                  id="e-when"
                  value={f1}
                  onChange={(e) => setF1(e.target.value)}
                  placeholder="Aug 2026"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="e-text">{m.field_text}</Label>
                <Textarea id="e-text" value={f2} onChange={(e) => setF2(e.target.value)} />
              </div>
            </>
          )}
          {type === 'followUp' && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="e-when">{m.field_when}</Label>
                <Input
                  id="e-when"
                  value={f1}
                  onChange={(e) => setF1(e.target.value)}
                  placeholder="Open"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="e-what">{m.field_what}</Label>
                <Input id="e-what" value={f2} onChange={(e) => setF2(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>{m.field_kind}</Label>
                <Select value={kind} onValueChange={(v) => setKind(v as FollowUp['kind'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(['meeting', 'action', 'reconnect', 'birthday', 'message'] as const).map(
                      (k) => (
                        <SelectItem key={k} value={k}>
                          {k}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {app.common_cancel}
            </Button>
            <Button type="submit">{app.common_save}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function PersonPage() {
  const { personId } = useParams<{ personId: string }>()
  const navigate = useNavigate()
  const m = useMessages(PEOPLE_MESSAGES)
  const app = useMessages(APP_MESSAGES)
  const { people, loading, updatePerson } = usePeople()

  const [editing, setEditing] = useState(false)
  const [addType, setAddType] = useState<'meeting' | 'memory' | 'followUp' | null>(null)
  const person = people.find((p) => p.id === personId)

  async function onAddEntry(entry: Meeting | Memory | FollowUp) {
    if (!person) return
    if ('title' in entry) {
      await updatePerson(person.id, { meetings: [...(person.meetings ?? []), entry] })
    } else if ('text' in entry) {
      await updatePerson(person.id, { memories: [...(person.memories ?? []), entry] })
    } else {
      await updatePerson(person.id, { followUp: entry })
    }
    toast.success(app.common_save)
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3 px-10 py-8">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    )
  }

  if (!person) {
    return (
      <div className="px-10 py-8">
        <p className="text-sm text-ink-2">{m.person_not_found}</p>
        <Button variant="link" className="px-0" onClick={() => navigate('/people')}>
          {m.back_to_people}
        </Button>
      </div>
    )
  }

  const strength = STRENGTHS.find((s) => s.id === person.strength)

  return (
    <div className="px-10 py-8">
      <Button variant="ghost" size="sm" className="mb-4 -ml-2" onClick={() => navigate('/people')}>
        <ArrowLeft className="size-4" />
        {m.back_to_people}
      </Button>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex size-16 items-center justify-center rounded-2xl text-xl font-semibold text-white"
            style={{ background: person.color ?? '#8D867C' }}
          >
            {person.initials}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{person.name}</h1>
            <p className="text-sm text-ink-2">
              {[person.role, person.company].filter(Boolean).join(' · ') ||
                person.currentCity ||
                '—'}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {strength && <Badge variant="secondary">{strength.label}</Badge>}
              {(person.circles ?? []).map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={() => setEditing(true)}>
          <Pencil className="size-4" />
          {app.common_edit}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Section title={m.profile_contact}>
          <KV k={m.field_email} v={person.email} />
          <KV k={m.field_phone} v={person.phone} />
          <KV
            k={m.field_city}
            v={[person.currentCity, person.country].filter(Boolean).join(', ')}
          />
        </Section>

        <Section title={m.profile_work}>
          <KV k={m.field_company} v={person.company} />
          <KV k={m.field_title} v={person.title} />
          <KV k={m.field_industry} v={person.industry} />
        </Section>

        {person.about && (
          <Section title={m.profile_about}>
            <p className="text-sm">{person.about}</p>
          </Section>
        )}

        {(person.dates ?? []).length > 0 && (
          <Section title={m.profile_dates}>
            {person.dates?.map((d) => (
              <KV key={d.id} k={d.label} v={d.when} />
            ))}
          </Section>
        )}

        <Section title={m.profile_follow_up}>
          {person.followUp ? (
            <KV k={person.followUp.kind} v={`${person.followUp.when} — ${person.followUp.what}`} />
          ) : (
            <p className="text-sm text-ink-3">{m.profile_no_data}</p>
          )}
          <Button variant="ghost" size="sm" onClick={() => setAddType('followUp')}>
            {m.add_follow_up}
          </Button>
        </Section>

        <Section title={m.profile_meetings}>
          {(person.meetings ?? []).length === 0 ? (
            <p className="text-sm text-ink-3">{m.profile_no_data}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {person.meetings?.map((meeting) => (
                <div key={meeting.id} className="text-sm">
                  <div className="font-medium">
                    {meeting.date} · {meeting.title}
                  </div>
                  <div className="text-ink-2">{meeting.summary}</div>
                </div>
              ))}
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setAddType('meeting')}>
            {m.add_meeting}
          </Button>
        </Section>

        <Section title={m.profile_memories}>
          {(person.memories ?? []).length === 0 ? (
            <p className="text-sm text-ink-3">{m.profile_no_data}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {person.memories?.map((memory) => (
                <div key={memory.id} className="text-sm">
                  <span className="text-ink-3">{memory.when}</span> — {memory.text}
                </div>
              ))}
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setAddType('memory')}>
            {m.add_memory}
          </Button>
        </Section>
      </div>

      {editing && (
        <PersonEditDialog
          person={person}
          onClose={() => setEditing(false)}
          onSave={async (id, input) => {
            await updatePerson(id, input)
            toast.success(app.common_save)
          }}
        />
      )}

      {addType && (
        <AddEntryDialog type={addType} onClose={() => setAddType(null)} onSave={onAddEntry} />
      )}
    </div>
  )
}
