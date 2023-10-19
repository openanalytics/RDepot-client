import { useSubmissionStore } from '@/store/submission'

export function prepareAddPackageView() {
  const submissionStore = useSubmissionStore()
  submissionStore.updateStepperKey()
  submissionStore.repository = undefined
}
