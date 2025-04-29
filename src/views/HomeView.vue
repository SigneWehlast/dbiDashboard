<script setup>
import OverviewWidget from "../components/OverviewWidget.vue";
import TaskOverview from "../components/TaskOverview.vue";
import DeviationPerMonthWidget from "@/components/DeviationPerMonthWidget.vue";
import DeadlineExceededWidget from "@/components/DeadlineExceededWidget.vue"

import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/configs/firebase';

const firstName = ref('');
const lastName = ref('');

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        firstName.value = data.firstName || '';
        lastName.value = data.lastName || '';
      } else {
        console.log('No such user document!');
      }
    } else {
      console.log('User not logged in');
    }
  });
});
</script>

<template>
  <p class="p1">Velkommen tilbage,</p>
  <h1>{{ firstName }} {{ lastName }}</h1>
  <div class="home-view__overview">
      <OverviewWidget />
      <TaskOverview />
  </div>

  <div class="home-view__graph">
    <DeviationPerMonthWidget/>
    <DeadlineExceededWidget />
  </div>
</template>

<style scoped lang="scss">
.home-view__overview {
  display: flex;
  flex-direction: column;
  gap: 2.5em;
}

.home-view__graph{
  display: flex;
  justify-content: space-between;
}

</style>