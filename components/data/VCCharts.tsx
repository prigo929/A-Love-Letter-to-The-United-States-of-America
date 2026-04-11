'use client'

// ─── VC Investment & Unicorn Charts ─────────────────────────────────────────
// Two charts: VC investment by country (bar) + unicorn distribution (pie).
// Client component (Recharts).

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import type { VCDataPoint, UnicornDataPoint } from '@/lib/data/economy-data'

// ─── VC Bar Chart ─────────────────────────────────────────────────────────────

interface VCBarChartProps {
  data: VCDataPoint[]
  title?: string
  source?: string
}

function VCTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; payload: VCDataPoint }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">{label}</p>
      <p className="font-hero text-2xl text-glory-gold">${item.value}B</p>
      <p className="font-body text-xs text-white/50">{item.payload.percentage}% of global VC</p>
    </div>
  )
}

export function VCBarChart({ data, title, source }: VCBarChartProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="w-full"
    >
      {title && (
        <h3 className="mb-6 font-display text-xl font-semibold text-white md:text-2xl">
          {title}
        </h3>
      )}

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
            barCategoryGap="35%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
            <XAxis
              dataKey="country"
              tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 10, fontFamily: 'var(--font-body)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'var(--font-body)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}B`}
            />
            <Tooltip content={<VCTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="investment" radius={[5, 5, 0, 0]} maxBarSize={55}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.highlight ? '#FFD700' : '#3C3B6E'}
                  opacity={entry.highlight ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">Source: {source}</p>
      )}
    </motion.div>
  )
}

// ─── Unicorn Pie Chart ────────────────────────────────────────────────────────

interface UnicornPieChartProps {
  data: UnicornDataPoint[]
  title?: string
  source?: string
}

const PIE_COLORS = ['#FFD700', '#B22234', '#3C3B6E', '#5554A0', '#8B1A26', '#252b4a', '#374151']

function UnicornLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
  if (!payload) return null
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-4">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-body text-xs text-white/60">{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}

export function UnicornPieChart({ data, title, source }: UnicornPieChartProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="w-full"
    >
      {title && (
        <h3 className="mb-6 font-display text-xl font-semibold text-white md:text-2xl">
          {title}
        </h3>
      )}

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="unicorns"
              nameKey="country"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              label={({ name, percentage }) =>
                percentage > 4 ? `${percentage}%` : ''
              }
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Legend content={<UnicornLegend />} />
            <Tooltip
              formatter={(value: number, name: string) => [`${value} unicorns`, name]}
              contentStyle={{
                backgroundColor: '#0d1117',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                color: '#fff',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">Source: {source}</p>
      )}
    </motion.div>
  )
}
