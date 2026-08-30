'use client';

import { useMemo, useState } from 'react';
import styles from './money.module.css';

const transactions=[
  {date:'Aug 30',merchant:'Stripe payout',memo:'12 customer payments',amount:3826.44,type:'in',account:'Operating',status:'Matched'},
  {date:'Aug 30',merchant:'Detail Supply Co.',memo:'Chemicals & towels',amount:-284.19,type:'out',account:'COGS · Supplies',status:'Matched'},
  {date:'Aug 30',merchant:'Shell',memo:'Mobile unit fuel',amount:-76.42,type:'out',account:'Vehicle · Fuel',status:'Matched'},
  {date:'Aug 29',merchant:'Meta Platforms',memo:'August campaign',amount:-150,type:'out',account:'Advertising',status:'Review'},
  {date:'Aug 29',merchant:'Ceramic Lab',memo:'Coating inventory',amount:-618,type:'out',account:'COGS · Coatings',status:'Matched'},
  {date:'Aug 29',merchant:'ACH Deposit',memo:'Fleet customer #1041',amount:1240,type:'in',account:'Operating',status:'Matched'},
];
const invoices=[
  {n:'INV-1048',customer:'Marcus Reed',job:'BMW M4 · Ceramic + Correction',total:1295,balance:1295,due:'Today',status:'Due'},
  {n:'INV-1044',customer:'Wexler Realty',job:'Fleet · 4 Vehicles',total:1240,balance:0,due:'Paid Aug 29',status:'Paid'},
  {n:'INV-1039',customer:'Avery James',job:'Porsche 911 · Correction',total:875,balance:389,due:'2 days',status:'Partial'},
];
const accounts=[['1000','Operating Checking','Asset','$18,420'],['1100','Accounts Receivable','Asset','$1,684'],['2000','Sales Tax Payable','Liability','$892'],['4000','Detailing Revenue','Revenue','$31,884'],['5000','Materials / COGS','COGS','$4,742'],['6100','Advertising','Expense','$1,140']];
const money=(n:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);

