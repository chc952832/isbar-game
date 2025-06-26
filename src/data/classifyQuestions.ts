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
      { text: '感染與隔離', category: 'S', explanation: '感染控制相關為 S（Situation）' },
      { text: '其他計畫 / 預排處置', category: 'R', explanation: '未來處置為 R 類' },
      { text: '特殊裝置設定（如 ECMO, IABP）', category: 'A', explanation: '特殊裝置屬於目前治療設定，分類為 A' },
      { text: '治療經過', category: 'B', explanation: '治療過程為 Background' },
      { text: '現存管路', category: 'A', explanation: '目前有哪些管路屬於 A 類評估' },
      { text: '入院診斷', category: 'B', explanation: '診斷屬於病人背景資料' },
      { text: '今日狀況', category: 'S', explanation: '今日的整體狀況歸為 S（Situation）' },
      { text: '呼吸器設定與警報值', category: 'R', explanation: '設定建議為 Recommendation' },
      { text: '呼吸治療計畫 / 策略 / 目標值', category: 'R', explanation: '屬於建議與治療方向' },
      { text: '呼吸治療評估', category: 'A', explanation: '治療相關評估歸為 A（Assessment）' },
      { text: '病史', category: 'B', explanation: '既往病史屬於 B（Background）' },
      { text: '意識狀況 / 生命徵象', category: 'S', explanation: '生命徵象屬於當前病人情況，分類為 S' },
      { text: '病人基本資料（姓名 / 床號 / 性別 / 年齡）', category: 'I', explanation: '交班開頭需介紹基本資料，屬於 I（Introduction）' },
      { text: '交班提醒事項', category: 'R', explanation: '需注意的提醒事項屬於建議類別' },
      { text: '鎮靜 / 升壓藥物', category: 'A', explanation: '藥物使用反映評估結果，為 A 類' },
      { text: '交班者與接班者身份', category: 'I', explanation: '介紹彼此的角色為 I 類別' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '48 歲男性，插管 3 日，正在使用呼吸器協助換氣。請將以下交班資訊分類至 ISBAR 對應欄位：',
    items: [
      { text: 'Vital signs stable, GCS E4VTM6, under sedation.', category: 'S', explanation: '目前狀況描述屬 S 分類' },
      { text: 'ARDS, intubated on 6/20.', category: 'B', explanation: '病因與插管日為 Background' },
      { text: 'FiO2 0.4, PEEP 8, VT 450, Rate 18, PS 12, RR 22', category: 'A', explanation: '目前呼吸器設定為 Assessment' },
      { text: 'Please monitor spontaneous breathing trial readiness tomorrow.', category: 'R', explanation: '屬於治療建議及提醒' },
      { text: '交班人：RT 張三，接班人：RT 李四', category: 'I', explanation: '身份介紹為 Introduction' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '72 歲女性，COPD 惡化住院第五天，使用面罩呼吸器。請協助分類交班內容：',
    items: [
      { text: 'HR 98, BP 142/88, RR 25, SpO2 92% on BiPAP', category: 'S', explanation: '目前生命徵象與使用模式為 S 類' },
      { text: 'COPD, frequent exacerbation, chronic CO2 retention', category: 'B', explanation: '為病史 Background' },
      { text: 'BiPAP IPAP 14 / EPAP 6 / Rate 14', category: 'A', explanation: '治療設定屬 Assessment' },
      { text: '建議依血氣調整 BiPAP 設定', category: 'R', explanation: '建議與治療方向屬 Recommendation' },
      { text: '病人姓名：王小美，床號：301-2', category: 'I', explanation: '基本身份資料為 Introduction' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '60 歲男性，感染性休克住加護病房。請分類以下交班資訊：',
    items: [
      { text: 'MAP 68 mmHg, 正使用升壓劑與鎮靜藥物', category: 'A', explanation: '藥物使用與循環狀況屬於 Assessment' },
      { text: '感染性休克 6/15 入院 ICU', category: 'B', explanation: '診斷與入院時間為 Background' },
      { text: 'FiO2 0.5, PEEP 10, PS 15, RR 24', category: 'A', explanation: '呼吸設定為 Assessment' },
      { text: '感染控制：接觸傳染防護中', category: 'S', explanation: '感染與隔離為 Situation' },
      { text: '建議每日呼吸器評估', category: 'R', explanation: '屬於 Recommendation' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  },
  {
    question: '88 歲女性，DNR，住院第十天，已由呼吸器轉為氧氣鼻管。請協助分類交班資訊：',
    items: [
      { text: '目前使用氧氣鼻管 2 L/min，SpO2 95%', category: 'S', explanation: '目前呼吸狀態與生命徵象為 S' },
      { text: 'DNR，轉安寧治療', category: 'B', explanation: '病人治療計畫與背景為 Background' },
      { text: '病人由呼吸器成功拔管第三天', category: 'A', explanation: '治療評估與歷程為 Assessment' },
      { text: '繼續觀察氧合狀況，如有變化聯絡醫師', category: 'R', explanation: '後續計畫與提醒為 Recommendation' },
      { text: '姓名：陳老太太，床號：601-1', category: 'I', explanation: '介紹基本資料為 Introduction' }
    ].map(item => ({ ...item, id: crypto.randomUUID?.() || Math.random().toString() }))
  }
];
