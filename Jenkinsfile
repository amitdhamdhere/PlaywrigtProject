pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-jammy'
            args "-v ${WORKSPACE}:/app -w /app"
        }
    }

    parameters {
        choice(name: 'ENV', choices: ['qa', 'uat'], description: 'Environment')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser')
        choice(name: 'HEADLESS', choices: ['true', 'false'], description: 'Headless mode')
    }

    environment {
        TEST_ENV = "${params.ENV}"
        BROWSER  = "${params.BROWSER}"
        HEADLESS = "${params.HEADLESS}"
        CI = 'true'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Clean Reports') {
            steps {
                sh 'rm -rf reports || true'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm run ci'
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'reports/html',
                    reportFiles: 'index.html',
                    reportName: 'Cucumber Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**/*.*', fingerprint: true

            cucumber buildStatus: 'UNSTABLE',
                     fileIncludePattern: 'cucumber-report.json',
                     jsonReportDirectory: 'reports'
        }
    }
}