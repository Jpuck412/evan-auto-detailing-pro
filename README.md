# Evan's Auto Detailing + FinishOS

A premium automotive detailing website plus **FinishOS**, a detailing-business operating system designed to unify the operational workflow of detailing software with the financial control normally split into accounting software.

## Customer website
- Cinematic 3D automotive hero
- Premium services and conversion-focused quote funnel
- Responsive mobile/foldable experience
- SEO/Open Graph foundation
- Production-ready Next.js + TypeScript

## FinishOS command center
Route: `/platform`

### Operations
- Executive command dashboard
- Lead and booking pipeline
- Calendar/scheduling workspace
- Customer CRM + vehicle history
- Estimate → authorization → work order workflow
- Digital inspections
- Technician assignments and time tracking
- Quality-control stages
- Membership/maintenance tracking
- Inventory and material usage

### Money engine
- Invoices and receivables
- Payments/tips/refunds model
- Expense and receipt model
- Chart of accounts
- Double-entry journal entries
- Cash/accrual-ready accounting basis
- Processor fees
- Job-level labor + material costing
- Gross-profit and margin reporting
- Bank-feed/reconciliation-ready architecture
- Audit log

### Intelligence layer
- Service profitability
- Pricing recommendations
- Capacity/utilization insights
- Customer repeat/rebooking analysis
- Follow-up queues
- Owner-level business copilot surface

## Data architecture
- `supabase/migrations/001_finish_os.sql` contains the multi-tenant Postgres schema and RLS foundation.
- `lib/finishing-os/types.ts` contains the domain contracts.
- `lib/finishing-os/accounting.ts` contains balanced double-entry posting primitives.

A dedicated Supabase production project still needs to be provisioned before persistent live business data is enabled. Do **not** reuse a scanner/trading database for shop accounting data.

## Development
```bash
npm install
npm run dev
```

Open:
- Website: `http://localhost:3000/`
- FinishOS: `http://localhost:3000/platform`

## Production build
```bash
npm run build
npm start
```

## Before public business launch
Replace the temporary website contact placeholders with Evan's actual business information and verified reviews. For FinishOS production use, provision its dedicated database, payment processor, bank-feed provider, transactional email/SMS provider, authentication, backups, and tax configuration before relying on it as the legal system of record for bookkeeping.
