import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth();

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    companyName: '',
    createdAt: null,
    email: '',
    firstName: '',
    lastName: '',
    uid: '',
    role: ''
  });

  const isAuthReady = ref(false);
  const userCount = ref(0);
  const allUsers = ref([]);

  const setUser = (userData) => {
    user.value = userData;
  };

  const clearUser = () => {
    user.value = {
      companyName: '',
      createdAt: null,
      email: '',
      firstName: '',
      lastName: '',
      uid: '',
      role: ''
    };
  };

  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          companyName: userData.companyName,
          role: userData.role,
          uid: userData.uid,
          createdAt: userData.createdAt
        });
      } else {
        console.error('Bruger ikke fundet i databasen');
      }
    } catch (err) {
      console.error('Fejl ved hentning af brugerdata:', err);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      allUsers.value = querySnapshot.docs.map(doc => ({
        uid: doc.data().uid,
        fullName: `${doc.data().firstName} ${doc.data().lastName}`
      }));
    } catch (err) {
      console.error('Fejl ved hentning af alle brugere:', err);
    }
  };

  const fetchUserCount = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      userCount.value = querySnapshot.size;
    } catch (err) {
      console.error('Fejl ved hentning af brugere:', err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearUser();
    } catch (err) {
      console.error('Fejl ved log ud:', err);
    }
  };

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      fetchUserData(firebaseUser.uid);
    } else {
      clearUser();
    }
    isAuthReady.value = true;
  });

  return {
    user,
    isAuthReady,
    userCount,
    allUsers,
    setUser,
    clearUser,
    fetchUserData,
    fetchAllUsers,
    fetchUserCount,
    logout
  };
});
