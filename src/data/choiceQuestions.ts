export const choiceQuestions = [
  {
    text: '病人姓名為林大明，床號 103，男性，70 歲。',
    correctCategory: 'I',
    explanation: '這是交班開頭的基本介紹，屬於 Introduction（I）。'
  },
  {
    text: '目前血氧下降至 88%，已提高 FiO2 至 60%。',
    correctCategory: 'S',
    explanation: '描述病人目前狀況，屬於 Situation（S）。'
  },
  {
    text: '病人三天前因肺炎住院，已有呼吸衰竭病史。',
    correctCategory: 'B',
    explanation: '提到過去病史與住院原因，屬於 Background（B）。'
  },
  {
    text: 'ABG 顯示 PaCO2 為 75 mmHg，須密切監控。',
    correctCategory: 'A',
    explanation: '檢驗結果與評估，屬於 Assessment（A）。'
  },
  {
    text: '建議將 PEEP 調整至 8 cmH2O，並加強痰液處理。',
    correctCategory: 'R',
    explanation: '提出治療建議與後續處理，屬於 Recommendation（R）。'
  },
  {
    text: '目前以 SIMV 模式通氣，設定 VT 450 ml。',
    correctCategory: 'A',
    explanation: '描述呼吸器設定屬於 Assessment（A）。'
  },
  {
    text: '昨晚出現喘氣加劇情形，並報告胸痛。',
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
    text: '預計下午 2 點安排轉至普通病房，請留意換機作業。',
    correctCategory: 'R',
    explanation: '交代後續處置與注意事項，屬於 Recommendation（R）。'
  },
  {
    text: '病人目前由我（黃小明）交班給林護理師。',
    correctCategory: 'I',
    explanation: '介紹交班者與接班者，屬於 Introduction（I）。'
  },
  {
    text: '病人接呼吸器後兩天內血氧穩定。',
    correctCategory: 'B',
    explanation: '描述過去治療過程屬於 Background（B）。'
  },
  {
    text: 'SPO2 從今早起逐漸下降，需調整參數因應。',
    correctCategory: 'S',
    explanation: '即時狀況變化，屬於 Situation（S）。'
  },
  {
    text: '設定 PEEP 6、PS 10、FiO2 50%，頻率 14。',
    correctCategory: 'A',
    explanation: '詳細呼吸器設定屬於 Assessment（A）。'
  },
  {
    text: '建議後續安排肺功能檢查與胸部 X 光追蹤。',
    correctCategory: 'R',
    explanation: '屬於建議事項，歸為 Recommendation（R）。'
  },
  {
    text: '目前插管持續第五天，無特殊併發症。',
    correctCategory: 'A',
    explanation: '目前治療情況屬於 Assessment（A）。'
  },
  {
    text: '病人 2 年前診斷為 COPD，需注意慢性病控制。',
    correctCategory: 'B',
    explanation: '病史資訊屬於 Background（B）。'
  },
  {
    text: '我負責呼吸治療部分的交班，林醫師負責主治交接。',
    correctCategory: 'I',
    explanation: '介紹交班角色，屬於 Introduction（I）。'
  },
  {
    text: '建議待會做口腔護理時協助抽痰。',
    correctCategory: 'R',
    explanation: '提醒交接注意事項屬於 Recommendation（R）。'
  },
  {
    text: '今日白天病人呼吸速率上升至 26 次/分。',
    correctCategory: 'S',
    explanation: '屬於目前狀況（Situation）。'
  },
  {
    text: '目前為第三次拔管失敗，考慮是否轉氣切。',
    correctCategory: 'A',
    explanation: '評估呼吸治療成效與後續考量，屬於 Assessment（A）。'
  },
  {
    text: '病人轉入 ICU 後由我（李治療師）負責呼吸器管理。',
    correctCategory: 'I',
    explanation: '介紹交班與接手負責人員，屬於 Introduction（I）。'
  },
  {
    text: 'COPD 病史已超過 10 年，目前仍需定期使用支氣管擴張劑。',
    correctCategory: 'B',
    explanation: '慢性病史資訊，屬於 Background（B）。'
  },
  {
    text: '病人昨天有咳痰困難，今晨配合抽痰後改善。',
    correctCategory: 'S',
    explanation: '即時症狀與處置反應，屬於 Situation（S）。'
  },
  {
    text: 'ABG 結果顯示 pH 7.25, PaCO2 80, PaO2 58。',
    correctCategory: 'A',
    explanation: '血氣數據分析屬於 Assessment（A）。'
  },
  {
    text: '明日早上安排胸部 X 光與肺超音波追蹤。',
    correctCategory: 'R',
    explanation: '屬於後續建議與計畫，為 Recommendation（R）。'
  },
  {
    text: '目前警報頻繁為高壓警報，設定需檢討。',
    correctCategory: 'A',
    explanation: '設備警報與設定評估，屬於 Assessment（A）。'
  },
  {
    text: '轉出後請確認呼吸器紀錄完整與傳輸設定無誤。',
    correctCategory: 'R',
    explanation: '交班提醒與檢查項目，屬於 Recommendation（R）。'
  },
  {
    text: '我在今天早班開始時接手此病人。',
    correctCategory: 'I',
    explanation: '交班者的背景資訊，屬於 Introduction（I）。'
  },
  {
    text: '病人吸入痰液後呼吸困難加劇。',
    correctCategory: 'S',
    explanation: '狀況變化為 Situation（S）。'
  },
  {
    text: '曾於去年插管治療共 8 天。',
    correctCategory: 'B',
    explanation: '既往插管經驗為病史，屬於 Background（B）。'
  },
  {
    text: '建議調整 PS 值至 14 以因應潮氣量不足。',
    correctCategory: 'R',
    explanation: '治療參數調整建議，為 Recommendation（R）。'
  },
  {
    text: 'SpO2 持續低於 90%，雖已提高 FiO2 至 70%。',
    correctCategory: 'S',
    explanation: '即時生理參數狀況，屬於 Situation（S）。'
  },
  {
    text: '目前鎮靜劑改為 dexmedetomidine 持續輸注。',
    correctCategory: 'A',
    explanation: '藥物使用與調整屬於 Assessment（A）。'
  },
  {
    text: '病人吸痰後氧合改善，建議維持定時吸痰頻率。',
    correctCategory: 'R',
    explanation: '臨床建議與後續照護，為 Recommendation（R）。'
  },
  {
    text: '交班由值班治療師林小芸完成。',
    correctCategory: 'I',
    explanation: '交班人資訊，屬於 Introduction（I）。'
  },
  {
    text: 'COPD 病人今早訴說胸悶，評估後認為非急性惡化。',
    correctCategory: 'S',
    explanation: '臨床症狀與即時處置，為 Situation（S）。'
  },
  {
    text: '安排下午 2 點執行抽痰與管路更換。',
    correctCategory: 'R',
    explanation: '屬於後續計畫與提醒，為 Recommendation（R）。'
  }
];
