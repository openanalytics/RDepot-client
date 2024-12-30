/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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

import { i18n } from '@/plugins/i18n'
import {
  EntityModelPythonPackageDto,
  EntityModelRPackageDto
} from '@/openapi'
import Icons from '@/maps/Icons'
import { Technologies } from '@/enum/Technologies'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { computed, ref } from 'vue'
import { Property } from '@/models/Property'

export function usePackageProperties() {
  const packageDetailsStore = usePackageDetailsStore()
  const submission = ref(packageDetailsStore.submission)
  const packageBag = computed<EntityModelRPackageDto>(
    () =>
      packageDetailsStore.packageBag as EntityModelRPackageDto
  )

  const pythonPackageProperties = computed(() => {
    let props: Property[] = []
    const localPackage =
      packageDetailsStore.packageBag as EntityModelPythonPackageDto
    if (
      localPackage.technology == Technologies.Values.Python
    ) {
      props = [
        {
          id: 'package-property-platform',
          key: i18n.t('packageDetails.props.platform'),
          value: localPackage.platform
        },
        {
          id: 'package-property-project-url',
          key: i18n.t('packageDetails.props.projectUrl'),
          value: localPackage.projectUrl
        },
        {
          id: 'package-property-provides-extra',
          key: i18n.t('packageDetails.props.providesExtra'),
          value: localPackage.providesExtra
        },
        {
          id: 'package-property-requires-distribution',
          key: i18n.t('packageDetails.props.requiresDist'),
          value: localPackage.requiresDist
        },
        {
          id: 'package-property-requires-external',
          key: i18n.t(
            'packageDetails.props.requiresExternal'
          ),
          value: localPackage.requiresExternal
        },
        {
          id: 'package-property-requires-python',
          key: i18n.t(
            'packageDetails.props.requiresPython'
          ),
          value: localPackage.requiresPython
        },
        {
          id: 'package-property-hash',
          key: i18n.t('packageDetails.props.hash'),
          value: localPackage?.hash,
          copyable: true,
          appendIcon: Icons.get('copy'),
          appendIconTooltip: localPackage?.hash,
          breakLine: 'anywhere'
        }
      ]
    }
    return props
  })

  const rPackageProperties = computed(() => {
    let props: Property[] = []
    const localPackage =
      packageDetailsStore.packageBag as EntityModelRPackageDto
    if (localPackage.technology == Technologies.Values.R) {
      props = [
        {
          id: 'package-property-system-requirements',
          key: i18n.t(
            'packageDetails.props.systemRequirements'
          ),
          value: localPackage.systemRequirements
        },
        {
          id: 'package-property-depends',
          key: i18n.t('packageDetails.props.depends'),
          value: localPackage.depends
        },
        {
          id: 'package-property-imports',
          key: i18n.t('packageDetails.props.imports'),
          value: localPackage.imports
        },
        {
          id: 'package-property-suggests',
          key: i18n.t('packageDetails.props.suggests'),
          value: localPackage.suggests
        },
        {
          id: 'package-property-url',
          key: i18n.t('packageDetails.props.url'),
          value: localPackage.url
        },
        {
          id: 'package-property-md5sum',
          key: i18n.t('packageDetails.props.md5sum'),
          value: localPackage.md5sum,
          copyable: true,
          appendIcon: Icons.get('copy'),
          appendIconTooltip: localPackage.md5sum,
          breakLine: 'anywhere'
        }
      ]
    }
    return props
  })

  const usersList = computed(() => {
    return [
      {
        id: 'package-property-author',
        key: i18n.t('packageDetails.props.author'),
        value: packageBag.value.author
      },
      {
        id: 'package-property-submitter',
        key: i18n.t('packageDetails.props.submitter'),
        appendIcon: Icons.get('email'),
        value: submission.value?.submitter?.name,
        appendIconTooltip:
          submission.value?.submitter?.email,
        copyable: true
      },
      {
        id: 'package-property-approver',
        key: i18n.t('packageDetails.props.approver'),
        appendIcon: Icons.get('email'),
        value: submission.value?.approver?.name,
        appendIconTooltip:
          submission.value?.approver?.email,
        copyable: true
      },
      {
        id: 'package-property-maintainer',
        key: i18n.t('packageDetails.props.maintainer'),
        value: packageBag.value?.user?.name,
        appendIcon: Icons.get('email'),
        appendIconTooltip: packageBag.value?.user?.email,
        copyable: true
      }
    ] as Property[]
  })

  const filesList = computed(() => {
    let rFiles: Property[] = []
    if (packageDetailsStore.vignettes) {
      rFiles = packageDetailsStore.vignettes.map(
        (vignette) => {
          return {
            id: `package-property-vignette-${vignette.fileName}`,
            key:
              vignette.title ||
              i18n.t(
                'packageDetails.noVignetteNameProvided'
              ),
            hideValue: true,
            iconSlotName: vignette.title,
            appendIcon: Icons.get('download'),
            appendIconTooltip: i18n.t('action.download')
          }
        }
      )
    }
    if (
      packageBag.value.technology == Technologies.Values.R
    ) {
      rFiles.push({
        id: 'package-property-manual',
        key: i18n.t('packageDetails.props.manual'),
        hideValue: true,
        appendIcon: Icons.get('download'),
        appendIconTooltip: i18n.t('action.download')
      })
    }

    return [
      {
        id: 'package-property-source-file',
        key: i18n.t('packageDetails.props.sourceFile'),
        hideValue: true,
        appendIcon: Icons.get('download'),
        appendIconTooltip: i18n.t('action.download')
      },
      ...rFiles
    ] as Property[]
  })

  const booleanList = computed(() => {
    return [
      {
        id: 'package-property-active',
        key: i18n.t('packageDetails.props.active'),
        hideValue: true,
        appendIcon: packageBag.value.active
          ? Icons.get('check')
          : Icons.get('close'),
        appendIconColor: packageBag.value.active
          ? 'oablue'
          : 'oared'
      },
      {
        id: 'package-property-deleted',
        key: i18n.t('packageDetails.props.deleted'),
        hideValue: true,
        appendIcon: packageBag.value.deleted
          ? Icons.get('check')
          : Icons.get('close'),
        appendIconColor: packageBag.value.deleted
          ? 'oablue'
          : 'oared'
      },
      {
        id: 'package-property-binary',
        key: i18n.t('packageDetails.props.binary'),
        hideValue: true,
        appendIcon: packageBag.value.binary
          ? Icons.get('check')
          : Icons.get('close'),
        appendIconColor: packageBag.value.binary
          ? 'oablue'
          : 'oared'
      },
      {
        id: 'package-property-needs-compilation',
        key: i18n.t(
          'packageDetails.props.needsCompilation'
        ),
        hideValue: true,
        appendIcon: packageBag.value.needsCompilation
          ? Icons.get('check')
          : Icons.get('close'),
        appendIconColor: packageBag.value.needsCompilation
          ? 'oablue'
          : 'oared'
      }
    ] as Property[]
  })

  return {
    pythonPackageProperties,
    rPackageProperties,
    usersList,
    filesList,
    booleanList
  }
}
