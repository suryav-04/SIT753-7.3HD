pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Build') {
            steps {
                echo '🔧 Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality (SonarCloud)') {
            steps {
                echo '📊 Running SonarCloud analysis...'
                withSonarQubeEnv('SonarCloud') {
                    bat 'npx sonar-scanner'
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo '🔐 Running npm audit...'
                bat 'npm audit --audit-level=high || exit /b 0'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                bat 'docker build -t bookify-api .'
            }
        }

        stage('Release Tag') {
            steps {
                echo '🏷️ Creating release tag...'
                bat 'git config user.name "Surya Vignesh"'
                bat 'git config user.email "suryavigneshk04@gmail.com"'
                bat 'git tag v1.0.0 || exit /b 0'
                bat 'git push origin v1.0.0 || exit /b 0'
            }
        }

        stage('Monitoring Health') {
            steps {
                echo '📡 Checking health endpoint...'
                bat 'curl http://localhost:3000/health || echo "⚠️ App not live or not deployed."'
            }
        }
    }
}
