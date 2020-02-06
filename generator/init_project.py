import sys, os, struct
import string
import base64
##
## Some fancy stuff for generator :) AHP
##
WARNING = '\033[93m'
OKGREEN = '\033[92m'
FAIL = '\033[91m'
BOLD = '\033[1m'
HEADER = '\033[95m'
RESET = '\033[0m'
print HEADER +'************************************************************'
print FAIL + '************       ***********************          *******'
print OKGREEN + ' **********       ***********************          *******'
print WARNING + '  *******       ***********************          *******'
print RESET + '     Generator: '
envs = []

##Project name
projectName = raw_input("     > Which is your project name (Enter for default: myproject): ")
if(projectName == ''):
    projectName = 'myproject'
envs.append('PROJECT_NAME=' + projectName)

##DB host
dbHost = raw_input("     > Please enter your DB Host (Enter for default: localhost): ")
if(dbHost == ''):
    dbHost = 'localhost'
envs.append('DB_HOST=' + dbHost)

##DB username
dbUsername = raw_input("     > Please enter your DB username(Enter for default: postgres): ")
if(dbUsername == ''):
    dbUsername = 'postgres'
envs.append('DB_USER=' + dbUsername)

##DB password
dbPassword = raw_input("     > Please enter your DB password(Enter for default: none): ")
if(dbPassword == ''):
    dbPassword = ''
envs.append('DB_PASSWORD=' + dbPassword)

##DB port
dbPort = raw_input("     > Please enter your DB port(Enter for default: 5432): ")
if(dbPort == ''):
    dbPort = '5432'
envs.append('DB_PORT=' + dbPort)

##DB dev name
dbDevName = raw_input("     > Please enter your DB DEV database name (Enter for default: " + projectName +"_dev):")
if(dbDevName == ''):
    dbDevName = projectName + "_dev"
envs.append('DB_NAME_DEV=' + dbDevName)


##DB test name
dbTestName = raw_input("     > Please enter your DB TEST database name (Enter for default: " + projectName +"_test): ")
if(dbTestName == ''):
    dbTestName = projectName + "_test"
envs.append('DB_NAME_TEST=' + dbTestName)


##DB prod name
dbProdName = raw_input("     > Please enter your DB PRODUCTION database name (Enter for default: " + projectName +"_prod): ")
if(dbProdName == ''):
    dbProdName = projectName + "_prod"
envs.append('DB_NAME_PROD=' + dbProdName)


##Server IP
serverIp = raw_input("     > Please enter your server IP (Enter for default: localhost): ")
if(serverIp == ''):
    serverIp = 'localhost'
envs.append('SERVER_IP=' + serverIp)

##Server port
serverPort = raw_input("     > Please enter your server PORT (Enter for default: 3030): ")
if(serverPort == ''):
    serverPort = '3030'
envs.append('SERVER_PORT=' + serverPort)


##Server default email
serverDefaultEmail = raw_input("     > Please enter your server default email (Enter for default:  no-reply@"+projectName+".com): ")
if(serverDefaultEmail == ''):
    serverDefaultEmail = "no-reply@" + projectName +".com): "
envs.append('DEFAULT_EMAIL_ALIAS=' + serverDefaultEmail)

##Server SENDGRID key 
serverSendgridKey = raw_input("     > Please enter your Sendgrid API Secret  (Enter for default: none")
if(serverSendgridKey == ''):
    serverSendgridKey = ''
envs.append('SENDGRID_KEY=' + serverSendgridKey)

##Server Logging
serverLog = raw_input("     >  Want to log server(Enter for default: true")
if(serverLog == ''):
    serverLog = 'true'
envs.append('DB_USER=' + serverLog)

##Server JWT Secret
serverJwt = raw_input("     >  Which is your JWT key this will be encode to base64 string (Enter for default: jwtsecret")
if(serverJwt == ''):
    serverJwt = 'jwtsecret'
envs.append('JWT_SECRET=' + serverJwt)

##Server Master Secret
serverMasterSecret = raw_input("     >  Which is your Master key this will be encode to base64 string (Enter for default: mymasterkey")
if(serverMasterSecret == ''):
    serverMasterSecret = 'mymasterkey'

serverMasterSecret = serverMasterSecret.encode('ascii')
serverMasterSecret = base64.b64encode(serverMasterSecret)

envs.append('MASTER_KEY=' + serverMasterSecret)

print "".join(envs)


print "Getting from CLI vars to set .env file :) on devw"


print WARNING + '  *******       ***********************          *******'
print OKGREEN + ' **********       ***********************          *******'
print FAIL + '************       ***********************          *******'
print HEADER +'************************************************************'
print RESET