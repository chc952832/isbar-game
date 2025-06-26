<template>
  <div class="container">
    <div class="card">
      <div class="emoji">🏥</div>
      <h1>ISBAR 電子教學遊戲</h1>
      <p class="subtitle">透過互動方式熟悉ISBAR</p>
      <div class="button-group">
        <RouterLink to="./choice" class="btn btn-choice">
          🎯 單選遊戲
        </RouterLink>
        <RouterLink to="./classify" class="btn btn-classify">
          🧩 分類遊戲
        </RouterLink>
        <RouterLink to="/leaderboard" class="btn btn-ranking">🏆 排行榜</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background: linear-gradient(to bottom, #fef6ff, #e1f3ff);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 420px;
  position: relative;
}

.emoji {
  font-size: 48px;
  margin-bottom: 1rem;
}

h1 {
  color: #5a3e8e;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  display: block;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.btn-classify {
  background-color: #f78fb3;
}

.btn-classify:hover {
  background-color: #f56ca6;
}

.btn-choice {
  background-color: #a29bfe;
}

.btn-choice:hover {
  background-color: #7f75e8;
}

.btn-ranking {
  background-color: #85dc95;
}

.btn-ranking:hover {
  background-color: #6ed882;
}
</style>
