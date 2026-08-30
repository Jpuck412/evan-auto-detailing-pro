'use client';

import { useState } from 'react';
import styles from './schedule.module.css';

const techs=['Evan','Maya','Chris'];
const days=['Mon 31','Tue 01','Wed 02','Thu 03','Fri 04','Sat 05'];
const jobs=[
 {day:0,start:8,duration:3,tech:'Evan',customer:'Marcus Reed',vehicle:'BMW M4',service:'Ceramic + Correction',value:1295,color:'green'},
 {day:0,start:10.5,duration:2.5,tech:'Maya',customer:'Dana Cole',vehicle:'Ford F-150',service:'Full Detail',value:389,color:'blue'},
 {day:1,start:9,duration:2,tech:'Evan',customer:'Luis Grant',vehicle:'Audi Q7',service:'Interior Restoration',value:329,color:'amber'},
 {day:1,start:12,duration:1.5,tech:'Maya',customer:'Nia Brooks',vehicle:'Tesla Model Y',service:'Maintenance',value:179,color:'green'},
 {day:2,start:8.5,duration:4,tech:'Evan',customer:'Avery James',vehicle:'Porsche 911',service:'Paint Correction',value:875,color:'purple'},
 {day:3,start:10,duration:3.5,tech:'Chris',customer:'Wexler Realty',vehicle:'Fleet · 4 units',service:'Fleet Detail',value:1240,color:'blue'},
 {day:4,start:9,duration:2.5,tech:'Maya',customer:'Tara Stone',vehicle:'Mercedes GLE',service:'Full Detail',value:449,color:'green'},
];

export default function Schedule(){
 const [tech,setTech]=useState('All techs'); const [toast,setToast]=useState('');
 const notify=(s:string)=>{setToast(s);setTimeout(()=>setToast(''),1600)};
 const visible=jobs.filter(j=>tech==='All techs'||j.tech===tech);
 return <main className={styles.app}>
  <header><div><a href="/platform">← FINISHOS</a><h1>Production Schedule</h1><p>Capacity, labor, vehicles and revenue on one board.</p></div><div><select value={tech} onChange={e=>setTech(e.target.value)}><option>All techs</option>{techs.map(t=><option key={t}>{t}</option>)}</select><button onClick={()=>notify('Smart availability opened')}>⚡ SMART FILL</button><button className={styles.primary} onClick={()=>notify('New booking opened')}>＋ BOOK JOB</button></div></header>
  <section className={styles.summary}><article><small>WEEKLY CAPACITY</small><b>81%</b><span>37.4 / 46 labor hours</span></article><article><small>BOOKED REVENUE</small><b>$7,842</b><span>+14% vs last week</span></article><article><small>OPEN CAPACITY</small><b>8.6h</b><span>Best opening: Thu 8–12</span></article><article><small>AVG JOB VALUE</small><b>$522</b><span>Target $575</span></article></section>
  <section className={styles.board}>
   <div className={styles.boardTop}><div><button>‹</button><b>AUG 31 — SEP 5, 2026</b><button>›</button></div><div><span>● Confirmed</span><span>● Authorized</span><span>● Tentative</span></div></div>
   <div className={styles.days}>{days.map(d=><div key={d}>{d}</div>)}</div>
   <div className={styles.canvas}>
    {days.map((_,di)=><div className={styles.dayCol} key={di}>{Array.from({length:11},(_,i)=><i key={i} style={{top:`${i*9.09}%`}}/>)}</div>)}
    <div className={styles.times}>{Array.from({length:11},(_,i)=><span key={i} style={{top:`${i*9.09}%`}}>{i+7}:00</span>)}</div>
    {visible.map((j,i)=><button className={`${styles.job} ${styles[j.color]}`} key={i} style={{left:`calc(${j.day} * ((100% - 62px)/6) + 62px + 4px)`,top:`${((j.start-7)/10)*100}%`,height:`${Math.max(8,(j.duration/10)*100)}%`,width:'calc((100% - 62px)/6 - 8px)'}} onClick={()=>notify(`${j.vehicle} job opened`)}><small>{j.start % 1 ? `${Math.floor(j.start)}:30` : `${j.start}:00`} · {j.tech}</small><b>{j.vehicle}</b><span>{j.service}</span><footer><em>{j.customer}</em><strong>${j.value}</strong></footer></button>)}
   </div>
  </section>
  <section className={styles.capacity}><div><small>CAPACITY INTELLIGENCE</small><h2>Thursday morning can make more money.</h2><p>You have enough labor for either two maintenance details or one paint correction. Based on current lead demand, FinishOS estimates <b>$510–$860 additional revenue</b> if filled.</p></div><button onClick={()=>notify('Matching leads to open capacity')}>FIND BEST LEADS →</button></section>
  {toast&&<div className={styles.toast}>{toast}</div>}
 </main>
}