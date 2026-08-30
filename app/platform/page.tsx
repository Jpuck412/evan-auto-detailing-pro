'use client';

import { useMemo, useState } from 'react';
import styles from './platform.module.css';

type Job = { id:string; customer:string; vehicle:string; service:string; time:string; tech:string; status:'Ready'|'In Progress'|'Awaiting'|'Complete'; value:number; margin:number };
type LedgerItem = { id:string; vendor:string; category:string; amount:number; date:string; status:'Matched'|'Review' };

const jobs: Job[] = [
  { id:'J-1048', customer:'Marcus Reed', vehicle:'2024 BMW M4', service:'Ceramic + correction', time:'8:00 AM', tech:'Evan', status:'In Progress', value:1295, margin:78 },
  { id:'J-1049', customer:'Dana Cole', vehicle:'2023 Ford F-150', service:'Full detail', time:'10:30 AM', tech:'Maya', status:'Ready', value:389, margin:71 },
  { id:'J-1050', customer:'Luis Grant', vehicle:'2022 Audi Q7', service:'Interior restoration', time:'12:00 PM', tech:'Evan', status:'Awaiting', value:329, margin:65 },
  { id:'J-1051', customer:'Nia Brooks', vehicle:'2025 Tesla Model Y', service:'Maintenance detail', time:'2:30 PM', tech:'Maya', status:'Ready', value:179, margin:76 },
];

const expenses: LedgerItem[] = [
  { id:'E-311', vendor:'Detail Supply Co.', category:'Chemicals', amount:284.19, date:'Today', status:'Matched' },
  { id:'E-312', vendor:'Shell', category:'Fuel', amount:76.42, date:'Today', status:'Matched' },
  { id:'E-313', vendor:'Meta', category:'Advertising', amount:150, date:'Yesterday', status:'Review' },
  { id:'E-314', vendor:'Ceramic Lab', category:'COGS · Coatings', amount:618, date:'Yesterday', status:'Matched' },
];

const money = (n:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);

function Spark({points}:{points:number[]}) {
  const max=Math.max(...points), min=Math.min(...points);
  const coords=points.map((p,i)=>`${(i/(points.length-1))*100},${90-((p-min)/(max-min||1))*70}`).join(' ');
  return <svg className={styles.spark} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={coords}/></svg>;
}

