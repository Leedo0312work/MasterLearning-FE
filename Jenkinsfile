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

<<<<<<< HEAD
                    IMAGE_VERSION = "${PROJECT_NAME}:${CI_COMMIT_SHORT_SHA}"
=======
                    IMAGE_VERSION = "${PROJECT_NAME}:${CI_COMMIT_SHORT_SHA}_${CI_COMMIT_HASH}"

                    
>>>>>>> c0ae691b6431605d4545deafc821d8c4cf840142
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
<<<<<<< HEAD
                    withCredentials([usernamePassword(credentialsId: 'harbor-registry-user', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "docker login ${REGISTRY_URL} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
=======
                    // // Đăng nhập vào Harbor registry sử dụng credentials của Jenkins
                    // withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    //     // Đăng nhập vào Harbor
                    //     sh "docker login ${REGISTRY_URL} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"

                    //     // Push image lên Harbor registry
                    //     sh "docker push ${REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${IMAGE_VERSION}"
                    // }

                    withDockerRegistry([credentialsId: "${REGISTRY_CREDENTIALS}", url: "https://${REGISTRY_URL}"]) {
                        sh "docker tag ${USER_PROJECT}/${PROJECT_NAME}:${IMAGE_VERSION}"
                        sh "docker push ${USER_PROJECT}/${PROJECT_NAME}:${IMAGE_VERSION}"
>>>>>>> c0ae691b6431605d4545deafc821d8c4cf840142
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
                script {
                    withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                            sh "docker login ${REGISTRY_URL} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
    
                            sh "docker tag ${IMAGE_VERSION} ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}"
                            sh "docker push ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}"
                        } 
                }
            }   
        }

        stage('deploy') {
            agent {
                label '192.168.237.105'
            }
            steps {
                script {
<<<<<<< HEAD
                    withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "docker login ${REGISTRY_URL} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        
                        sh(script: """ 
                            docker pull ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}
                            sudo su ${USER_PROJECT} -c "docker rm -f $PROJECT_NAME; docker run --name $PROJECT_NAME -dp 80:80 ${REGISTRY_URL}/${USER_PROJECT}/${IMAGE_VERSION}"
                            docker logout ${REGISTRY_URL} 
                        """, label: "")
                    }
=======
                    sh(script: """ 
                        docker pull ${USER_PROJECT}/${PROJECT_NAME}:${IMAGE_VERSION}
                        sudo su ${USER_PROJECT} -c "docker rm -f $PROJECT_NAME; docker run --name $PROJECT_NAME -dp 80:80 ${REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${IMAGE_VERSION}"
                    """, label: "")
>>>>>>> c0ae691b6431605d4545deafc821d8c4cf840142
                }
            }
        }

    }
}
