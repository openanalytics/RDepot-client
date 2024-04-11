pipeline {
  agent {
    kubernetes {
      yamlFile 'kubernetesPod.yaml'
      defaultContainer 'rdepot-client-build'
    }
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
  }
  environment {
    VERSION = sh(returnStdout: true, script: 'node -p "require(\'./package.json\').version"').trim()
    NS = 'openanalytics'
    REGISTRY = 'registry.openanalytics.eu'
    IMAGE = 'rdepot-client'
    DOCKER_BUILDKIT = '1'
    NO_COLOR = 'true'
  }
  stages {
    stage('Prepare Environment') {
      steps {
        script {
          if (env.BRANCH_NAME == 'develop') {
            env.TAG = "${env.VERSION}-SNAPSHOT"
          } else {
            env.TAG = "${env.VERSION}"
          }
          echo "TAG is set to ${env.TAG}"
        }
      }
    }
    stage('Install Dependencies') {
      steps {
	      sh "npm install"
      }
    }
    stage('License Check') {
      steps {
	      sh "npm run license:check"
      }
    }
    stage('Linting') {
      steps {
	      sh "npm run lint:check"
        withChecks('Linting') {
          junit "reports/lint-report.xml"
        }
        publishHTML([
          reportDir: 'reports', reportFiles: 'lint-report.html',
          reportName: 'UI Linting Report',
          allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true])
        }
    }
    stage('Unit Test') {
      steps {
        sh "npm run test:unit:once:junit"
        withChecks('UI Unit Tests') {
          junit "reports/test-report.xml"
        }
    }
    stage('Build & Publish') {
      when {
        anyOf {
          branch 'develop'
          branch 'master'
          branch 'main'
        }
      }
      steps {
        container('kaniko') {
          sh """
          /kaniko/executor \
                    -v info \
                    --context ${env.WORKSPACE} \
                    --cache=true \
                    --cache-repo ${env.REGISTRY}/${env.NS}/${env.IMAGE} \
                    --destination ${env.REGISTRY}/${env.NS}/${env.IMAGE}:${env.TAG}
          """
        }
      }
    }
  }
}
