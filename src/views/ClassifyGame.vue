<template>
  <div class="game-container">
    <h2 class="title">{{ currentQuestion.question }}</h2>

    <!-- 可選項目列表 -->
    <div class="selection-zone">
      <h3 class="subtitle">點選交班項目後，在下方分類欄位中點選加入以進行分類，欲更改欄位，再點選一次該項目即可重新加入</h3>
      <div class="item-list">
        <button
          v-for="(item, index) in unassignedItems"
          :key="item.id"
          class="selectable-item"
          @click="selectItem(item)"
        >
          {{ item.text }}
        </button>
      </div>
    </div>

    <!-- 分類區塊 -->
    <div class="drop-zones">
      <div
        v-for="(zone, key) in zones"
        :key="key"
        class="drop-zone"
        :class="{ fullRow: key === 'I' }"
      >
        <h4 class="zone-label">{{ key }}</h4>
        <div class="drop-content">
          <div
            v-for="(item, i) in zone"
            :key="item.id"
            class="drop-item"
            @click="removeItemFromZone(key, item.id)"
          >
            {{ item.text }}
          </div>
        </div>
        <button
          v-if="selectedItem"
          class="add-button"
          @click="assignItemToZone(key)"
        >➕ 加入</button>
      </div>
    </div>

    <!-- 送出與重試按鈕（送出後隱藏） -->
    <div class="button-group" v-if="!showNextButton && !gameFinished">
      <button @click="checkAnswers" class="submit-button">送出答案</button>
      <button @click="resetCurrent" class="reset-button">重試</button>
    </div>

    <!-- 下一題按鈕（非最後一題顯示） -->
    <div class="button-group next-only" v-if="showNextButton && currentIndex < allQuestions.length - 1">
      <button @click="goToNext" class="submit-button">下一題</button>
    </div>

    <!-- 全部完成後顯示區塊 -->
    <div v-if="gameFinished" class="finish-message">
      <p>🎉 全部題目完成！</p>
      <p>你本次得分為 <strong>{{ score }}</strong> / 100</p>
      <div class="submit-score">
        <input v-model="playerName" placeholder="請輸入你的名稱" class="name-input" />
        <button @click="handleSubmitScore" :disabled="scoreSubmitted" class="submit-button">
          {{ scoreSubmitted ? "✅ 已送出" : "📤 送出成績" }}
        </button>
      </div>
      <RouterLink to="/isbar-game/" class="home-button">🏠 回首頁</RouterLink>
      <RouterLink to="/leaderboard" class="leaderboard-button">📊 查看排行榜</RouterLink>
      <button @click="restart" class="reset-button">重新開始</button>
    </div>

    <!-- 檢查結果列表 -->
    <div v-if="results.length" class="result-box">
      <h3>結果：</h3>
      <ul>
        <li
          v-for="(result, i) in results"
          :key="i"
          :class="{ correct: result.correct, incorrect: !result.correct }"
        >
          <strong>{{ result.item.text }}</strong>
          <span v-if="result.correct">✅ 正確</span>
          <span v-else>
            ❌ 錯誤，正確為 <strong>{{ result.correctCategory }}</strong>：{{ result.explanation }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 錯誤提示 -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { classifyQuestions } from '@/data/classifyQuestions'
import { RouterLink } from 'vue-router'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'

interface Item {
  id: string
  text: string
  category: 'I' | 'S' | 'B' | 'A' | 'R'
  explanation: string
}

interface Question {
  question: string
  items: Item[]
}

const isValidCategory = (value: any): value is Item['category'] =>
  ['I', 'S', 'B', 'A', 'R'].includes(value)

const firstQuestion = classifyQuestions[0] as Question
const rest = classifyQuestions.slice(1)
  .filter(q => q.question !== firstQuestion.question)
  .map(q => ({
    question: q.question,
    items: q.items
      .filter(i => isValidCategory(i.category))
      .map(i => ({ ...i, category: i.category as Item['category'] }))
  }))
  .sort(() => Math.random() - 0.5)
  .slice(0, 4)

const allQuestions = ref<Question[]>([firstQuestion, ...rest])
const currentIndex = ref(0)
const currentQuestion = ref(allQuestions.value[currentIndex.value])
const unassignedItems = ref<Item[]>([...currentQuestion.value.items])
const selectedItem = ref<Item | null>(null)
const zones = ref<Record<Item['category'], Item[]>>({ I: [], S: [], B: [], A: [], R: [] })
const results = ref<{ item: Item; correct: boolean; correctCategory: string; explanation: string }[]>([])
const showNextButton = ref(false)
const gameFinished = ref(false)
const score = ref(0)
const errorMessage = ref('')

function selectItem(item: Item) {
  selectedItem.value = selectedItem.value?.id === item.id ? null : item
  errorMessage.value = ''
}

function assignItemToZone(zoneKey: Item['category']) {
  if (!selectedItem.value) {
    errorMessage.value = '請先選擇一個項目再點擊分類加號！'
    return
  }
  zones.value[zoneKey].push(selectedItem.value)
  unassignedItems.value = unassignedItems.value.filter(i => i.id !== selectedItem.value?.id)
  selectedItem.value = null
}

function removeItemFromZone(zoneKey: Item['category'], itemId: string) {
  const idx = zones.value[zoneKey].findIndex(i => i.id === itemId)
  if (idx !== -1) {
    const [removed] = zones.value[zoneKey].splice(idx, 1)
    unassignedItems.value.push(removed)
  }
}

function checkAnswers() {
  if (unassignedItems.value.length > 0) {
    errorMessage.value = '請完成所有項目的分類後再送出答案！'
    return
  }
  errorMessage.value = ''
  results.value = []
  let allCorrect = true
  for (const [zoneKey, items] of Object.entries(zones.value) as [Item['category'], Item[]][]) {
    for (const item of items) {
      const isCorrect = item.category === zoneKey
      results.value.push({ item, correct: isCorrect, correctCategory: item.category, explanation: item.explanation })
      if (!isCorrect) allCorrect = false
    }
  }
  if (allCorrect) score.value += 20

  if (currentIndex.value < allQuestions.value.length - 1) {
    showNextButton.value = true
  } else {
    gameFinished.value = true
  }
}

function resetCurrent() {
  results.value = []
  showNextButton.value = false
  errorMessage.value = ''
  selectedItem.value = null
  currentQuestion.value = allQuestions.value[currentIndex.value]
  unassignedItems.value = [...currentQuestion.value.items]
  Object.keys(zones.value).forEach(k => (zones.value[k as Item['category']] = []))
}

function goToNext() {
  currentIndex.value++
  if (currentIndex.value < allQuestions.value.length) {
    currentQuestion.value = allQuestions.value[currentIndex.value]
    resetCurrent()
  } else {
    gameFinished.value = true
  }
}

function restart() {
  const reshuffled = rest.sort(() => Math.random() - 0.5).slice(0, 4)
  allQuestions.value = [firstQuestion, ...reshuffled]
  currentIndex.value = 0
  currentQuestion.value = allQuestions.value[0]
  gameFinished.value = false
  score.value = 0
  resetCurrent()
}


async function submitScore(name: string, scoreValue: number) {
  try {
    await addDoc(collection(db, 'classify_scores'), {
      name,
      score: scoreValue,
      timestamp: serverTimestamp()
    })
    console.log('✅ 分數已儲存')
  } catch (e) {
    console.error('❌ 錯誤:', e)
  }
}

const playerName = ref('')
const scoreSubmitted = ref(false)

async function handleSubmitScore() {
  if (!playerName.value.trim()) {
    alert('請輸入名稱以送出成績')
    return
  }
  await submitScore(playerName.value.trim(), score.value)
  scoreSubmitted.value = true
}

</script>

<style scoped>
.game-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Helvetica Neue", sans-serif;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #444;
}
.subtitle {
  font-size: 18px;
  margin-bottom: 10px;
}
.selection-zone {
  margin-bottom: 20px;
}
.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.selectable-item {
  padding: 10px 14px;
  background-color: #e0f0ff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 500;
}
.selectable-item:hover {
  background-color: #c0e0ff;
}
.drop-zones {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
  color: #444;
}
.drop-zone {
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 12px;
  padding: 10px;
  width: 120px;
  min-height: 100px;
  text-align: center;
}
.drop-zone.fullRow {
  flex-basis: 100%;
  width: 100%;
}
.zone-label {
  font-weight: bold;
  margin-bottom: 8px;
}
.drop-content {
  min-height: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-top: 4px;
}
.drop-item {
  padding: 6px 10px;
  background-color: #fff3cd;
  border: 1px solid #ffecb5;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.add-button {
  margin-top: 8px;
  background-color: #4caf50;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.add-button:hover {
  background-color: #43a047;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}
.button-group.next-only {
  margin-top: 10px;
}
.submit-button, .reset-button {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}
.submit-button {
  background-color: #1976d2;
  color: white;
}
.submit-button:hover {
  background-color: #1565c0;
}
.reset-button {
  background-color: #e0e0e0;
  color: #263238;
  display: inline-block;
  margin: 10px auto;
}
.reset-button:hover {
  background-color: #cfcfcf;
}
.result-box {
  margin-top: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  color: #444;
}
.correct {
  color: green;
}
.incorrect {
  color: red;
}
.finish-message {
  text-align: center;
  margin-top: 30px;
}
.home-button {
  display: inline-block;
  margin: 10px auto;
  background-color: #2196f3;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.2s;
}
.home-button:hover {
  background-color: #1976d2;
}
.error-message {
  color: red;
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
}

.submit-score {
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name-input {
  padding: 0.5em;
  font-size: 1em;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 0.5em;
  width: 200px;
  text-align: center;
}

.submit-button {
  padding: 0.4em 1em;
  font-size: 1em;
  border-radius: 6px;
  border: none;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
}

.submit-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.leaderboard-button {
  display: inline-block;
  margin-top: 1rem;
  background-color: #ee90c1;
  color: #263238;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;
  margin-right: 5px;
}

.leaderboard-button:hover {
  background-color: #f2449b;
}
</style>
