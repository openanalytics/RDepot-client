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
    NS = 'openanalytics'
    DOCKER_BUILDKIT = '1'
  }
  stages {
    stage('Prepare environment') {
      steps {
        script {
          env.VERSION = sh(returnStdout: true, script: 'node -p "require(\"./package.json\").version"').trim()
          if (env.BRANCH_NAME == 'develop') {
            env.TAG = "${env.VERSION}-SNAPSHOT"
          } else {
            env.TAG = "${env.VERSION}"
          }
          echo "TAG is set to ${env.TAG}"
        }
      }
    }
    stage('Install dependencies') {
      steps {
	      sh "npm install"
      }
    }
    stage('License check') {
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
    stage('Unit test') {
      steps {
        sh "npm run test:unit:once:junit"
        withChecks('UI Unit Tests') {
          junit "reports/test-report.xml"
        }
        publishHTML([
          reportDir: 'reports', reportFiles: 'test-report.html',
          reportName: 'UI Unit Tests Report',
          allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true])
      }
    }
    stage('Build') {
      steps {
        withDockerRegistry([
            credentialsId: "oa-sa-jenkins-registry",
            url: "https://registry.openanalytics.eu"]) {
          sh """
            docker build --build-arg BUILDKIT_INLINE_CACHE=1 \
                --cache-from registry.openanalytics.eu/${env.NS}/rdepot-client:${env.TAG} \
                -t registry.openanalytics.eu/${env.NS}/rdepot-client:${env.TAG} \
                -t registry.openanalytics.eu/${env.NS}/rdepot-client:latest \
                -f ./Dockerfile \
                ./
          """
        }
      }
    }
    stage('Publish') {
      when {
        anyOf {
          branch 'develop'
          branch 'master'
          branch 'main'
        }
      }
      steps {
        withDockerRegistry([
            credentialsId: "oa-sa-jenkins-registry",
            url: "https://registry.openanalytics.eu"]) {
          sh "docker push registry.openanalytics.eu/${env.NS}/rdepot-client:${env.TAG}"
          sh "docker push registry.openanalytics.eu/${env.NS}/rdepot-client:latest"
        }
      }
    }
  }
}
