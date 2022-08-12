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
                // docker stop $(docker ps -a -q)
                // docker rm $(docker ps -a -q)
                // sh "docker images"
                sh """ ssh -o StrictHostKeyChecking=no -l ec2-user 35.172.134.230 'docker stop $(docker ps -a -q)' """
                sh """ ssh -o StrictHostKeyChecking=no -l ec2-user 35.172.134.230 'docker rm $(docker ps -a -q)' """
                sh "ssh -o StrictHostKeyChecking=no -l ec2-user 35.172.134.230 'docker run -d -p 3000:3000 $imagename:$BUILD_NUMBER'"

                // 
              }
            }
          }
        }
    }
}