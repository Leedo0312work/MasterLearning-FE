pipeline {
    agent none
    environment {
        USER_PROJECT = "masterlearning"
        PROJECT_NAME = "masterlearning-fe"
        CI_CIMMIT_SHORT_SHA = ""
        CI_PROJECT_NAME = ""
        IMAGE_VERSION = ""

        REGISTRY_URL = "registry.leedowork.id.vn"
        REGISTRY_CREDENTIALS = "harbor-registry-user"  
        
    }
    stages {
        stage('get information project') {
            agent {
                label '192.168.237.105'
            }
            steps {
                script {
                    CI_PROJECT_NAME = sh(script: "git config --get remote.origin.url | sed 's/.*\\(\\/\\([a-zA-Z0-9_-]*\\)\\.git\\)/\\2/'", returnStdout: true).trim()

                    def CI_COMMIT_HASH = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    CI_COMMIT_SHORT_SHA = CI_COMMIT_HASH.take(8)

                    IMAGE_VERSION = "${PROJECT_NAME}:${CI_COMMIT_SHORT_SHA}"
                }
            }
        }

        stage('build') {
            agent {
                label '192.168.237.105'
            }
            steps {
                script {
                    sh(script: """ docker build -t ${IMAGE_VERSION} . """, label: "")
                }
            }
        }

        stage('login to Harbor registry') {
            agent {
                label '192.168.237.105'
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'harbor-registry-user', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "docker login ${REGISTRY_URL} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    }
                }
            }
        }

        stage('push to registry') {
            agent {
                label '192.168.237.105'
            }
            steps {
                // script {
                //     withDockerRegistry(credentialsId: 'harbor-registry-user', url: 'https://registry.leedowork.id.vn/') {
                //         sh "docker tag ${IMAGE_VERSION} ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}"
                //         sh "docker push ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}"
                //     } 
                // }
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "docker login ${REGISTRY_URL} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"

                        sh "docker tag ${IMAGE_VERSION} ${USER_PROJECT}/${IMAGE_VERSION}"
                        sh "docker push ${USER_PROJECT}/${IMAGE_VERSION}"
                    } 
            }   
        }

        stage('deploy') {
            agent {
                label '192.168.237.105'
            }
            steps {
                script {
                    sh(script: """ 
                        docker pull ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}
                        sudo su ${USER_PROJECT} -c "docker rm -f $PROJECT_NAME; docker run --name $PROJECT_NAME -dp 80:80 ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}"
                        docker logout ${REGISTRY_URL}
                    """, label: "")
                }
            }
        }

    }
}
