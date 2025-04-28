<script setup>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/configs/firebase';
import SearchBar from '@/components/SearchBar.vue';

const firstName = ref('');
const lastName = ref('');
const companyName = ref('');

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
        companyName.value = data.companyName || '';
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
  <div class="right-view">
    <div class="profile-bar">
   <SearchBar />
      <div class="profile-bar__wrapper">
        <img src="../assets/icons/bell-solid.svg" alt="profile icon" class="profile-bar__icon">
        <div class="profile-bar__wrapper-name">
          <h3>{{ firstName }} {{ lastName }}</h3>
          <p class="profile-bar__wrapper-company">{{ companyName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-bar {
  align-items: center;
  display: flex;
  height: fit-content;
  justify-content: space-between;
  width: 100%;

  &__wrapper {
    align-items: center;
    display: flex;
    gap: 1.5em;
  
    &-company {
      color: #5F6B6C;
      font-size: 20px;
      font-weight: 200;
      letter-spacing: 0.01em;
      line-height: 1.4;
      margin: 0;
    }
  }

  &__icon {
    height: 2em;
    width: 2em;
  }
}

.right-view{
  display: flex;
  flex-direction: column;
}
</style>
