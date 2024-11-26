pipeline {
    agent none
    environment {
        USER_PROJECT = "masterlearning"
        CI_CIMMIT_SHORT_SHA = ""
        CI_COMMIT_TAG = ""
        CI_PROJECT_NAME = ""
        IMAGE_VERSION = ""

        REGISTRY_URL = "registry.leedowork.id.vn"  // Địa chỉ registry của Harbor
        REGISTRY_CREDENTIALS = "harbor-registry-user"  // Jenkins credentials ID chứa thông tin đăng nhập vào Harbor
        
    }
    stages {
        stage('get information project') {
            agent {
                label '192.168.237.103'
            }
            steps {
                script {
                    CI_PROJECT_NAME = sh(script: "git config --get remote.origin.url | sed 's/.*\\(\\/\\([a-zA-Z0-9_-]*\\)\\.git\\)/\\2/'", returnStdout: true).trim()

                    def CI_COMMIT_HASH = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    CI_COMMIT_SHORT_SHA = CI_COMMIT_HASH.take(8)

                    CI_COMMIT_TAG = sh(script: "git describe --tags --exact-match ${CI_COMMIT_HASH}", returnStdout: true).trim()

                    IMAGE_VERSION = "${CI_PROJECT_NAME}:${CI_COMMIT_SHORT_SHA}_${CI_COMMIT_TAG}"

                    
                }
            }
        }

        stage('build') {
            agent {
                label '192.168.237.103'
            }
            steps {
                script {
                    sh(script: """ docker build -t ${IMAGE_VERSION} . """, label: "")
                }
            }
        }

        stage('push to registry') {
            agent {
                label '192.168.237.103'
            }
            steps {
                script {
                    // // Đăng nhập vào Harbor registry sử dụng credentials của Jenkins
                    // withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    //     // Đăng nhập vào Harbor
                    //     sh "docker login ${REGISTRY_URL} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"

                    //     // Push image lên Harbor registry
                    //     sh "docker push ${REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${IMAGE_VERSION}"
                    // }

                    // Đăng nhập vào Harbor registry sử dụng `withDockerRegistry`
                    withDockerRegistry([credentialsId: "${REGISTRY_CREDENTIALS}", url: "https://${REGISTRY_URL}"]) {
                        // Push image lên Harbor registry
                        sh "docker tag ${USER_PROJECT}/${CI_PROJECT_NAME}:${IMAGE_VERSION}"

                        sh "docker push ${USER_PROJECT}/${CI_PROJECT_NAME}:${IMAGE_VERSION}"
                    }
                }
            }   
        }

        stage('deploy') {
            agent {
                label '192.168.237.103'
            }
            steps {
                script {
                    // Pull image từ Harbor registry về và chạy container
                    sh(script: """ 
                        docker pull ${USER_PROJECT}/${CI_PROJECT_NAME}:${IMAGE_VERSION}
                        sudo su ${USER_PROJECT} -c "docker rm -f $CI_PROJECT_NAME; docker run --name $CI_PROJECT_NAME -dp 5214:5214 ${REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${IMAGE_VERSION}"
                    """, label: "")
                }
            }
        }
    }
}
