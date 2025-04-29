<script setup>
import ReportForm from '@/components/ReportForm.vue';
</script>

<template>
    <div class="report-container">
        <h1>Rapporter</h1>
        <div class="report-form">
            <ReportForm />
            <h2 class="report-form__h2">Alle vises</h2>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.report-form {
    background-color: v.$white;
    border-radius: 1.5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 2em;

    &__h2 {
        text-align: center;
    }
}
</style>