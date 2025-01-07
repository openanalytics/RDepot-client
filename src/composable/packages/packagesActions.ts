/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import { usePackagesStore } from '@/store/options/packages'
import { useCommonStore } from '@/store/options/common'
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { EntityModelPackageDto } from '@/openapi'

export function usePackagesActions() {
  const packagesStore = usePackagesStore()
  const commonStore = useCommonStore()

  function openDeletePackagesModal() {
    packagesStore.packagesToDelete =
      packagesStore.packagesSelected

    commonStore.overlayText = i18n.t(
      'common.deleteResourcesQuestion',
      {
        resource_type_plural: i18n
          .t('common.packages')
          .toLocaleLowerCase()
      }
    )
    commonStore.openOverlay(OverlayEnum.enum.Delete)
  }

  function isPending(
    packageBag: EntityModelPackageDto
  ): boolean {
    return !!packagesStore.pending.find(
      (item) => packageBag.id == item.id
    )
  }

  return {
    isPending,
    openDeletePackagesModal
  }
}
