"use client";

// ─── InfrastructureAtlas ────────────────────────────────────────────────────────
// A unified interactive console that lets users switch between all 7 national
// infrastructure maps. Includes custom labels and datasets for each map.

import { useState } from "react";
import { AirportMap } from "@/components/infrastructure/AirportMap";
import { PortMap } from "@/components/infrastructure/PortMap";
import { DamsBridgesMap } from "@/components/infrastructure/DamsBridgesMap";
import { NetworkMap } from "@/components/infrastructure/NetworkMap";

// Import simplified geometries
import powerData from "@/lib/data/powergrid-simplified.json";
import railData from "@/lib/data/rail-simplified.json";
import waterwaysData from "@/lib/data/waterways-simplified.json";

import {
  HIGHWAY_ERAS,
  HIGHWAY_ROUTES,
  HIGHWAY_NODES,
  RAIL_ROUTES,
  RAIL_NODES,
} from "@/lib/data/infrastructure-network-data";

type MapTab = "aviation" | "ports" | "dams" | "power" | "rail" | "water" | "highway";

interface AtlasLabels {
  aviation: { title: string; desc: string };
  ports: { title: string; desc: string };
  dams: { title: string; desc: string };
  power: { title: string; desc: string };
  rail: { title: string; desc: string };
  water: { title: string; desc: string };
  highway: { title: string; desc: string };
  
  aviationLabels: any;
  portLabels: any;
  damsLabels: any;
  mapLabels: any;
}

export function InfrastructureAtlas({ locale, labels }: { locale: "en" | "ro"; labels: AtlasLabels }) {
  const [activeTab, setActiveTab] = useState<MapTab>("aviation");

  const tabs: { id: MapTab; name: string }[] = [
    { id: "aviation", name: locale === "ro" ? "Aviație" : "Aviation" },
    { id: "ports", name: locale === "ro" ? "Porturi" : "Ports" },
    { id: "dams", name: locale === "ro" ? "Baraje & Poduri" : "Dams & Bridges" },
    { id: "power", name: locale === "ro" ? "Rețea Electrică" : "Power Grid" },
    { id: "rail", name: locale === "ro" ? "Căi Ferate" : "Railways" },
    { id: "water", name: locale === "ro" ? "Apeducte" : "Aqueducts" },
    { id: "highway", name: locale === "ro" ? "Autostrăzi" : "Highways" },
  ];

  return (
    <div className="w-full border-y border-white/5 bg-white/[0.02] py-8 px-0">
      {/* Tabs list */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-white/5 pb-6 px-6 md:px-12">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-full border px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider transition-all"
              style={{
                borderColor: active ? "#E8B923" : "rgba(255,255,255,0.08)",
                background: active ? "rgba(232,185,35,0.1)" : "transparent",
                color: active ? "#E8B923" : "rgba(255,255,255,0.6)",
              }}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Map descriptions */}
      <div className="mb-8 px-6 md:px-12">
        <h3 className="font-macro-display text-xl font-bold tracking-tight text-white mb-2">
          {labels[activeTab].title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-white/60 max-w-4xl">
          {labels[activeTab].desc}
        </p>
      </div>

      {/* Render selected map */}
      <div className="relative w-full">
        {activeTab === "aviation" && (
          <AirportMap locale={locale} labels={labels.aviationLabels} />
        )}
        
        {activeTab === "ports" && (
          <PortMap locale={locale} labels={labels.portLabels} />
        )}
        
        {activeTab === "dams" && (
          <DamsBridgesMap locale={locale} labels={labels.damsLabels} />
        )}
        
        {activeTab === "power" && (
          <NetworkMap
            locale={locale}
            eras={[{ id: "grid", label: { en: "Power Grid", ro: "Rețea Electrică" }, sublabel: { en: "Today", ro: "Prezent" } }]}
            routes={[]}
            nodes={[]}
            accent="#E8B923"
            backgroundNetwork
            variant="power"
            backgroundGeoms={powerData as any}
            hideEraToggle
            initialEra="grid"
            labels={labels.mapLabels}
          />
        )}
        
        {activeTab === "rail" && (
          <NetworkMap
            locale={locale}
            eras={[{ id: "modern", label: { en: "Rail Network", ro: "Căi Ferate" }, sublabel: { en: "Today", ro: "Prezent" } }]}
            routes={RAIL_ROUTES.filter((r) => r.era === "modern" && !["bnsf-transcon", "up-overland", "bnsf-northern", "up-sunset"].includes(r.id))}
            nodes={RAIL_NODES}
            accent="#E8B923"
            backgroundNetwork
            variant="rail"
            backgroundGeoms={railData as any}
            hideEraToggle
            initialEra="modern"
            labels={labels.mapLabels}
          />
        )}
        
        {activeTab === "water" && (
          <NetworkMap
            locale={locale}
            eras={[{ id: "waterway", label: { en: "Waterways", ro: "Apeducte" }, sublabel: { en: "Today", ro: "Prezent" } }]}
            routes={[]}
            nodes={[]}
            accent="#E8B923"
            backgroundNetwork
            variant="water"
            backgroundGeoms={waterwaysData as any}
            hideEraToggle
            initialEra="waterway"
            labels={labels.mapLabels}
          />
        )}
        
        {activeTab === "highway" && (
          <NetworkMap
            locale={locale}
            eras={HIGHWAY_ERAS}
            routes={HIGHWAY_ROUTES}
            nodes={HIGHWAY_NODES}
            accent="#E8B923"
            backgroundNetwork
            variant="interstate"
            labels={labels.mapLabels}
          />
        )}
      </div>
    </div>
  );
}
