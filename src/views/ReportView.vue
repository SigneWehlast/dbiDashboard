<script setup>
import ReportForm from '@/components/ReportForm.vue';
import AllReports from '@/components/AllReports.vue';
</script>

<template>
    <div class="report-container">
        <h1>Rapporter</h1>
        <div class="report-form">
            <ReportForm />
        </div>
        <div class="report-form">
            <h2 class="report-form__h2">Alle udførte Rapporter</h2>
            <AllReports />
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
    margin-top: 2em;

    &__h2 {
        text-align: center;
    }
}
</style>