import { useCommonStore } from '@/store/common'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Common Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const common_store = useCommonStore()
    expect(common_store.progressCircularActive).toBeFalsy()
    expect(common_store.drawer).toBeTruthy()
    expect(common_store.overlayText).toBe('')
    expect(common_store.overlayOpacity).toBe(0.8)
    expect(common_store.overlayComponent).toBe(0)
    expect(common_store.key).toBe(0)
  })

  it('Edit progress circular active', () => {
    const common_store = useCommonStore()
    common_store.setProgressCircularActive(true)
    expect(common_store.progressCircularActive).toBeTruthy()
  })

  it('Edit drawer', () => {
    const common_store = useCommonStore()
    common_store.setDrawer(false)
    expect(common_store.drawer).toBeFalsy()
  })

  it('Edit overlay text', () => {
    const common_store = useCommonStore()
    common_store.setOverlayText('true')
    expect(common_store.overlayText).toBe('true')
  })

  it('Edit overlay opacity', () => {
    const common_store = useCommonStore()
    common_store.setOverlayOpacity(0.5)
    expect(common_store.overlayOpacity).toBe(0.5)
  })

  it('Edit overlay component', () => {
    const common_store = useCommonStore()
    common_store.setOverlayComponent(3)
    expect(common_store.overlayComponent).toBe(3)
  })

  it('Update key', () => {
    const common_store = useCommonStore()
    common_store.updateKey()
    expect(common_store.key).toBe(1)
  })
})
