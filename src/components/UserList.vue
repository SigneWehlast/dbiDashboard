<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUserCount()
})

// Computed properties til at hente bruger data fra pinia store
const user = computed(() => authStore.user)
const userCount = computed(() => authStore.userCount)
</script>

<template>
    <table class="users-overview">
        <thead>
            <tr>
                <th class="h3">Navn</th>
                <th class="h3">E-mail</th>
                <th class="h3">Virksomhed</th>
                <th class="h3">Rolle</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="p1">{{ user.firstName }} {{ user.lastName }}</td>
                <td class="p1">{{ user.email }}</td>
                <td class="p1">{{ user.companyName }}</td>
                <td class="p1">{{ user.role }}</td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped lang="scss">
@use "@/assets/main.scss" as v;

table {
    background-color: v.$white;
  border-collapse: collapse;
  border-left: 1px solid v.$main-blue;
  border-right: 1px solid v.$main-blue;
  margin-top: 1em;
  text-align: left;
  width: 100%;

}

th, td {
  border-bottom: 1px solid v.$main-blue;
  border-top: 1px solid v.$main-blue;
  padding: 0.75em;
}

.h3 {
    color: v.$dark-grey;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin: 0;
}

</style>