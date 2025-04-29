import { defineStore } from 'pinia'  // Sørg for at importere defineStore
import { ref } from 'vue'
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/configs/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    companyName: '',
    createdAt: null,
    email: '',
    firstName: '',
    lastName: '',
    uid: '',
    role: ''
  })

  const isAuthReady = ref(false)
  const userCount = ref(0)

  // Funktion til at sætte brugerdata
  const setUser = (userData) => {
    user.value = userData
  }

  // Funktion til at rydde brugerdata
  const clearUser = () => {
    user.value = {
      companyName: '',
      createdAt: null,
      email: '',
      firstName: '',
      lastName: '',
      uid: '',
      role: ''
    }
  }

  // Hent brugerdata fra Firestore
  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)
  
      if (userSnap.exists()) {
        const userData = userSnap.data()
        
        console.log('Brugerdata hentet:', userData)
  
        setUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          companyName: userData.companyName,
          role: userData.role,
          uid: userData.uid,
          createdAt: userData.createdAt
        })
      } else {
        console.error('Bruger ikke fundet i databasen')
      }
    } catch (err) {
      console.error('Fejl ved hentning af brugerdata:', err)
    }
  }

  // Hent antal brugere fra Firestore
  const fetchUserCount = async () => {
    try {
      const usersRef = collection(db, 'users')
      const querySnapshot = await getDocs(usersRef)
      userCount.value = querySnapshot.size
      console.log('Antal brugere:', userCount.value)
    } catch (err) {
      console.error('Fejl ved hentning af brugere:', err)
    }
  }

  // Firebase Auth - overvåg loginstatus
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      console.log('Bruger er logget ind:', firebaseUser)
      fetchUserData(firebaseUser.uid)
    } else {
      console.log('Ingen bruger logget ind')
      clearUser()
    }
    isAuthReady.value = true
  })

  return {
    user,
    isAuthReady,
    userCount,
    setUser,
    clearUser,
    fetchUserData,
    fetchUserCount
  }
})