export default function PlatformPage(){
  const [active,setActive]=useState('Command');
  const [period,setPeriod]=useState('Today');
  const [copilot,setCopilot]=useState(false);
  const [selectedJob,setSelectedJob]=useState<Job|null>(null);
  const [toast,setToast]=useState('');
  const revenue=useMemo(()=>jobs.reduce((s,j)=>s+j.value,0),[]);
  const margin=useMemo(()=>Math.round(jobs.reduce((s,j)=>s+j.value*j.margin/100,0)/revenue*100),[revenue]);

  const nav=['Command','Schedule','Customers','Jobs','Money','Inventory','Team','Reports'];
  const notify=(text:string)=>{setToast(text);window.setTimeout(()=>setToast(''),2200)};

  return <main className={styles.app}>
    <div className={styles.ambient}/><div className={styles.grid}/>
    <aside className={styles.sidebar}>
      <div className={styles.logo}><span>F</span><div><b>FINISH<span>OS</span></b><small>DETAILING COMMAND</small></div></div>
      <nav>{nav.map((n,i)=><button key={n} onClick={()=>setActive(n)} className={active===n?styles.active:''}><span className={styles.navIcon}>{['⌂','▦','◎','◇','$','▤','♟','↗'][i]}</span><b>{n}</b>{n==='Money'&&<em>NEW</em>}</button>)}</nav>
      <div className={styles.sideBottom}><button className={styles.upgrade}>PRO SHOP <span>↗</span></button><button>⚙ <b>Settings</b></button><div className={styles.user}><span>EP</span><div><b>Evan Parker</b><small>Owner · Main Shop</small></div><i>•••</i></div></div>
    </aside>

    <section className={styles.workspace}>
      <header className={styles.topbar}><div><p>MAIN SHOP / <b>{active.toUpperCase()}</b></p><h1>{active==='Command'?'Good morning, Evan.':active}</h1></div><div className={styles.topActions}><button className={styles.search}>⌕ <span>Search customers, vehicles, jobs...</span><kbd>⌘ K</kbd></button><button className={styles.iconBtn}>◌<i/></button><button className={styles.newBtn} onClick={()=>notify('New job workflow opened')}>＋ NEW JOB</button></div></header>

      {active!=='Command' ? <section className={styles.modulePage}><div className={styles.moduleHero}><span>{active==='Money'?'$':'◈'}</span><div><p>FINISHOS MODULE</p><h2>{active}</h2><p>{active==='Money'?'Bank feed, invoices, expenses, taxes, reconciliation, P&L and job-level profitability—all connected to the work that created the money.':`The ${active.toLowerCase()} workspace is connected to customers, vehicles, jobs, payments and accounting so data is entered once.`}</p></div></div><div className={styles.moduleGrid}>{['Live operations','Automations','Audit trail','Business intelligence'].map((x,i)=><article key={x}><small>0{i+1}</small><h3>{x}</h3><p>{['Run the shop from one source of truth.','Trigger reminders, follow-ups and bookkeeping rules.','Every meaningful change is attributable and reversible.','Turn job history into pricing, staffing and growth decisions.'][i]}</p><button onClick={()=>notify(`${x} opened`)}>OPEN ↗</button></article>)}</div></section> : <>
      <div className={styles.controlRow}><div className={styles.period}>{['Today','Week','Month'].map(x=><button key={x} className={period===x?styles.on:''} onClick={()=>setPeriod(x)}>{x}</button>)}</div><div className={styles.sync}><i/> LIVE · ALL SYSTEMS SYNCED</div></div>

      <section className={styles.kpis}>
        <article><div><small>BOOKED REVENUE</small><span className={styles.positive}>↗ 18.4%</span></div><h2>{money(revenue)}</h2><p>4 jobs · {period.toLowerCase()}</p><Spark points={[20,26,24,37,35,48,52,67,63,82]}/></article>
        <article><div><small>GROSS PROFIT</small><span className={styles.positive}>↗ 11.2%</span></div><h2>{money(Math.round(revenue*margin/100))}</h2><p>{margin}% blended margin</p><div className={styles.bar}><i style={{width:`${margin}%`}}/></div></article>
        <article><div><small>CASH POSITION</small><span className={styles.neutral}>LIVE</span></div><h2>$18,420</h2><p>$4,870 available after reserves</p><div className={styles.cashDots}><i/><i/><i/><i/><i/></div></article>
        <article><div><small>OPEN RECEIVABLES</small><span className={styles.warn}>2 DUE</span></div><h2>$1,684</h2><p>92% collected on time</p><button onClick={()=>notify('Collections queue opened')}>VIEW COLLECTIONS →</button></article>
      </section>

      <section className={styles.mainGrid}>
        <div className={styles.board}>
          <div className={styles.panelHead}><div><small>TODAY'S PRODUCTION</small><h2>Shop board</h2></div><button onClick={()=>setActive('Schedule')}>FULL SCHEDULE ↗</button></div>
          <div className={styles.timeline}>{jobs.map((j)=><button key={j.id} className={styles.job} onClick={()=>setSelectedJob(j)}><time>{j.time}</time><span className={styles.jobRail}/><div className={styles.jobBody}><div><span className={`${styles.badge} ${styles[j.status.replace(' ','').toLowerCase()]}`}>{j.status}</span><small>{j.id}</small></div><h3>{j.vehicle}</h3><p>{j.customer} · {j.service}</p><footer><span>TECH <b>{j.tech}</b></span><span>VALUE <b>{money(j.value)}</b></span><span>MARGIN <b>{j.margin}%</b></span></footer></div><span className={styles.chev}>›</span></button>)}</div>
        </div>

        <div className={styles.rightStack}>
          <section className={styles.moneyPanel}><div className={styles.panelHead}><div><small>MONEY ENGINE</small><h2>Books are current.</h2></div><span className={styles.health}>98%</span></div><div className={styles.moneyHealth}><div><span>Bank transactions matched</span><b>42 / 44</b></div><div className={styles.bar}><i style={{width:'96%'}}/></div></div><div className={styles.ledger}>{expenses.map(e=><div key={e.id}><span className={styles.vendorIcon}>{e.vendor[0]}</span><div><b>{e.vendor}</b><small>{e.category} · {e.date}</small></div><strong>-{money(e.amount)}</strong><em className={e.status==='Matched'?styles.matched:styles.review}>{e.status}</em></div>)}</div><button className={styles.fullBtn} onClick={()=>setActive('Money')}>OPEN MONEY CENTER →</button></section>

          <section className={styles.insight}><div className={styles.aiOrb}>✦</div><div><small>FINISH INTELLIGENCE</small><h3>You’re underpricing interiors.</h3><p>Your last 14 interior restorations averaged <b>2.3 labor hours</b> longer than estimated. A $35 increase would lift monthly gross profit roughly <b>$840</b> at current volume.</p><div><button onClick={()=>notify('Pricing simulator opened')}>SIMULATE PRICE</button><button onClick={()=>setCopilot(true)}>ASK COPILOT</button></div></div></section>
        </div>
      </section>

      <section className={styles.bottomGrid}><article><small>PIPELINE</small><h3>Leads → booked</h3><div className={styles.funnel}>{[['New leads','18'],['Quoted','12'],['Approved','9'],['Booked','8']].map(([a,b],i)=><div key={a} style={{width:`${100-i*13}%`}}><span>{a}</span><b>{b}</b></div>)}</div><footer><b>44%</b><span>lead-to-booking conversion</span></footer></article><article><small>CUSTOMER ENGINE</small><h3>Revenue that comes back.</h3><div className={styles.ringStat}><div><b>63%</b><span>REPEAT</span></div><p><b>$612</b> avg. lifetime value<br/><b>38</b> maintenance members<br/><b>11</b> follow-ups due</p></div><button onClick={()=>setActive('Customers')}>OPEN CRM →</button></article><article><small>CAPACITY</small><h3>Team utilization</h3><div className={styles.util}><div><span>Evan</span><i><b style={{width:'88%'}}/></i><strong>88%</strong></div><div><span>Maya</span><i><b style={{width:'72%'}}/></i><strong>72%</strong></div></div><p>Thursday has 4.5 open labor hours.</p><button onClick={()=>notify('Smart booking recommendations opened')}>FILL CAPACITY →</button></article></section>
      </>}
    </section>

    <button className={styles.copilotFab} onClick={()=>setCopilot(!copilot)}>✦ <span>FINISH AI</span></button>
    {copilot&&<aside className={styles.copilot}><header><div><span>✦</span><div><b>Finish AI</b><small>BUSINESS COPILOT</small></div></div><button onClick={()=>setCopilot(false)}>×</button></header><div className={styles.aiChat}><p className={styles.bot}>I can answer questions across jobs, customers, payments and books. Try: <b>“Which services made the most profit this month?”</b></p><div className={styles.quick}>{['Find unpaid invoices','Price ceramic jobs','Show tax estimate','Who needs follow-up?'].map(x=><button key={x} onClick={()=>notify(`${x} analysis queued`)}>{x}</button>)}</div></div><form onSubmit={e=>{e.preventDefault();notify('Finish AI query submitted')}}><input placeholder="Ask about your business..."/><button>↑</button></form></aside>}

    {selectedJob&&<div className={styles.modalBackdrop} onClick={()=>setSelectedJob(null)}><section className={styles.jobModal} onClick={e=>e.stopPropagation()}><header><div><small>{selectedJob.id}</small><h2>{selectedJob.vehicle}</h2><p>{selectedJob.customer}</p></div><button onClick={()=>setSelectedJob(null)}>×</button></header><div className={styles.jobFacts}><div><small>SERVICE</small><b>{selectedJob.service}</b></div><div><small>TECH</small><b>{selectedJob.tech}</b></div><div><small>JOB VALUE</small><b>{money(selectedJob.value)}</b></div><div><small>EST. MARGIN</small><b>{selectedJob.margin}%</b></div></div><div className={styles.jobFlow}>{['Estimate','Authorized','Production','QC','Paid','Posted'].map((x,i)=><div className={i<3?styles.doneStep:''} key={x}><i>{i<3?'✓':i+1}</i><span>{x}</span></div>)}</div><div className={styles.modalActions}><button onClick={()=>notify('Digital inspection opened')}>INSPECTION</button><button onClick={()=>notify('Invoice opened')}>INVOICE</button><button className={styles.primaryAction} onClick={()=>notify('Job moved to next stage')}>ADVANCE JOB →</button></div></section></div>}
    {toast&&<div className={styles.toast}>{toast}</div>}
  </main>
}