export default function MoneyCenter(){
 const [tab,setTab]=useState('Overview'); const [toast,setToast]=useState('');
 const income=useMemo(()=>transactions.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0),[]);
 const spend=useMemo(()=>-transactions.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0),[]);
 const notify=(s:string)=>{setToast(s);setTimeout(()=>setToast(''),1800)};
 return <main className={styles.app}>
  <aside className={styles.side}><a href="/platform" className={styles.logo}>F</a><nav><a href="/platform">⌂<span>Command</span></a><a className={styles.active}>$<span>Money</span></a><a>▦<span>Invoices</span></a><a>⇄<span>Banking</span></a><a>▤<span>Expenses</span></a><a>◫<span>Reports</span></a><a>⚙<span>Settings</span></a></nav></aside>
  <section className={styles.work}><header><div><a href="/platform">← FINISHOS</a><h1>Money Center</h1><p>Your jobs and your books, finally in the same system.</p></div><div><button onClick={()=>notify('Bank connection wizard opened')}>＋ CONNECT BANK</button><button className={styles.primary} onClick={()=>notify('New transaction opened')}>＋ NEW</button></div></header>
  <div className={styles.tabs}>{['Overview','Transactions','Invoices','Expenses','Chart of Accounts','Reports','Taxes'].map(x=><button key={x} onClick={()=>setTab(x)} className={tab===x?styles.on:''}>{x}</button>)}</div>
  {tab==='Overview'&&<>
   <section className={styles.metrics}><article><small>CASH</small><h2>$18,420.16</h2><span>Operating checking</span><i className={styles.good}>+ $4,136 this week</i></article><article><small>RECEIVABLES</small><h2>$1,684.00</h2><span>3 open invoices</span><i>92% on-time collection</i></article><article><small>TAX RESERVE</small><h2>$892.40</h2><span>Estimated sales tax</span><i className={styles.warn}>Keep reserved</i></article><article><small>MONTH PROFIT</small><h2>$14,382</h2><span>45.1% net margin</span><i className={styles.good}>+12.8% vs last month</i></article></section>
   <section className={styles.grid}><article className={styles.pnl}><div className={styles.head}><div><small>PROFIT & LOSS</small><h3>August 2026</h3></div><button onClick={()=>notify('P&L report opened')}>VIEW REPORT ↗</button></div><div className={styles.pnlRows}><div><span>Detailing revenue</span><b>$31,884</b></div><div><span>Product / add-on revenue</span><b>$2,410</b></div><div className={styles.total}><span>Gross revenue</span><b>$34,294</b></div><div><span>Materials / COGS</span><b>−$4,742</b></div><div><span>Direct labor</span><b>−$7,086</b></div><div className={styles.total}><span>Gross profit</span><b>$22,466</b></div><div><span>Operating expenses</span><b>−$8,084</b></div><div className={styles.net}><span>NET PROFIT</span><b>$14,382</b></div></div><footer><span>NET MARGIN</span><strong>45.1%</strong><i><b style={{width:'45%'}}/></i></footer></article>
   <article className={styles.bank}><div className={styles.head}><div><small>BANK FEED</small><h3>6 new transactions</h3></div><span className={styles.live}>● LIVE</span></div>{transactions.slice(0,5).map((t,i)=><div className={styles.tx} key={i}><span className={t.amount>0?styles.in:styles.out}>{t.amount>0?'↓':'↑'}</span><div><b>{t.merchant}</b><small>{t.memo}</small></div><strong className={t.amount>0?styles.green:''}>{t.amount>0?'+':''}{money(t.amount)}</strong><em className={t.status==='Matched'?styles.matched:styles.review}>{t.status}</em></div>)}<button className={styles.full} onClick={()=>setTab('Transactions')}>REVIEW ALL TRANSACTIONS →</button></article>
   <article className={styles.profit}><div className={styles.head}><div><small>PROFIT BY SERVICE</small><h3>What actually makes money</h3></div></div>{[['Ceramic coating',78,12440],['Paint correction',71,7380],['Full detail',64,8142],['Interior restoration',52,4011],['Maintenance',73,2321]].map(([n,m,r])=><div className={styles.service} key={String(n)}><div><b>{n}</b><span>{money(Number(r))} revenue</span></div><i><b style={{width:`${m}%`}}/></i><strong>{m}%</strong></div>)}</article>
   <article className={styles.tax}><small>TAX COMMAND</small><div className={styles.taxRing}><div><b>$892</b><span>RESERVED</span></div></div><h3>Sales tax is covered.</h3><p>FinishOS tracks taxable sales as invoices post and separates the liability from spendable cash.</p><button onClick={()=>setTab('Taxes')}>OPEN TAX CENTER →</button></article>
  </>}
  {tab==='Transactions'&&<section className={styles.tablePanel}><div className={styles.tableHead}><div><small>BANK + CARD FEEDS</small><h2>Transactions</h2></div><button onClick={()=>notify('Reconciliation started')}>RECONCILE ACCOUNT</button></div><table><thead><tr><th>Date</th><th>Merchant</th><th>Account</th><th>Status</th><th>Amount</th></tr></thead><tbody>{transactions.map((t,i)=><tr key={i}><td>{t.date}</td><td><b>{t.merchant}</b><small>{t.memo}</small></td><td>{t.account}</td><td><em className={t.status==='Matched'?styles.matched:styles.review}>{t.status}</em></td><td className={t.amount>0?styles.green:''}>{money(t.amount)}</td></tr>)}</tbody></table></section>}
  {tab==='Invoices'&&<section className={styles.tablePanel}><div className={styles.tableHead}><div><small>ACCOUNTS RECEIVABLE</small><h2>Invoices</h2></div><button onClick={()=>notify('Invoice composer opened')}>＋ NEW INVOICE</button></div><table><thead><tr><th>Invoice</th><th>Customer / Job</th><th>Due</th><th>Status</th><th>Total</th><th>Balance</th></tr></thead><tbody>{invoices.map(x=><tr key={x.n}><td><b>{x.n}</b></td><td><b>{x.customer}</b><small>{x.job}</small></td><td>{x.due}</td><td><em className={x.status==='Paid'?styles.matched:x.status==='Due'?styles.review:styles.partial}>{x.status}</em></td><td>{money(x.total)}</td><td>{money(x.balance)}</td></tr>)}</tbody></table></section>}
  {tab==='Chart of Accounts'&&<section className={styles.tablePanel}><div className={styles.tableHead}><div><small>GENERAL LEDGER</small><h2>Chart of Accounts</h2></div><button onClick={()=>notify('Account editor opened')}>＋ ADD ACCOUNT</button></div><table><thead><tr><th>Code</th><th>Account</th><th>Type</th><th>Balance</th></tr></thead><tbody>{accounts.map(a=><tr key={a[0]}><td>{a[0]}</td><td><b>{a[1]}</b></td><td>{a[2]}</td><td>{a[3]}</td></tr>)}</tbody></table></section>}
  {!['Overview','Transactions','Invoices','Chart of Accounts'].includes(tab)&&<section className={styles.focus}><span>$</span><small>FINISHOS MONEY</small><h2>{tab}</h2><p>This workspace is wired into the same ledger, jobs, customers and bank-feed architecture. No duplicate entry between operations and accounting.</p><button onClick={()=>notify(`${tab} workflow opened`)}>START WORKFLOW →</button></section>}
  </section>{toast&&<div className={styles.toast}>{toast}</div>}
 </main>
}