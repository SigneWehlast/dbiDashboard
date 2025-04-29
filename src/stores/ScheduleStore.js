import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/configs/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const useTaskStore = defineStore('ScheduleStore', () => {
  const tasks = ref([])

  async function fetchTasks() {
    const auth = getAuth()
    const currentUser = auth.currentUser

    if (!currentUser) {
      console.error("Ingen bruger er logget ind.")
      return
    }

    const uid = currentUser.uid

    try {
      const querySnapshot = await getDocs(collection(db, 'ScheduleForm'))
      tasks.value = querySnapshot.docs
        .filter(doc => doc.data().uid === uid) // Filtrer efter brugerens UID
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
    } catch (err) {
      console.error("Fejl ved hentning af tasks:", err)
    }
  }

  return {
    tasks,
    fetchTasks
  }
})
