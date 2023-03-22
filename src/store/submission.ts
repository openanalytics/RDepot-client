import { Repository } from '@/models/repositories/Repository'
import { EntityModelSubmissionDto, ResponseDtoPagedModelEntityModelSubmissionDto, RSubmissionControllerApiFactory } from '@/openapi'
import { defineStore } from 'pinia'
import submissions from '@/tmpLists/rSubmissions.json'
import { SubmissionsFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { fetchRSubmissions } from '@/services/submission_services'
import { getConfiguration } from '@/services/api_config'
import { openApiRequest } from '@/services/open_api_access'

interface State {
  repository: Repository | null
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
        repository: null,
        packages: [],
        submissions: [],
        filtration: {
          package: '',
          state: '',
          assignedToMe: false
        },
        page: 0,
        pageSize: 10,
        totalNumber: 0,
      }
    },
    actions: {
      timeout(ms: number) {
        return new Promise((resolve) =>
          setTimeout(resolve, ms)
        )
      },
      async fetchSubmissions() {
        const r_submission_api = RSubmissionControllerApiFactory(getConfiguration())
        openApiRequest<ResponseDtoPagedModelEntityModelSubmissionDto>(
            () => r_submission_api.getAllSubmissions(
              this.filtration.state,
              this.filtration.assignedToMe ? undefined : undefined, // TODO: use the id of the current user
              undefined, // TODO: add package id to filter if one is selected
              this.page,
              this.pageSize
            )
          ).then(
            (res) => {
              this.totalNumber = res.data.data?.page?.totalElements
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
