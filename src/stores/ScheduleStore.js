import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { db } from '@/configs/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useTaskStore = defineStore('ScheduleStore', () => {
  const tasks = ref([])
  const isLoading = ref(true)  // Indikator for at vise loading state
  const isError = ref(false)   // Indikator for fejl

  // Funktion til at hente opgaver
  async function fetchTasks() {
    const auth = getAuth()

    // Tjek om brugeren er logget ind
    const currentUser = auth.currentUser
    if (!currentUser) {
      console.error("Ingen bruger er logget ind.")
      isError.value = true
      isLoading.value = false
      return
    }

    const uid = currentUser.uid

    try {
      // Hent opgaverne fra Firebase
      const querySnapshot = await getDocs(collection(db, 'ScheduleForm'))
      tasks.value = querySnapshot.docs
        .filter(doc => doc.data().uid === uid) // Filtrer opgaver efter brugerens UID
        .map(doc => {
          const data = doc.data()

          return {
            id: doc.id,
            title: data.title || '',
            deadline: data.deadline || '',
            status: data.status || '',
            createdAt: data.createdAt?.toDate() || null,
            errorComment: data.errorComment || '',
            errorStatus: data.errorStatus || '',
            systemComment: data.systemComment || '',
            systemStatus: data.systemStatus || '',
            uid: data.uid || ''
          }
        })

      console.log('Tasks hentet:', tasks.value)
      isLoading.value = false  // Når opgaverne er hentet, stop loading
    } catch (err) {
      console.error("Fejl ved hentning af tasks:", err)
      isError.value = true
      isLoading.value = false
    }
  }

  // Start opgaven hentning, når komponenten monteres
  onMounted(() => {
    fetchTasks()
  })

  // Returner opgaver og tilstande
  return {
    tasks,
    isLoading,
    isError,
    fetchTasks
  }
})
