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
envs.append('PROJECT_NAME=' + projectName + '\n')

##DB host
dbHost = raw_input("     > Please enter your DB Host (Enter for default: localhost): ")
if(dbHost == ''):
    dbHost = 'localhost'
envs.append('DB_HOST=' + dbHost + '\n')

##DB username
dbUsername = raw_input("     > Please enter your DB username(Enter for default: postgres): ")
if(dbUsername == ''):
    dbUsername = 'postgres'
envs.append('DB_USER=' + dbUsername + '\n')

##DB password
dbPassword = raw_input("     > Please enter your DB password(Enter for default: none): ")
if(dbPassword == ''):
    dbPassword = ''
envs.append('DB_PASSWORD=' + dbPassword + '\n')

##DB port
dbPort = raw_input("     > Please enter your DB port(Enter for default: 5432): ")
if(dbPort == ''):
    dbPort = '5432'
envs.append('DB_PORT=' + dbPort + '\n')

##DB dev name
dbDevName = raw_input("     > Please enter your DB DEV database name (Enter for default: " + projectName +"_dev):")
if(dbDevName == ''):
    dbDevName = projectName + "_dev"
envs.append('DB_NAME_DEV=' + dbDevName + '\n')


##DB test name
dbTestName = raw_input("     > Please enter your DB TEST database name (Enter for default: " + projectName +"_test): ")
if(dbTestName == ''):
    dbTestName = projectName + "_test"
envs.append('DB_NAME_TEST=' + dbTestName + '\n')


##DB prod name
dbProdName = raw_input("     > Please enter your DB PRODUCTION database name (Enter for default: " + projectName +"_prod): ")
if(dbProdName == ''):
    dbProdName = projectName + "_prod"
envs.append('DB_NAME_PROD=' + dbProdName + '\n')


##Server IP
serverIp = raw_input("     > Please enter your server IP (Enter for default: localhost): ")
if(serverIp == ''):
    serverIp = 'localhost'
envs.append('SERVER_IP=' + serverIp + '\n')

##Server port
serverPort = raw_input("     > Please enter your server PORT (Enter for default: 3030): ")
if(serverPort == ''):
    serverPort = '3030'
envs.append('SERVER_PORT=' + serverPort + '\n')


##Server default email
serverDefaultEmail = raw_input("     > Please enter your server default email (Enter for default:  no-reply@"+projectName+".com): ")
if(serverDefaultEmail == ''):
    serverDefaultEmail = "no-reply@" + projectName +".com"
envs.append('DEFAULT_EMAIL_ALIAS=' + serverDefaultEmail + '\n')

##Server SENDGRID key 
serverSendgridKey = raw_input("     > Please enter your Sendgrid API Secret  (Enter for default: none):")
if(serverSendgridKey == ''):
    serverSendgridKey = 'NONE'
envs.append('SENDGRID_KEY=' + serverSendgridKey + '\n')

##BD Server Logging
serverLog = raw_input("     > Want to see BD queries on server log(Enter for default: true):")
if(serverLog == ''):
    serverLog = 'true'
envs.append('DB_LOG=' + serverLog + '\n')


##API_ROOT SERVER
apiRoot = raw_input("     > Which is your API ROOT, this will be added as example for localhost:3000/myapiroot/myspecificentityapi (Enter for default: '/api'):")
if(apiRoot == ''):
    apiRoot = '/api'


##Server JWT Secret
serverJwt = raw_input("     > Which is your JWT key this will be encode to base64 string (Enter for default: jwtsecret):")
if(serverJwt == ''):
    serverJwt = 'jwtsecret'
serverJwt = serverJwt + serverJwt + serverJwt + '12345678910'+'abcdefghij' 
serverJwt = serverJwt.encode('ascii')
serverJwt = base64.b64encode(serverJwt)
envs.append('JWT_SECRET=' + serverJwt + '\n')

##Server Master Secret
serverMasterSecret = raw_input("     > Which is your Master key this will be encode to base64 string (Enter for default: mymasterkey):")
if(serverMasterSecret == ''):
    serverMasterSecret = 'mymasterkey'
serverMasterSecret = serverMasterSecret + serverMasterSecret + serverMasterSecret + '12345678910'+'abcdefghij' 
serverMasterSecret = serverMasterSecret.encode('ascii')
serverMasterSecret = base64.b64encode( serverMasterSecret )
envs.append('MASTER_KEY=' + serverMasterSecret + '\n')
envs.append('API_ROOT=' + apiRoot + '\n')

finalPath = os.getcwd()
finalPath = finalPath.split('/node_modules/nodejsamazingenerator')
finalPath = finalPath[0]

print "[POST INSTALL] Saving .env file to path: " + finalPath + '/.env'
with open(finalPath + '/.env', 'w') as the_file:
    the_file.write("".join(envs))
    the_file.close()
    done = True

print "Getting from CLI vars to set .env file :) on devw"


newFileContent = list()
done = False
packageTemplatePath = finalPath + '/generator/templates/package.template'
finalPackagePath = finalPath + '/package.json'
f = open(packageTemplatePath, 'r')
for line in f:
    if ( '$projectname$' in line ):
        newFileContent.append(string.replace(line, '$projectname$', projectName))
    elif ( '-d mydbname -h myhost -u mydbuser -p 5432 -x mydbpassword' in line):
        stringToReplace = '-d mydbname -h myhost -u mydbuser -p 5432 -x mydbpassword'
        stringToReplacyBy = '-d ' + dbDevName + ' -h ' + dbHost + ' -u ' + dbUsername + ' -p ' + dbPort + ' -x ' + dbPassword
        finalStringToReplace = string.replace(line, stringToReplace, stringToReplacyBy)
        newFileContent.append(finalStringToReplace)
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(finalPackagePath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()



newFileContent = list()
done = False
apidocjsontemplate = finalPath + '/generator/templates/apidoc.template'
finalApidocpath = finalPath + '/apidoc.json'
f = open(apidocjsontemplate, 'r')
for line in f:
    if ( '$projectname$' in line ):
        newFileContent.append(string.replace(line, '$projectname$', projectName))
    elif( '$serverip$:$serverport$' in line):
        newFileContent.append(string.replace(line, '$serverip$:$serverport$', serverIp + ':' + serverPort))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(finalApidocpath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()


print WARNING + '  *******       ***********************          *******'
print OKGREEN + ' **********       ***********************          *******'
print FAIL + '************       ***********************          *******'
print HEADER +'************************************************************'
print RESET

