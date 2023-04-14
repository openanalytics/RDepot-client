import {
  EntityModelRepositoryDto,
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { defineStore } from 'pinia'
import { SubmissionsFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { useLoggedUserStore } from './logged_user'
import {
  fetchRSubmissions,
  updateSubmission,
  updateSubmissionState
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
        const [submission, pageData] =
          await fetchRSubmissions(
            this.filtration,
            logged_user.userId,
            pagination.page,
            pagination.pageSize
          )
        this.submissions = submission
        pagination.setTotalNumber(pageData.totalNumber)
        pagination.setPage(pageData.page)
      },
      async updateSubmissionState(
        submission: EntityModelSubmissionDto,
        state: EntityModelSubmissionDtoStateEnum,
        textNotification: string
      ) {
        await updateSubmissionState(
          submission,
          state,
          textNotification
        ).then((success) => {
          if (success) this.fetchSubmissions()
        })
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
      async setPage(payload: number) {
        const pagination = usePaginationStore()
        pagination.setPage(payload)
        this.fetchSubmissions()
      },
      async setPageSize(payload: number) {
        const pagination = usePaginationStore()
        pagination.setPageSize(payload)
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
      }
    }
  }
)
