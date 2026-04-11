'use client'

// ─── GDP Bar Chart ────────────────────────────────────────────────────────────
// Recharts bar chart comparing GDP across major economies.
// Highlights the US bar in glory-gold. Client component (Recharts requirement).

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import type { GdpDataPoint } from '@/lib/data/economy-data'

interface GdpBarChartProps {
  data: GdpDataPoint[]
  title?: string
  subtitle?: string
  source?: string
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; payload: GdpDataPoint }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const item = payload[0]

  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">
        {item.payload.flag} {label}
      </p>
      <p className="font-hero text-2xl text-glory-gold">
        ${item.value.toFixed(1)}T
      </p>
      <p className="font-body text-xs text-white/50">GDP (2024, USD Trillions)</p>
    </div>
  )
}

// ── Custom Bar Label ───────────────────────────────────────────────────────────

function CustomLabel(props: {
  x?: number
  y?: number
  width?: number
  value?: number
  index?: number
}) {
  const { x = 0, y = 0, width = 0, value = 0 } = props
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="#FFD700"
      textAnchor="middle"
      fontSize={11}
      fontFamily="var(--font-hero)"
      letterSpacing="0.05em"
    >
      ${value.toFixed(1)}T
    </text>
  )
}

export function GdpBarChart({ data, title, subtitle, source }: GdpBarChartProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="w-full"
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>
          )}
        </div>
      )}

      <div className="h-[320px] w-full md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 20, left: 10, bottom: 60 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.07)"
              vertical={false}
            />
            <XAxis
              dataKey="country"
              tick={{
                fill: 'rgba(255,255,255,0.55)',
                fontSize: 11,
                fontFamily: 'var(--font-body)',
              }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{
                fill: 'rgba(255,255,255,0.4)',
                fontSize: 11,
                fontFamily: 'var(--font-body)',
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}T`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            />
            <Bar dataKey="gdp" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.highlight ? '#FFD700' : '#3C3B6E'}
                  opacity={entry.highlight ? 1 : 0.75}
                />
              ))}
              <LabelList content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">
          Source: {source}
        </p>
      )}
    </motion.div>
  )
}
