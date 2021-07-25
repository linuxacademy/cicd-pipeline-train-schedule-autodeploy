pipeline {
    agent any
    environment {
<<<<<<< HEAD
        //be sure to replace "willbla" with your own Docker Hub username
        DOCKER_IMAGE_NAME = "willbla/train-schedule"
        CANARY_REPLICAS = 0
=======
        //be sure to replace "rawi27" with your own Docker Hub username
        DOCKER_IMAGE_NAME = "rawi27/train-schedule"
>>>>>>> master
    }
    stages {
        stage('BUild') {
            steps {
                echo 'Running build automation'
                sh './gradlew build --no-daemon'
                archiveArtifacts artifacts: 'dist/trainSchedule.zip'
            }
        }
        stage('Build Docker Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME)
                    app.inside {
                        sh 'echo Hello, World!'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_login') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('CanaryDeploy') {
            when {
                branch 'master'
            }
            environment { 
                CANARY_REPLICAS = 1
            }
            steps {
                kubernetesDeploy(
                    kubeconfigId: 'kubeconfig',
                    configs: 'train-schedule-kube-canary.yml',
                    enableConfigSubstitution: true
                )
            }
        }
        stage('SmokeTest') {
            when {
                branch 'master'
            }
            steps {
                script {
                    sleep (time: 5)
                    def response = httpRequest (
                        url: "http://$KUBE_MASTER_IP:8081/",
                        timeout: 30
                    )
                    if (response.status != 200) {
                        error("Smoke test against canary deployment failed.")
                    }
                }
            }
        }
        stage('DeployToProduction') {
            when {
                branch 'master'
            }
            steps {
                milestone(1)
                kubernetesDeploy(
                    kubeconfigId: 'kubeconfig',
                    configs: 'train-schedule-kube.yml',
                    enableConfigSubstitution: true
                )
            }
        }
    }
<<<<<<< HEAD
    post {
        cleanup {
            kubernetesDeploy (
                kubeconfigId: 'kubeconfig',
                configs: 'train-schedule-kube-canary.yml',
                enableConfigSubstitution: true
            )
        }
    }
=======
>>>>>>> master
}
