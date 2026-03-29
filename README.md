# Cubelelo — Support Insights Tool

Internal weekly support ticket intelligence dashboard powered by Claude AI.

## Project Structure

```
src/
├── index.js                        # React entry point
├── index.css                       # CSS variables + global styles
├── App.jsx                         # Root component
├── App.module.css
│
├── constants/
│   └── sampleData.js               # SAMPLE_CSV, CATEGORY_COLORS
│
├── utils/
│   ├── csvParser.js                # parseCSV(), computeLocalStats()
│   └── exportUtils.js              # downloadTextFile(), buildReportText(), copyToClipboard()
│
├── services/
│   └── anthropicService.js         # analyzeTicketsWithAI() — all Anthropic API calls
│
├── hooks/
│   ├── useTicketAnalysis.js        # Core state: loading, results, error, analyze()
│   └── useToast.js                 # Toast notification state
│
└── components/
    ├── ui/                         # Dumb reusable primitives
    │   ├── Toast.jsx
    │   ├── LoadingOverlay.jsx
    │   ├── SectionLabel.jsx
    │   └── Card.jsx
    │
    ├── layout/                     # Page-level structural components
    │   ├── AppHeader.jsx
    │   └── AppFooter.jsx
    │
    └── dashboard/                  # Feature-specific components
        ├── HeroSection.jsx
        ├── InputSection.jsx
        ├── AnalyzeButton.jsx
        ├── StatsRow.jsx
        ├── ManagerBanner.jsx
        ├── RiskMeter.jsx
        ├── IssueCategoriesChart.jsx
        ├── PatternsPanel.jsx
        ├── UnresolvedTicketsTable.jsx
        ├── EscalationRadar.jsx
        ├── FullAnalysisPanel.jsx
        ├── ExportActions.jsx
        └── ResultsDashboard.jsx    # Composes all dashboard components
```

## Getting Started

```bash
npm install
npm start
```

The app runs on http://localhost:3000

## CSV Format

```
ticket_id,date,customer,issue_category,product,status,priority,days_open,description
TK001,2025-07-01,Rahul Sharma,Delivery Delay,GAN 12 Maglev,Open,High,8,Description here
```

## Key Architecture Decisions

| Concern | Solution |
|---|---|
| API calls | Isolated in `services/anthropicService.js` |
| Business logic | In `hooks/useTicketAnalysis.js` |
| Pure utilities | `utils/` — zero React dependencies, fully testable |
| Styling | CSS Modules per component — no collisions |
| Fallback | Local stats computed if AI API is unavailable |
