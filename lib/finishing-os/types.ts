export type UUID = string;

export type Money = number;

export type JobStage =
  | 'lead'
  | 'quoted'
  | 'authorized'
  | 'scheduled'
  | 'checked_in'
  | 'in_progress'
  | 'quality_control'
  | 'ready_for_pickup'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded' | 'void';
export type AccountingBasis = 'cash' | 'accrual';

export interface Shop {
  id: UUID;
  name: string;
  timezone: string;
  currency: 'USD';
  accountingBasis: AccountingBasis;
  taxRateBps: number;
}

export interface Customer {
  id: UUID;
  shopId: UUID;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  tags: string[];
  lifetimeValue: Money;
  lastServiceAt?: string;
  createdAt: string;
}

export interface Vehicle {
  id: UUID;
  shopId: UUID;
  customerId: UUID;
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  color?: string;
  vin?: string;
  plate?: string;
  notes?: string;
}

export interface ServicePackage {
  id: UUID;
  shopId: UUID;
  name: string;
  description?: string;
  retailPrice: Money;
  estimatedLaborMinutes: number;
  estimatedMaterialsCost: Money;
  taxable: boolean;
  active: boolean;
}

export interface Job {
  id: UUID;
  shopId: UUID;
  customerId: UUID;
  vehicleId: UUID;
  stage: JobStage;
  scheduledStart?: string;
  scheduledEnd?: string;
  assignedUserIds: UUID[];
  subtotal: Money;
  discountTotal: Money;
  taxTotal: Money;
  total: Money;
  collected: Money;
  paymentStatus: PaymentStatus;
  estimatedLaborMinutes: number;
  actualLaborMinutes: number;
  materialCost: Money;
  laborCost: Money;
  grossProfit: Money;
  grossMarginPct: number;
  createdAt: string;
}

export interface InspectionItem {
  id: UUID;
  jobId: UUID;
  area: string;
  condition: 'good' | 'attention' | 'damaged';
  notes?: string;
  photoUrls: string[];
  customerAcknowledged: boolean;
}

export interface EstimateLine {
  id: UUID;
  estimateId: UUID;
  servicePackageId?: UUID;
  description: string;
  quantity: number;
  unitPrice: Money;
  unitCost?: Money;
  taxable: boolean;
}

export interface Invoice {
  id: UUID;
  shopId: UUID;
  jobId?: UUID;
  customerId: UUID;
  invoiceNumber: string;
  dueAt?: string;
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  balance: Money;
  status: PaymentStatus;
}

export interface Payment {
  id: UUID;
  shopId: UUID;
  invoiceId?: UUID;
  jobId?: UUID;
  amount: Money;
  tipAmount: Money;
  method: 'cash' | 'card' | 'ach' | 'check' | 'other';
  processor?: string;
  processorReference?: string;
  processedAt: string;
}

export interface Expense {
  id: UUID;
  shopId: UUID;
  vendor?: string;
  categoryAccountId: UUID;
  amount: Money;
  incurredAt: string;
  memo?: string;
  receiptUrl?: string;
  jobId?: UUID;
  inventoryItemId?: UUID;
}

export interface Account {
  id: UUID;
  shopId: UUID;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'cogs';
  active: boolean;
}

export interface JournalEntryLine {
  accountId: UUID;
  debit: Money;
  credit: Money;
  memo?: string;
}

export interface JournalEntry {
  id: UUID;
  shopId: UUID;
  occurredAt: string;
  sourceType: 'invoice' | 'payment' | 'expense' | 'adjustment' | 'deposit' | 'refund';
  sourceId?: UUID;
  memo?: string;
  lines: JournalEntryLine[];
  posted: boolean;
}

export interface InventoryItem {
  id: UUID;
  shopId: UUID;
  sku?: string;
  name: string;
  unit: string;
  quantityOnHand: number;
  reorderPoint: number;
  averageUnitCost: Money;
  retailUnitPrice?: Money;
}

export interface TimeEntry {
  id: UUID;
  shopId: UUID;
  userId: UUID;
  jobId?: UUID;
  startedAt: string;
  endedAt?: string;
  hourlyCost: Money;
}

export interface Membership {
  id: UUID;
  shopId: UUID;
  customerId: UUID;
  name: string;
  amount: Money;
  interval: 'month' | 'quarter' | 'year';
  nextBillingAt: string;
  active: boolean;
}
