<script setup>
import { onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUserCount();
});

// Computed properties til at hente bruger data fra pinia store
const user = computed(() => authStore.user);
const userCount = computed(() => authStore.userCount); //bliver ikke brugt
</script>

<template>
  <div class="users-overview">
    <h3>Brugeroverblik</h3>
    <table>
        <thead>
            <tr>
                <th class="p2 heading-bar">Navn</th>
                <th class="p2 heading-bar">E-mail</th>
                <th class="p2 heading-bar">Virksomhed</th>
                <th class="p2 heading-bar">Rolle</th>
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
  </div>
</template>
<style scoped lang="scss">
@use "@/assets/main.scss" as v;

table {
  background-color: v.$white;
  border-collapse: collapse;
  margin-top: 1em;
  text-align: left;
  border-radius: 1.5em;
  width: 100%;
}

th, td {
  padding: 0.75em 0;
}

.users-overview {
  padding: 4.375em;
  background-color: v.$white;
  border-radius: 1.5em;
}

.h3 {
    color: v.$dark-grey;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin: 0;
}

.heading-bar {
  border-bottom: 1px solid #DADCDC;
  border-top: 1px solid #DADCDC;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>