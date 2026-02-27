pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-jammy'
            args '-v $WORKSPACE:/app -w /app'
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
                sh 'npm install'
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

        stage('Deploy to QA') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                echo 'Deploying to QA...'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**/*.*', fingerprint: true

            cucumber buildStatus: 'SUCCESS',
                     fileIncludePattern: 'cucumber-report.json',
                     jsonReportDirectory: 'reports'
        }
    }
}