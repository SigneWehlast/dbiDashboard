import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();

//dataen der er på brugeren i Firestore
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

  //bruges når brugeren logger ud
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

  //henter dataen på brugeren
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

  //henter alle brugere
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

  //henter antallet af brugere
  const fetchUserCount = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      userCount.value = querySnapshot.size;
    } catch (err) {
      console.error('Fejl ved hentning af brugere:', err);
    }
  };

  //holder øje med om brugeren er logget ind
  onAuthStateChanged(auth, (firebaseUser) => {
    console.log('Firebase auth state changed:', firebaseUser);
    if (firebaseUser) {
      fetchUserData(firebaseUser.uid);
    } else {
      clearUser();
      console.log('User logged out');
      router.push({ name: 'login' });
    }
    isAuthReady.value = true;
  });

  const logout = async () => {
    try {
      await signOut(auth);
      clearUser();
      localStorage.clear();
      sessionStorage.clear();
      router.push({ name: 'login' });
    } catch (err) {
      console.error('Fejl ved logout:', err);
    }
  };

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
