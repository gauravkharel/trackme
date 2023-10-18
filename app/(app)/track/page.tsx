import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Activity } from "@prisma/client"
import { revalidatePath } from "next/cache"
import ActivityDuration from "./duration"
import { Pause, Play, Square } from "lucide-react"
import { cn } from "@/lib/utils"

type TimeProps = {
  startAt: string
}

type NewActivityProps = {
  activity?: Activity | null
}


const Time = ({ startAt }: TimeProps) => {
  const date = new Date(startAt)
  const now = new Date()
  const elapsed = now.getTime() - date.getTime()
  return <div>{elapsed}</div>
}

const NewActivity = ({ activity }: NewActivityProps) => {
  async function startActivity(data: FormData) {
    'use server'
    const user = await getUserSession()
    await prisma.activity.create({
      data: {
        user: { connect: { id: user.id } },
        tenant: { connect: { id: user.tenant.id } },
        name: data.get('name') as string,
        startAt: new Date()
      }
    })
    revalidatePath('/track')
  }

  async function stopActivity(data: FormData) {
    'use server'
    await prisma.activity.update({
      where: {
        id: data.get('id') as string
      },
      data: {
        endAt: new Date()
      }
    })
    revalidatePath('/track')
  }

  return (
    <div>
      <h2 className="font-semibold mb-2">What are you working on?</h2>
      <form
        action={activity ? stopActivity : startActivity}
        className="flex items-center space-x-4"
      >
        <div>
          <Input type="text" name="name" defaultValue={activity?.name || ''} />
          <input type="hidden" name="id" defaultValue={activity?.id || ''} />
          {activity && <ActivityDuration startAt={activity.startAt} />}
          <Button type="submit"
            variant="outline"
            className={cn('rounded-full px-2 h-[40px] w-[40px]')} >{activity ? <Square size={20} /> : <Play size={20} />}</Button>
        </div>
      </form>
    </div>
  )
}

const DailyActivities = () => { }


export default async function page() {
  const user = await getUserSession()
  const currentActivity = await prisma.activity.findFirst({
    where: {
      tenantId: user.tenant.id,
      userId: user.id,
      endAt: null
    }
  })
  return (
    <main className="mx-auto container py-4">
      <NewActivity activity={currentActivity} />
    </main>
  )
}


// resources
// https://next-auth.js.org/configuration/callbacks#jwt-callback