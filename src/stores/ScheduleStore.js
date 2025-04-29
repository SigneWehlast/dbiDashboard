// src/stores/taskStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/configs/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const useTaskStore = defineStore('ScheduleStore', () => {
  const tasks = ref([])

  async function fetchTasks() {
    try {
      const querySnapshot = await getDocs(collection(db, 'ScheduleForm'))
      tasks.value = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          title: data.title || '',
          deadline: data.deadline || '',
          status: data.status || '',
          createdAt: data.createdAt?.toDate() || null,
          errorComment: data.errorComment || '',
          errorStatus: data.errorStatus || '',
          systemComment: data.systemComment || '',
          systemStatus: data.systemStatus || ''
        }
      })
      console.log(tasks.value);
    } catch (err) {
      console.error("Fejl ved hentning af tasks:", err)
    }
  }

  return {
    tasks,
    fetchTasks
  }
})
