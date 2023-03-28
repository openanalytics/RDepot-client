import { EntityModelSubmissionDto } from '@/openapi'
import { defineStore } from 'pinia'
import { SubmissionsFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { useLoggedUserStore } from './logged_user'
import {
  fetchRSubmissions,
  updateSubmission
} from '@/services/submission_services'

interface State {
  packages: File[]
  submissions: EntityModelSubmissionDto[]
  filtration: SubmissionsFiltration
  page?: number
  pageSize: number
  totalNumber?: number
}

export const useSubmissionStore = defineStore(
  'submission_store',
  {
    state: (): State => {
      return {
        packages: [],
        submissions: [],
        filtration: {
          packageId: undefined,
          state: undefined,
          assignedToMe: false
        },
        page: 0,
        pageSize: 10,
        totalNumber: 0
      }
    },
    actions: {
      timeout(ms: number) {
        return new Promise((resolve) =>
          setTimeout(resolve, ms)
        )
      },
      async fetchSubmissions() {
        const logged_user = useLoggedUserStore()
        fetchRSubmissions(
          this.filtration,
          logged_user.userId,
          this.page,
          this.pageSize
        ).then(
          (res) => {
            this.totalNumber =
              res.data.data?.page?.totalElements
            this.page = res.data.data?.page?.number
            this.submissions = res.data.data?.content || []
          },
          (msg) => {
            this.submissions = []
            this.page = 0
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async updateSubmission(
        submission_id: number,
        state: string,
        textNotification: string
      ) {
        updateSubmission(state, submission_id).then(
          () => {
            notify({
              type: 'success',
              text: textNotification
            })
            this.fetchSubmissions()
          },
          (msg) => {
            notify({
              type: 'error',
              text: msg
            })
          }
        )
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
        this.filtration.state = undefined
        this.filtration.assignedToMe = false
        this.filtration.packageId = undefined
      },
      async setPage(payload: number) {
        this.page = payload
        this.fetchSubmissions()
      },
      async setPageSize(payload: number) {
        if (payload > 0) {
          this.pageSize = payload
        }
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
