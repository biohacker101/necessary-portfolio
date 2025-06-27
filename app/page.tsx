import { DashboardLayout } from "@/components/dashboard-layout"
import { MainFeed } from "@/components/main-feed"
import { TodaysHighlights } from "@/components/todays-highlights"
import { AnalyticsWidget } from "@/components/analytics-widget"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-8 p-8 bg-black">
        <TodaysHighlights />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <MainFeed />
          </div>
          <div className="lg:col-span-1">
            <AnalyticsWidget />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
