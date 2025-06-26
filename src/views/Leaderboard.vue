<template>
  <div class="leaderboard-container">
    <h2 class="title">🏆 排行榜</h2>

    <div class="board-section">
      <h3 class="section-title">選擇遊戲</h3>
      <button @click="showAllChoice = !showAllChoice" class="toggle-all">
        {{ showAllChoice ? '顯示前五名' : '查看全部紀錄' }}
      </button>
      <ul class="score-list">
        <li v-for="(item, idx) in showAllChoice ? allChoice : choiceTop" :key="idx" class="score-item">
          <span class="rank">{{ item.rank }}</span>
          <span class="name">{{ item.entry.name }}</span>
          <span class="score">{{ item.entry.score }} 分</span>
          <span class="time">{{ formatDate(item.entry.timestamp) }}</span>
        </li>
      </ul>
    </div>

    <div class="board-section">
      <h3 class="section-title">分類遊戲</h3>
      <button @click="showAllClassify = !showAllClassify" class="toggle-all">
        {{ showAllClassify ? '顯示前五名' : '查看全部紀錄' }}
      </button>
      <ul class="score-list">
        <li v-for="(item, idx) in showAllClassify ? allClassify : classifyTop" :key="idx" class="score-item">
          <span class="rank">{{ item.rank }}</span>
          <span class="name">{{ item.entry.name }}</span>
          <span class="score">{{ item.entry.score }} 分</span>
          <span class="time">{{ formatDate(item.entry.timestamp) }}</span>
        </li>
      </ul>
    </div>

    <div class="board-section">
      <h3 class="section-title">綜合排行榜</h3>
      <ul class="score-list">
        <li v-for="(entry, index) in combinedTop" :key="index" class="score-item">
          <span class="rank">{{ index + 1 }}</span>
          <span class="name">{{ entry.name }}</span>
          <span class="score">{{ entry.total }} 分</span>
        </li>
      </ul>
    </div>

    <RouterLink to="/isbar-game/" class="home-button">🏠 回首頁</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs, Timestamp } from 'firebase/firestore'
import { QueryDocumentSnapshot } from 'firebase/firestore'

interface ScoreEntry {
  name: string
  score: number
  timestamp?: Timestamp
}
interface RankedEntry { rank: number; entry: ScoreEntry }
interface CombinedEntry { name: string; total: number }

const allClassify = ref<RankedEntry[]>([])
const allChoice = ref<RankedEntry[]>([])
const classifyTop = ref<RankedEntry[]>([])
const choiceTop = ref<RankedEntry[]>([])
const combinedTop = ref<CombinedEntry[]>([])

const showAllClassify = ref(false)
const showAllChoice = ref(false)

function formatDate(ts?: Timestamp): string {
  if (!ts) return ''
  const d = ts.toDate()
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}

function computeRanks(entries: ScoreEntry[]): RankedEntry[] {
  const sorted = [...entries].sort((a, b) => b.score - a.score)
  const ranked: RankedEntry[] = []
  let currentRank = 1
  let lastScore: number | null = null
  sorted.forEach((entry, idx) => {
    if (entry.score !== lastScore) currentRank = idx + 1
    ranked.push({ rank: currentRank, entry })
    lastScore = entry.score
  })
  return ranked
}

async function fetchLeaderboard() {
  // 分類遊戲
  const classifySnap = await getDocs(collection(db, 'classify_scores'))
  const classifyArr: ScoreEntry[] = []
  classifySnap.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data()
    classifyArr.push({
      name: data.name,
      score: data.score,
      timestamp: data.timestamp instanceof Timestamp ? data.timestamp : undefined
    })
  })
  allClassify.value = computeRanks(classifyArr)
  classifyTop.value = allClassify.value.slice(0, 5)

  // 單選遊戲
  const choiceSnap = await getDocs(collection(db, 'choice_scores'))
  const choiceArr: ScoreEntry[] = []
  choiceSnap.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data()
    choiceArr.push({
      name: data.name,
      score: data.score,
      timestamp: data.timestamp instanceof Timestamp ? data.timestamp : undefined
    })
  })
  allChoice.value = computeRanks(choiceArr)
  choiceTop.value = allChoice.value.slice(0, 5)

  // 綜合排行
  const combinedMap = new Map<string, number>()
  allClassify.value.forEach(item => combinedMap.set(item.entry.name, item.entry.score))
  allChoice.value.forEach(item => {
    combinedMap.set(item.entry.name, (combinedMap.get(item.entry.name) || 0) + item.entry.score)
  })
  combinedTop.value = Array.from(combinedMap.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
}

onMounted(fetchLeaderboard)
</script>

<style scoped>
.leaderboard-container {
  text-align: center;
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}
.title {
  font-size: 2rem;
  color: #5a3e8e;
  text-align: center;
  margin-bottom: 1.5rem;
}
.board-section {
  margin-bottom: 2rem;
  position: relative; 
  min-width: 300px;
}
.section-title {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 0.8rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.3rem;
}
.score-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.score-item {
  display: grid;
  grid-template-columns: 50px 1fr 100px 120px;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #fef3c7 0%, #d9f99d 100%);
  margin-bottom: 0.6rem;
  transition: background 0.3s ease;
}
.score-item:hover {
  background: linear-gradient(135deg, #fff9db 0%, #cdeecb 100%);
}
.rank {
  font-weight: bold;
  color: #e76f51;
  font-size: 1.1rem;
}
.name {
  font-size: 1rem;
  color: #264653;
}
.score {
  text-align: center;
  font-weight: 600;
  color: #2a9d8f;
}
.time {
  text-align: right;
  font-size: 0.85rem;
  color: #6c757d;
}
.home-button {
  display: inline-block;
  margin: 1.5rem 0 0;
  padding: 0.6rem 1.2rem;
  background: #2a9d8f;
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}
.home-button:hover {
  background: #21867a;
}
.toggle-all {
  background-color: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
}
.toggle-all:hover {
  background: #f0f0f0;
}
</style>
