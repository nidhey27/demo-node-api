pipeline {
    agent any
    environment {
        imagename = "nidhey27/demo-node-app"
        registryCredential = 'dockerhub_cred'
        dockerImage = ''
    }

    stages {
        stage('Cloning Git') {
            steps {
            //   script{
            //       sh 'git --version'
            //       sh 'docker --version'
            //       sh 'docker images'
            //       sh 'docker ps'
                   
            //   }
            
            git([url: 'https://github.com/nidhey27/demo-node-api.git', branch: 'main', credentialsId: '	git_cred'])
            sh 'pwd'
            sh 'ls'
            }
        }
        stage('Building image') {
          steps{
            script {
              dockerImage = docker.build imagename
            }
          }
        }
        stage('Deploy Image') {
          steps{
            script {
              docker.withRegistry( '', registryCredential ) {
                dockerImage.push("$BUILD_NUMBER")
                 dockerImage.push('latest')
    
              }
            }
          }
        }
        stage('Remove Unused docker image') {
          steps{
            sh "docker rmi $imagename:$BUILD_NUMBER"
              sh "docker rmi $imagename:latest"
    
          }
        }
        // 	ssh_awsec2_secret
        stage('Deployment') {
          steps{
            script{
              sshagent(credentials : ['ssh_awsec2_secret']){
                // sh "docker run -d $imagename:$BUILD_NUMBER"
                // sh "docker ps"
                // sh "docker images"
                sh "hostname -I"
                // 
              }
            }
          }
        }
    }
}