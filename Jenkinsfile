pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh('npm install')
                }
            }
        }

        stage('Unit Test') {
            steps {
                script {
                    sh('npm test')
                }
            }
        }
    }
}
