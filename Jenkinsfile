pipeline {
  
  agent any
    
  tools { 
    nodejs "node"
  }
    
  stages {
        
    stage('Cloning Git') {
      steps {
        sh 'git clone https://github.com/infomediadesign/sad-april-k-2372-1855-vishalpokarne-srh.git'
      }
    }
        
    stage('Build & Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    
    stage ('start app on local') {
      steps {
        sh 'npm start'
      }
    }
  }
}