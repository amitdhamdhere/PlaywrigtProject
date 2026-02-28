pipeline {
    agent any

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

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t playwright-project .'
            }
        }

        stage('Run Tests Inside Docker') {
            steps {
                bat """
                docker run --rm ^
                -e TEST_ENV=%TEST_ENV% ^
                -e BROWSER=%BROWSER% ^
                -e HEADLESS=%HEADLESS% ^
                -v %cd%\\reports:/app/reports ^
                playwright-project
                """
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