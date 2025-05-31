pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')  // Add this secret in Jenkins
    }

    stages {

        stage('Build') {
            steps {
                echo '🔧 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running unit tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality (SonarCloud)') {
            steps {
                echo '📊 Running SonarCloud analysis...'
                withSonarQubeEnv('SonarCloud') {
                    sh 'npx sonar-scanner'
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo '🔐 Running npm audit...'
                sh 'npm audit --audit-level=high || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh 'docker build -t bookify-api .'
            }
        }

        stage('Release Tag') {
            steps {
                echo '🏷️ Creating release tag...'
                sh 'git config user.name "Surya Vignesh"'
                sh 'git config user.email "suryavigneshk04@gmail.com"'
                sh 'git tag v1.0.0 || true'
                sh 'git push origin v1.0.0 || true'
            }
        }

        stage('Monitoring Health') {
            steps {
                echo '📡 Checking health endpoint...'
                sh 'curl --fail http://localhost:3000/health || echo "⚠️ App not live or not deployed."'
            }
        }
    }
}
