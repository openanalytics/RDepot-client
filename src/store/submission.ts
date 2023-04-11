import {
  EntityModelRepositoryDto,
  EntityModelSubmissionDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { SubmissionsFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { useLoggedUserStore } from './logged_user'
import {
  addSumbission,
  fetchRSubmissions,
  updateSubmission
} from '@/services/submission_services'
import { usePaginationStore } from '@/store/pagination'
import { useObjectActions } from '@/composable/objectActions'

interface State {
  packages: File[]
  repository?: EntityModelRepositoryDto
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
        repository: undefined,
        filtration: {
          package: undefined,
          state: undefined,
          assignedToMe: undefined
        },
        page: 0,
        pageSize: 10,
        totalNumber: 0
      }
    },
    actions: {
      async fetchSubmissions() {
        const logged_user = useLoggedUserStore()
        const pagination = usePaginationStore()
        await fetchRSubmissions(
          this.filtration,
          logged_user.userId,
          pagination.page,
          pagination.pageSize
        ).then(
          (res) => {
            this.submissions = res.data.data?.content || []
            pagination.setTotalNumber(
              res.data.data?.page?.totalElements || 0
            )
            pagination.setPage(
              res.data.data?.page?.number || 0
            )
          },
          (msg) => {
            this.submissions = []
            pagination.setPage(0)
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async updateSubmission(
        submission_id: number,
        state: string,
        textNotification: string
      ) {
        return updateSubmission(state, submission_id).then(
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
      async setRepository(
        payload: EntityModelRepositoryDto
      ) {
        this.repository = payload
      },
      async setFiltration(payload: SubmissionsFiltration) {
        const pagination = usePaginationStore()
        pagination.setPageSize(0)
        this.filtration = payload
        await this.fetchSubmissions()
        notify({
          text: i18n.t('notifications.successFiltration'),
          type: 'success'
        })
      },
      clearFiltration() {
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchSubmissions()
        notify({
          text: i18n.t(
            'notifications.successFiltrationReset'
          ),
          type: 'success'
        })
      },
      async addSumbissionRequests() {
        const promises: Promise<[boolean, string]>[] =
          this.packages.map((packageBag) =>
            addSumbission(
              this.repository?.name!,
              packageBag
            ).then(
              () => [true, ''],
              (msg) => [false, msg]
            )
          )
        await Promise.all(promises)
        var fulfilled = 0
        promises.forEach(async (promise) => {
          const [isFulfilled, msg] = await promise
          if (fulfilled == 0 && isFulfilled) {
            notify({
              type: 'success',
              text: i18n.t('notifications.success')
            })
            fulfilled += 1
          } else if (!isFulfilled) {
            notify({
              type: 'error',
              text: msg
            })
          }
        })
      }
    }
  }
)
