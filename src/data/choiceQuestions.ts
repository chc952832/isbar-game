export const choiceQuestions = [
  {
    text: '病人姓名為林大明，床號 MICU-03，男性，70 歲。',
    correctCategory: 'I',
    explanation: '這是交班開頭的基本介紹，屬於 Introduction（I）。'
  },
  {
    text: '目前血氧下降至 88%，提高 FiO2 至 60%。',
    correctCategory: 'S',
    explanation: '描述病人目前狀況，屬於 Situation（S）。'
  },
  {
    text: '病人三天前因肺炎住院，已有呼吸衰竭病史。',
    correctCategory: 'B',
    explanation: '提到過去病史與住院原因，屬於 Background（B）。'
  },
  {
    text: 'ABG 顯示 PaCO2 為 75 mmHg。',
    correctCategory: 'A',
    explanation: '檢驗結果，屬於 Assessment（A）。'
  },
  {
    text: '建議將 PEEP 調整至 8 cmH2O，並加強痰液處理。',
    correctCategory: 'R',
    explanation: '提出治療建議與後續處理，屬於 Recommendation（R）。'
  },
  {
    text: '目前以 PRVC 模式通氣，設定 VT 450 ml。',
    correctCategory: 'R',
    explanation: '呼吸器設定屬於 Recommendation（R）。'
  },
  {
    text: '今日出現喘氣加劇情形，並報告胸痛。',
    correctCategory: 'S',
    explanation: '描述目前症狀與變化，屬於 Situation（S）。'
  },
  {
    text: '前天曾進行支氣管鏡檢查，發現膿性分泌物。',
    correctCategory: 'B',
    explanation: '描述過去接受的檢查與發現，屬於 Background（B）。'
  },
  {
    text: '目前以 midazolam 持續鎮靜，每小時 2 mg/hr。',
    correctCategory: 'A',
    explanation: '藥物使用狀況屬於評估，歸為 Assessment（A）。'
  },
  {
    text: '預計下午 5 點轉至普通病房，轉送過程使用 NC 3LPM，BiPAP帶去病房。',
    correctCategory: 'R',
    explanation: '交代後續處置與注意事項，屬於 Recommendation（R）。'
  },
  {
    text: '病人目前由我（黃小明）交班給 林小美呼吸治療師。',
    correctCategory: 'I',
    explanation: '介紹交班者與接班者，屬於 Introduction（I）。'
  },
  {
    text: '病人兩天前因CO2 retention使用BiPAP治療。',
    correctCategory: 'B',
    explanation: '描述過去治療過程屬於 Background（B）。'
  },
  {
    text: 'SPO2 從今早起逐漸下降，由NC 3LPM 更換為 AEM 40%, 12LPM。',
    correctCategory: 'S',
    explanation: '即時狀況變化，屬於 Situation（S）。'
  },
  {
    text: '呼吸器設定 PEEP 5、PS 10、FiO2 30%，預計明天拔管',
    correctCategory: 'R',
    explanation: '呼吸器設定及治療計畫屬於 Recommendation（R）。'
  },
  {
    text: '預計周五安排胸部 X 光及支氣管鏡檢查。',
    correctCategory: 'R',
    explanation: '屬於後續處置安排，歸為 Recommendation（R）。'
  },
  {
    text: '因左側氣胸，目前左側有一支Chest tube(07/12~)。',
    correctCategory: 'A',
    explanation: '現存管路屬於 Assessment（A）。'
  },
  {
    text: '病人 2 年前診斷為 COPD。',
    correctCategory: 'B',
    explanation: '病史資訊屬於 Background（B）。'
  },
  {
    text: '我負責SCU1，交班給小夜班黃小明學長。',
    correctCategory: 'I',
    explanation: '介紹交班角色，屬於 Introduction（I）。'
  },
  {
    text: '居家使用呼吸器病人明日出院，請提前上紀錄。',
    correctCategory: 'R',
    explanation: '提醒交接注意事項屬於 Recommendation（R）。'
  },
  {
    text: '今日白天病人呼吸速率上升至 26-32 次/分。',
    correctCategory: 'S',
    explanation: '屬於目前狀況（Situation）。'
  },
  {
    text: 'VV type ECMO FiO2:100%, Gas flow: 1500ml/min, Blood flow: 3.11L/min, Pump speed: 1891RPM。',
    correctCategory: 'A',
    explanation: '特殊管路與裝置，屬於 Assessment（A）。'
  },
  {
    text: '病人轉入 ICU 後由林小美治療師負責。',
    correctCategory: 'I',
    explanation: '介紹交班與接手負責人員，屬於 Introduction（I）。'
  },
  {
    text: 'COPD 病史已超過 10 年，目前仍需定期使用支氣管擴張劑。',
    correctCategory: 'B',
    explanation: '慢性病史資訊，屬於 Background（B）。'
  },
  {
    text: '病人現TB隔離中。',
    correctCategory: 'S',
    explanation: '現存感染與隔離，屬於 Situation（S）。'
  },
  {
    text: 'ABG 結果顯示 pH: 7.25, PaCO2: 80mmHg, PaO2: 58mmHg。',
    correctCategory: 'A',
    explanation: '血氣數據分析屬於 Assessment（A）。'
  },
  {
    text: '明日早上安排胸部 X 光與心臟超音波追蹤。',
    correctCategory: 'R',
    explanation: '屬於後續建議與計畫，為 Recommendation（R）。'
  },
  {
    text: 'GCS: E1VEM1; HR: 98bpm, BP: 142/88, SpO2: 92% 。',
    correctCategory: 'A',
    explanation: '意識評估與生命徵象，屬於 Assessment（A）。'
  },
  {
    text: '轉出至病房後請確認呼吸器電源插頭與傳輸設定無誤。',
    correctCategory: 'R',
    explanation: '交班提醒，屬於 Recommendation（R）。'
  },
  {
    text: '我在今天早班開始時接手此病人。',
    correctCategory: 'I',
    explanation: '交班者的背景資訊，屬於 Introduction（I）。'
  },
  {
    text: '病人今晨嗆咳後呼吸困難加劇。',
    correctCategory: 'S',
    explanation: '狀況變化為 Situation（S）。'
  },
  {
    text: '曾於去年插管治療共 8 天。',
    correctCategory: 'B',
    explanation: '既往插管經驗為病史，屬於 Background（B）。'
  },
  {
    text: '若呼吸訓練狀況良好，明日try T-piece 2小時。',
    correctCategory: 'R',
    explanation: '治療計畫，為 Recommendation（R）。'
  },
  {
    text: '今日抽血PF ratio < 150, 執行Prone position。',
    correctCategory: 'S',
    explanation: '今日狀況及變化，屬於 Situation（S）。'
  },
  {
    text: '目前鎮靜劑Fentanyl, Midazolam 使用中。',
    correctCategory: 'A',
    explanation: '藥物使用屬於 Assessment（A）。'
  },
  {
    text: '病人拍痰後氧合改善，建議維持加強痰液引流。',
    correctCategory: 'R',
    explanation: '臨床建議與後續照護，為 Recommendation（R）。'
  },
  {
    text: '使用IABP 1:1。',
    correctCategory: 'A',
    explanation: '特殊管路與裝置，屬於 Assessment（A）。'
  },
  {
    text: 'COPD 病人今早訴說胸悶，評估後認為非急性惡化，持續觀察中。',
    correctCategory: 'S',
    explanation: '臨床症狀與即時處置，為 Situation（S）。'
  },
  {
    text: '執行肺保護策略，建議維持VT<450ml(8ml/kg), 目標值pH> 7.25, SpO2>88%。',
    correctCategory: 'R',
    explanation: '屬於呼吸治療計畫及策略、目標值，為 Recommendation（R）。'
  }
];
