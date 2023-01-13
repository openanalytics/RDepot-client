import { Repository } from '@/models';
import { defineStore } from 'pinia'

interface State {
  repository: Repository | null,
  packages: File[]
}

export const useSubmissionState = defineStore('submission_store', {
  state: (): State => {
    return {
      repository: null,
      packages: []
    }
  },
  actions: {
    setRepository(payload: Repository) {
      this.repository = payload
    },
    setPackages(payload: File[]){
      this.packages = payload
    },
    addPackage(payload: File){
      this.packages = [...this.packages, payload]
    },
    addPackages(payload: File[]){
      payload.forEach((packageBag: File) => {
        this.packages = [...this.packages, packageBag]
      })
    }
  }
}) 