<script setup>
import OverviewWidget from '@/components/OverviewWidget.vue';
import TaskOverview from '@/components/TaskOverview.vue';
import DeviationPerMonthWidget from '@/components/DeviationPerMonthWidget.vue';
import DeadlineExceededWidget from '@/components/DeadlineExceededWidget.vue';
import UserCounterWidget from '@/components/UserCounterWidget.vue';
import RepportPerMonthWidget from '@/components/ReportPerMonthWidget.vue';

import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/configs/firebase';

const firstName = ref('');
const lastName = ref('');

onMounted(() => {
  //Tjekker hvilken bruger, der er logget ind
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
        console.log('Ingen bruger fundet');
      }
    } else {
      console.log('Ingen bruger logget ind');
    }
  });
});
</script>

<template>
  <div>
    <p class="p1">Velkommen tilbage,</p>
    <h1>{{ firstName }} {{ lastName }}</h1>
  </div>

  <div class="home-view__overview">
      <OverviewWidget />
      <TaskOverview />
  </div>

  <div class="home-view__graphtop">
    <DeviationPerMonthWidget/>
    <DeadlineExceededWidget />
  </div>

  <div class="home-view__graphbottom">
    <UserCounterWidget />
    <RepportPerMonthWidget />
  </div>
</template>

<style scoped lang="scss">


.home-view__overview {
  display: flex;
  flex-direction: column;
  gap: 2.5em !important;
}

.home-view__graphtop{
  display: flex;
  justify-content: space-between;
}

.home-view__graphbottom{
  display: flex;
  justify-content: space-between;
}
</style>