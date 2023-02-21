import { Repository } from '@/models'
import { EntityModelSubmissionDto } from '@/openapi'
import { defineStore } from 'pinia'
import submissions from '@/tmpLists/rSubmissions.json'

interface State {
  repository: Repository | null
  packages: File[]
  submissions: EntityModelSubmissionDto[]
}

export const useSubmissionState = defineStore(
  'submission_store',
  {
    state: (): State => {
      return {
        repository: null,
        packages: [],
        submissions: []
      }
    },
    actions: {
      fetchSubmissions() {
        this.submissions = JSON.parse(
          JSON.stringify(submissions.content)
        )
      },
      setRepository(payload: Repository) {
        this.repository = payload
      },
      setPackages(payload: File[]) {
        this.packages = payload
      },
      addPackage(payload: File) {
        this.packages = [...this.packages, payload]
      },
      addPackages(payload: File[]) {
        payload.forEach((packageBag: File) => {
          this.packages = [...this.packages, packageBag]
        })
      }
    }
  }
)
