<script setup lang="ts">
import { computed, ref } from 'vue'

type Palette = {
  name: string
  mood: string
  label: string
  colors: [string, string, string]
  title: string
  subtitle: string
  number: string
}

const palettes: Palette[] = [
  { name: '苔蘚 × 奶油', mood: '安靜的自然手記', label: 'MOSS', colors: ['#315a47', '#f4ecd9', '#d79a4e'], title: 'slow\nplaces', subtitle: 'A field guide to being here', number: '01' },
  { name: '祖母綠 × 珊瑚', mood: '熱帶午後的果敢', label: 'EMERALD', colors: ['#006c5d', '#ff765e', '#f7e5c7'], title: 'the\nweekend', subtitle: 'Sun, salt & small adventures', number: '02' },
  { name: '鼠尾草 × 墨黑', mood: '極簡而有份量', label: 'SAGE', colors: ['#a6b7a1', '#20231f', '#f9f5eb'], title: 'form &\nfeeling', subtitle: 'The quiet power of good design', number: '03' },
  { name: '森林綠 × 薰衣草', mood: '夜色中的奇想', label: 'FOREST', colors: ['#193c32', '#c9b9df', '#f4e6c5'], title: 'after\ndark', subtitle: 'Stories for the softer hours', number: '04' },
  { name: '橄欖綠 × 粉紅', mood: '復古又俏皮', label: 'OLIVE', colors: ['#737d35', '#f4a4a4', '#fff0cf'], title: 'good\ntaste', subtitle: 'An edible kind of optimism', number: '05' },
  { name: '薄荷綠 × 靛藍', mood: '清醒的未來感', label: 'MINT', colors: ['#86d7bd', '#183d83', '#f7f2e8'], title: 'new\nways', subtitle: 'A guide to tomorrow, gently', number: '06' },
  { name: '松針綠 × 駝色', mood: '經典而溫暖', label: 'PINE', colors: ['#174235', '#c59562', '#f1e7d2'], title: 'the\ncommon', subtitle: 'Objects for a well-lived life', number: '07' },
  { name: '萊姆綠 × 莓果紅', mood: '明亮的叛逆感', label: 'LIME', colors: ['#a9c93d', '#9f274a', '#fff7dc'], title: 'make\nnoise', subtitle: 'The playful issue', number: '08' },
  { name: '海藻綠 × 天藍', mood: '輕盈的海岸假期', label: 'KELP', colors: ['#2b756b', '#82c9df', '#fff0c5'], title: 'tide\nlines', subtitle: 'Notes from the edge of water', number: '09' },
  { name: '玉石綠 × 朱紅', mood: '有文化感的張力', label: 'JADE', colors: ['#287466', '#d94f38', '#f6e8cd'], title: 'ordinary\nmagic', subtitle: 'Culture, craft & curiosity', number: '10' },
  { name: '灰綠 × 鵝黃', mood: '柔和的居家日常', label: 'EUCALYPTUS', colors: ['#748b78', '#f0d878', '#fff9ee'], title: 'at\nhome', subtitle: 'Room to breathe, space to grow', number: '11' },
  { name: '孔雀綠 × 紫羅蘭', mood: '大膽的藝術宣言', label: 'PEACOCK', colors: ['#007a70', '#7f4da0', '#ffdda7'], title: 'outside\nthe line', subtitle: 'A colour issue', number: '12' },
]

const selected = ref(0)
const palette = computed(() => palettes[selected.value])

function choosePalette(index: number) {
  selected.value = index
}
</script>

<template>
  <main :style="{ '--green': palette.colors[0], '--accent': palette.colors[1], '--paper': palette.colors[2] }">
    <header>
      <a class="wordmark" href="./" aria-label="Greenroom home"><i></i>greenroom</a>
      <p>一場色彩小遊戲</p>
      <span>12 / 12</span>
    </header>

    <section class="intro">
      <div>
        <p class="kicker">GREEN EDITION · 2026</p>
        <h1>綠色，<em>不只一種個性。</em></h1>
      </div>
      <p class="instruction">選一組綠色搭配，看看它會為一本書或一本雜誌帶來什麼樣的心情。</p>
    </section>

    <section class="playground" aria-label="Green palette cover game">
      <div class="cover-area">
        <div class="cover-shadow"></div>
        <article class="cover" :key="palette.label">
          <div class="cover-top"><span>{{ palette.label }}</span><span>VOL. {{ palette.number }}</span></div>
          <div class="cover-art" aria-hidden="true"><i></i><b></b><strong></strong></div>
          <div class="cover-copy">
            <p>{{ palette.subtitle }}</p>
            <h2>{{ palette.title }}</h2>
          </div>
          <div class="cover-bottom"><span>GREENROOM PRESS</span><span>¥ 980</span></div>
        </article>
        <div class="cover-note"><span></span> {{ palette.mood }}</div>
      </div>

      <aside class="palette-panel">
        <p class="panel-label">CHOOSE A MOOD</p>
        <div class="palette-list" role="radiogroup" aria-label="選擇色彩組合">
          <button v-for="(item, index) in palettes" :key="item.label" class="palette-choice" :class="{ active: selected === index }" type="button" role="radio" :aria-checked="selected === index" @click="choosePalette(index)">
            <span class="choice-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="choice-dots"><i v-for="color in item.colors" :key="color" :style="{ background: color }"></i></span>
            <span class="choice-name">{{ item.name }}</span>
          </button>
        </div>
        <p class="hint">點擊配色，換一本封面。</p>
      </aside>
    </section>

    <footer><span>綠色封面研究室</span><span>每一種搭配，都是一個新故事。</span></footer>
  </main>
</template>
