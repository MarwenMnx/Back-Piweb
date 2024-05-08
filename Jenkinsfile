pipeline {
    agent any

    environment {
        registryCredentials = "nexus"
        registry = "92.168.1.19:8087" 
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the specific branch
                git branch: 'ZoghlamiSirine', credentialsId: 'github-piweb-backend-token', url: 'https://github.com/MarwenMnx/Back-Piweb.git'
            }
        }
        stage('Install dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }
        stage('Unit Test') {
            steps {
                script {
                    // Run Jest tests
                    sh 'npx jest'
                }
            }
        }
       stage('SonarQube Analysis') {
            steps {
                script {  
                   def scannerHome = tool 'scanner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                } 
            }
        }
        stage('Build application') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
        stage('Building images (node and mongo)') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }
       stage('Deploy to Nexus') {
steps{ 
script {
docker.withRegistry("http://"+registry,
registryCredentials ) {
sh('docker push $registry/nodemongoapp:6.0 ')
}
}
}
}

stage('Run application ') {
steps{ 
script {
docker.withRegistry("http://"+registry, registryCredentials 
) {
sh('docker pull $registry/nodemongoapp:6.0 ')
sh('docker-compose up -d ')
}
}
}
}


stage("Run Prometheus"){
      steps{
 
        script{

        sh('docker start prometheus')

        }
      }
    }
     stage("Run Grafana"){ 
      steps{

        script{
        sh('docker start grafana')
        }
      }
    }
  } 

}
