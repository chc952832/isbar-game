// classifyQuestions.ts
import { shuffle } from '@/utils/shuffle';

export function getClassifyQuestions(count = 5) {
  return shuffle([...classifyQuestions]).slice(0, count)
}

export const classifyQuestions = [
  {
    question: '請將下列交班內容項目，分類至適當的欄位',
    items: [
      { text: '交班時間與單位', category: 'I', explanation: '基本交班資訊屬 I 分類' },
      { text: '異常檢驗值 / 檢查報告追蹤', category: 'A', explanation: '檢查結果屬於評估，為 A（Assessment）' },
      { text: '特殊感染與隔離', category: 'S', explanation: '現存特殊感染為 S（Situation）' },
      { text: '其他計畫 / 預排處置', category: 'R', explanation: '未來處置及計畫為 R 類' },
      { text: '特殊裝置設定（如 ECMO, IABP）', category: 'A', explanation: '特殊裝置分類為 A' },
      { text: '治療經過', category: 'B', explanation: '治療過程為 Background' },
      { text: '現存管路', category: 'A', explanation: '目前有哪些管路屬於 A 類評估' },
      { text: '入院診斷', category: 'B', explanation: '入院診斷屬於病人背景資料' },
      { text: '今日狀況', category: 'S', explanation: '今日的整體狀況歸為 S（Situation）' },
      { text: '呼吸器設定與警報值', category: 'R', explanation: '呼吸器設定建議為 Recommendation' },
      { text: '呼吸治療計畫 / 策略 / 目標值', category: 'R', explanation: '屬於建議與治療方向' },
      { text: '現況評估/呼吸治療評估', category: 'A', explanation: '治療相關評估歸為 A（Assessment）' },
      { text: '病史', category: 'B', explanation: '既往病史屬於 B（Background）' },
      { text: '意識狀況 / 生命徵象', category: 'A', explanation: '生命徵象及意識屬於評估，分類為 A' },
      { text: '病人基本資料（姓名 / 床號 / 性別 / 年齡）', category: 'I', explanation: '交班開頭需介紹基本資料，屬於 I（Introduction）' },
      { text: '交班提醒事項', category: 'R', explanation: '需注意的提醒事項屬於建議類別' },
      { text: '鎮靜 / 升壓藥物', category: 'A', explanation: '藥物使用影響評估結果，為 A 類' },
      { text: '交班者與接班者身份', category: 'I', explanation: '介紹彼此的角色為 I 類別' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '48 歲男性，插管 3 日，正在使用呼吸器通氣。請將以下交班資訊分類至 ISBAR 對應欄位：',
    items: [
      { text: 'GCS E1VEM1', category: 'A', explanation: '意識評估屬於 Assessment' },
      { text: 'intubated on 6/20, was admitted to RICU under impression of ARDS', category: 'B', explanation: '入院診斷、入院經過與插管日為 Background' },
      { text: 'FiO2 0.6, PEEP 10, VT 450, Flow 50, RR 22', category: 'R', explanation: '目前呼吸器設定建議為 Recommendation' },
      { text: 'keep VT< 450ml(6c.c/kg), pH≧7.25, SpO2≧88%', category: 'R', explanation: '屬於呼吸器目標值建議' },
      { text: '交班人：RT 張三，接班人：RT 李四', category: 'I', explanation: '身份介紹為 Introduction' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '72 歲女性，COPD 惡化住院第五天，使用BiPAP。請協助分類交班內容：',
    items: [
      { text: 'HR 98, BP 142/88, RR 25, SpO2 92% ', category: 'A', explanation: '最後一次生命徵象做為評估參考，屬於Assessment' },
      { text: 'Hx: COPD, frequent exacerbation, chronic CO2 retention', category: 'B', explanation: '為病史 Background' },
      { text: 'BiPAP ST mode / IPAP 18 / EPAP 8 / Rate 14 / Ti 0.8', category: 'R', explanation: '呼吸器設定屬 Recommendation' },
      { text: '建議依ABG調整 BiPAP 設定', category: 'R', explanation: '建議與治療方向屬 Recommendation' },
      { text: '病人姓名：王小美，床號：7H-212', category: 'I', explanation: '基本身份資料為 Introduction' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '60 歲男性, 入院換肝術後使用呼吸器。請分類以下交班資訊：',
    items: [
      { text: 'Weaning Profile test, Pi: -60cmH2O, Pe: +100cmH2O, RSBI:40, cuff leak test Vti:500ml, Vte:123ml/162ml/101ml', category: 'A', explanation: '呼吸脫離評估屬於 Assessment' },
      { text: 'Hx: alcoholic cirrhosis, 07/11 was admitted to ward for preparation of liver transplant', category: 'B', explanation: '病史和入院經過為 Background' },
      { text: 'FiO2 0.3, PEEP 5, PS 10; Extubation is planned for tomorrow.', category: 'R', explanation: '呼吸設定及治療計畫為 Recommendation' },
      { text: 'He returned from the OR 7 hours ago with the ETT in place; he is now awake and has begun respiratory training.', category: 'S', explanation: '病人現況為 Situation' },
      { text: 'keep weaning', category: 'R', explanation: '呼吸治療計畫屬於 Recommendation' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '88 歲女性，OHCA，住院第十天，VA ECMO及呼吸器使用中。請協助分類交班資訊：',
    items: [
      { text: 'under VA ECMO support now.', category: 'S', explanation: '現況屬於 S' },
      { text: '06/15 OHCA s/p CPCR 15mins with ROSC, due to cardiogenic shock, on VA ECMO support, post cath, transfer to CCU care. ', category: 'B', explanation: '入院與治療經過為 Background' },
      { text: 'VA type ECMO FiO2:100%, Gas flow: 1500ml/min, Blood flow: 3.11L/min, Pump speed: 1891RPM', category: 'A', explanation: '特殊管路與裝置為 Assessment' },
      { text: 'Schedule echocardiography tomorrow morning to assess cardiac recovery and readiness for VA‑ECMO weaning.', category: 'R', explanation: '後續計畫為 Recommendation' },
      { text: '姓名：陳阿珠，床號：CCU-10', category: 'I', explanation: '介紹病人基本資料為 Introduction' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  }
];
