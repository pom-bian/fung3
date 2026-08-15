<script setup lang="ts">
import { computed, ref } from 'vue'
import { checkDomain, normalizeDomainName, type CheckStatus } from './lib'

const name = ref('')
const checkedName = ref('')
const status = ref<CheckStatus>('idle')

const normalizedName = computed(() => normalizeDomainName(name.value))

const canCheck = computed(() => normalizedName.value.length > 0 && status.value !== 'checking')

async function handleCheck() {
  if (!canCheck.value) return

  checkedName.value = normalizedName.value
  name.value = normalizedName.value
  status.value = 'checking'

  const result = await checkDomain(checkedName.value)

  if (result.error) status.value = 'error'
  else status.value = result.available ? 'available' : 'taken'
}
</script>

<template>
  <main>
    <nav aria-label="Main navigation">
      <a class="brand" href="./" aria-label="Namecheck home">
        <span class="brand-mark">N</span>
        <span>namecheck</span>
      </a>
      <a class="nav-link" href="https://github.com" target="_blank" rel="noreferrer">
        Built with Vue <span aria-hidden="true">↗</span>
      </a>
    </nav>

    <section class="hero">
      <p class="eyebrow"><span></span> Your next idea starts here</p>
      <h1>Find a name<br /><em>worth remembering.</em></h1>
      <p class="intro">
        Check whether the perfect <strong>.com</strong> for your next project is still out there.
      </p>

      <form class="search" @submit.prevent="handleCheck">
        <label class="sr-only" for="domain">Domain name</label>
        <input
          id="domain"
          v-model="name"
          type="text"
          inputmode="url"
          autocomplete="off"
          maxlength="63"
          placeholder="your-brilliant-idea"
          aria-describedby="domain-suffix"
          @input="status = 'idle'"
        />
        <span id="domain-suffix" class="suffix">.com</span>
        <button type="submit" :disabled="!canCheck">
          <span>{{ status === 'checking' ? 'Checking' : 'Check it' }}</span>
          <span v-if="status === 'checking'" class="spinner" aria-hidden="true"></span>
          <span v-else aria-hidden="true">→</span>
        </button>
      </form>

      <div class="result-wrap" aria-live="polite">
        <article v-if="status === 'available'" class="result available">
          <span class="result-icon">✓</span>
          <div>
            <p>Good news — it’s available</p>
            <strong>{{ checkedName }}.com</strong>
          </div>
          <a :href="`https://www.google.com/search?q=register+${checkedName}.com`" target="_blank" rel="noreferrer">Find a registrar ↗</a>
        </article>

        <article v-else-if="status === 'taken'" class="result taken">
          <span class="result-icon">×</span>
          <div>
            <p>This one is already registered</p>
            <strong>{{ checkedName }}.com</strong>
          </div>
          <span class="try-again">Try another name</span>
        </article>

        <article v-else-if="status === 'error'" class="result error">
          <span class="result-icon">!</span>
          <div>
            <p>We couldn’t verify that domain</p>
            <strong>Please wait a moment and try again.</strong>
          </div>
        </article>
      </div>
    </section>

    <footer>
      <p>Free to use. No sign-up. No tracking.</p>
      <p>Availability provided by public RDAP data.</p>
    </footer>
  </main>
</template>
