<template>
  <div class="choice-container">
    <div class="header">
      <div class="icon">💡</div>
      <h2>單選遊戲：選出正確的 ISBAR 欄位</h2>
    </div>

    <div v-if="!isFinished && questions[currentIndex]">
      <p class="label">📄 題目：</p>
      <div class="question-box">
        {{ questions[currentIndex].text }}
      </div>
      <div class="choices">
        <button
          v-for="option in categories"
          :key="option.value"
          :class="['choice-button', { selected: selected === option.value }]"
          :disabled="answered"
          @click="selectAnswer(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
      <div v-if="answered" class="feedback-box">
        <p v-if="isCorrect" class="correct">✅ 正確</p>
        <p v-else class="incorrect">
          ❌ 錯誤，正確答案為 <strong>{{ currentAnswerLabel }}</strong>。
        </p>
        <p class="explanation">解析：{{ currentExplanation }}</p>
      </div>
      <div class="navigation">
        <button v-if="showNext" class="next-button" @click="nextQuestion">👉 下一題</button>
      </div>
    </div>

    <div v-if="isFinished" class="result-box">
      <h3>🎉 全部題目完成！</h3>
      <p>你本次得分為 <strong>{{ score }}</strong> / 100</p>
      <div class="submit-score">
        <input v-model="playerName" placeholder="請輸入你的名稱" class="name-input" />
        <button @click="handleSubmitScore" :disabled="scoreSubmitted" class="submit-button">
          {{ scoreSubmitted ? "✅ 已送出" : "📤 送出成績" }}
        </button>
      </div>
      <RouterLink to="/isbar-game/" class="home-button">🏠 回首頁</RouterLink>
      <RouterLink to="/leaderboard" class="leaderboard-button">📊 查看排行榜</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { choiceQuestions } from '@/data/choiceQuestions'
import { shuffleArray } from '@/utils/shuffle'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'

interface Question {
  text: string
  correctCategory: string
  explanation?: string
}

const totalQuestions = 10
const shuffledQuestions = ref<Question[]>([])
const currentIndex = ref(0)
const score = ref(0)
const showNext = ref(false)
const isFinished = ref(false)
const answered = ref(false)
const isCorrect = ref(false)
const currentAnswerLabel = ref('')
const currentExplanation = ref('')
const selected = ref('')

const categories = [
  { label: 'Introduction', value: 'I' },
  { label: 'Situation', value: 'S' },
  { label: 'Background', value: 'B' },
  { label: 'Assessment', value: 'A' },
  { label: 'Recommendation', value: 'R' }
]

onMounted(() => {
  shuffledQuestions.value = shuffleArray(choiceQuestions).slice(0, totalQuestions)
})

const questions = computed(() => shuffledQuestions.value)

function selectAnswer(option: string) {
  selected.value = option
  const current = questions.value[currentIndex.value]
  const correct = current.correctCategory
  const explanation = current.explanation || ''
  isCorrect.value = selected.value === correct
  if (isCorrect.value) score.value += 10
  answered.value = true
  showNext.value = true
  currentAnswerLabel.value = categories.find(c => c.value === correct)?.label || ''
  currentExplanation.value = explanation
}

function nextQuestion() {
  currentIndex.value++
  if (currentIndex.value >= totalQuestions) {
    isFinished.value = true
  } else {
    selected.value = ''
    answered.value = false
    isCorrect.value = false
    showNext.value = false
    currentAnswerLabel.value = ''
    currentExplanation.value = ''
  }
}

async function submitScore(name: string, scoreValue: number) {
  try {
    await addDoc(collection(db, 'choice_scores'), {
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
.choice-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #fefcff;
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #444;
}

.icon {
  font-size: 2rem;
}

.label {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #444;
}

.question-box {
  background-color: #f5f8fa;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  font-size: 1.1rem;
  color: #444;
}

.choices {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.choice-button {
  padding: 0.6rem 1.2rem;
  background-color: #ffffff;
  border: 2px solid #ce76e0;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
  min-width: 140px;
  font-weight: bold;
  color: #8e44ad;
}

.choice-button.selected {
  background-color: #ce76e0;
  color: white;
}

.submit-button {
  padding: 0.6rem 1.4rem;
  background-color: #5c8efc;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
}

.feedback-box {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

.explanation {
  margin-top: 0.5rem;
  color: #495057;
}

.navigation {
  margin-top: 1rem;
}

.next-button {
  background-color: #ffd43b;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #5a3e00;
  font-size: 1rem;
}

.result-box {
  margin-top: 2rem;
  background: #e7f5ff;
  border-radius: 12px;
  padding: 1.5rem;
  color: #444;
}

.home-button {
  display: inline-block;
  margin-top: 1rem;
  background-color: #c0eb75;
  color: #263238;
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
}

.home-button:hover {
  background-color: #a9e34b;
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
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;
}
</style>
