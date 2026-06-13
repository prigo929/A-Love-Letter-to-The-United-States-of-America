"use client";

export function HistoryStyles() {
  return (
    <style jsx global>{`
      /* ── Cinematic Editorial Theme ──────────────────────────────── */
      .history-classified-bg {
        background-color: #000000 !important;
        color: #E8E2D5 !important;
      }

      /* Clean Typography mappings to avoid breaking existing usages, but resolving to premium fonts */
      .font-typewriter {
        font-family: var(--font-body), 'Inter', system-ui, sans-serif;
      }
      .font-tech {
        font-family: var(--font-mono), monospace;
        letter-spacing: 0.05em;
      }

      /* Monospace bureaucratic label/metadata */
      .history-bureaucratic {
        font-family: var(--font-mono), monospace;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        font-size: 11px;
        color: #E8B923; /* Gold accent */
        opacity: 0.8;
      }

      /* Editorial document headers */
      .history-dossier-header {
        font-family: var(--font-display), Georgia, serif;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 12px;
        margin-bottom: 24px;
      }

      /* Dossier grid borders */
      .history-grid-border {
        border: 1px solid rgba(255, 255, 255, 0.06);
        background-color: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(8px);
      }

      /* Clean tab selector styling */
      .history-folder-tab {
        border-left: 2px solid rgba(232, 185, 35, 0.1);
        padding-left: 12px;
        transition: all 0.25s ease-out;
      }
      .history-folder-tab-active {
        border-left: 2px solid #E8B923;
        padding-left: 16px;
        background-color: rgba(255, 255, 255, 0.03);
      }

      /* Editorial serif elements for human voice */
      .history-serif-title {
        font-family: var(--font-display), Georgia, serif;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .history-serif-body {
        font-family: var(--font-display), Georgia, serif;
        font-size: 17px;
        line-height: 1.85;
        color: rgba(232, 226, 213, 0.85); /* Premium soft cream */
      }
    `}</style>
  );
}

