<template>
  <div class="app-wrapper">
    <canvas id="bg-canvas"></canvas>
    <div class="noise-bg"></div>
    <div class="radial-glow"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <NavBar />

    <main class="page">
      <router-view />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/Footer.vue'

onMounted(() => {
  initParticles()
})

function initParticles() {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  let width = window.innerWidth
  let height = window.innerHeight
  let particles = []

  canvas.width = width
  canvas.height = height

  class Particle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.size = Math.random() * 2 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.5 + 0.2
      this.hue = Math.random() > 0.5 ? 280 : 340
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > width) this.speedX *= -1
      if (this.y < 0 || this.y > height) this.speedY *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`
      ctx.fill()
    }
  }

  function init() {
    particles = []
    const count = Math.min(80, Math.floor((width * height) / 15000))
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)
    particles.forEach(p => {
      p.update()
      p.draw()
    })
    requestAnimationFrame(animate)
  }

  init()
  animate()

  window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
    init()
  })
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>