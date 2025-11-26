import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    // --- Reactive state ---
    const theme = ref<'light' | 'dark' | 'auto'>('auto')
    const units = ref<'metric' | 'imperial'>('metric')

    // --- Apply theme helper ---
    const applyTheme = (mode: 'light' | 'dark' | 'auto') => {
        const root = document.documentElement
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const isDark = mode === 'dark' || (mode === 'auto' && prefersDark)

        root.classList.toggle('dark', isDark)
    }

    // --- Watchers ---
    watch(theme, (v) => {
        applyTheme(v)
        localStorage.setItem('settings.theme', v)
    })

    watch(units, (v) => {
        localStorage.setItem('settings.units', v)
    })

    // --- Initialization ---
    const storedTheme = localStorage.getItem('settings.theme') as typeof theme.value | null
    const storedUnits = localStorage.getItem('settings.units') as typeof units.value | null
    if (storedTheme) theme.value = storedTheme
    if (storedUnits) units.value = storedUnits
    applyTheme(theme.value)

    const isMetric = computed(() => units.value === 'metric')

    return { theme, units, isMetric }
})
