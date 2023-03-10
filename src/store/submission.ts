import { Repository } from '@/models/repositories/Repository'
import { EntityModelSubmissionDto } from '@/openapi'
import { defineStore } from 'pinia'
import submissions from '@/tmpLists/rSubmissions.json'
import { SubmissionsFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'

interface State {
  repository: Repository | null
  packages: File[]
  submissions: EntityModelSubmissionDto[]
  filtration: SubmissionsFiltration
}

export const useSubmissionStore = defineStore(
  'submission_store',
  {
    state: (): State => {
      return {
        repository: null,
        packages: [],
        submissions: [],
        filtration: {
          package: '',
          state: '',
          assignedToMe: false
        }
      }
    },
    actions: {
      timeout(ms: number) {
        return new Promise((resolve) =>
          setTimeout(resolve, ms)
        )
      },
      async fetchSubmissions() {
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
      },
      async setFiltration(payload: SubmissionsFiltration) {
        this.filtration = payload
        await this.fetchSubmissions()
        await this.timeout(5000)
        notify({
          text: i18n.t('notifications.successFiltration'),
          type: 'success'
        })
      },
      clearFiltration() {
        this.filtration.state = ''
        this.filtration.assignedToMe = false
        this.filtration.package = ''
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchSubmissions()
        await this.timeout(5000)
        notify({
          text: i18n.t(
            'notifications.successFiltrationReset'
          ),
          type: 'success'
        })
      }
    }
  }
)
