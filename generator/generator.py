import sys, os, struct
from listdirmaker import listDirMaker
import string


print "ASDASDASDASDASDASD"
##
## Some fancy stuff for generator :) AHP
##
WARNING = '\033[93m'
OKGREEN = '\033[92m'
FAIL = '\033[91m'
BOLD = '\033[1m'
HEADER = '\033[95m'
RESET = '\033[0m'
modelname=sys.argv[2]
apipath=sys.argv[4]
print HEADER +'************************************************************'
print FAIL + '************       ***********************          *******'
print OKGREEN + ' **********       ***********************          *******'
print WARNING + '  *******       ***********************          *******'
print RESET + '     Generator: '
print '      * Model name: ',modelname
print '      * API Path: ',apipath


##
## Templates loading
##
dirpath = os.getcwd()
migrationTemplatePath = str(dirpath + '/generator/templates/migration.template')
seedTemplatePath = str(dirpath + '/generator/templates/seed.template')
controllerTemplatePath = str(dirpath + '/generator/templates/controller.template')
modelTemplatePath = str(dirpath + '/generator/templates/model.template')
indexTemplatePath = str(dirpath + '/generator/templates/index.template')
routeTemplatePath = str(dirpath + '/generator/templates/route.template')
importTemplatePath = str(dirpath + '/generator/templates/import.template')
factoryTemplatePath = str(dirpath + '/generator/templates/factory.template')


print RESET + '      * Dir path: ',dirpath

##
## With listDirMaker class we can iterate trhough inside of directory, and find migrations
## to match with the modelname receive from npm run
##
migrationPath = str(dirpath + '/../migrations').split('../')
migrationPath = "".join(migrationPath)
totalArchivos = listDirMaker(migrationPath).getdirList()
for indice in range(len(totalArchivos)):
    pathArray = totalArchivos[indice].split('/')
    migrationName = pathArray[ len( pathArray ) - 1]
    if (modelname in migrationName):
        migrationPath = migrationPath + "/" + migrationName
        break

print RESET + '      * Migration path: ',migrationPath


##
## Now deal with .models bug at migration, opening file, catching bug and replacing it by model name
##
newFileContent = list()
done = False
f = open(migrationTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        newFileContent.append(string.replace(line, '$modelname$', modelname))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(migrationPath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()
print OKGREEN + '      * Migration corrected (ES6): ' + str(done)







##
## With listDirMaker class we can iterate trhough inside of directory, and find migrations
## to match with the modelname receive from npm run
##
seedPath = str(dirpath + '/../seeders').split('../')
seedPath = "".join(seedPath)
totalArchivos = listDirMaker(seedPath).getdirList()
for indice in range(len(totalArchivos)):
    pathArray = totalArchivos[indice].split('/')
    seedName = pathArray[ len( pathArray ) - 1]
    if (modelname in seedName):
        seedPath = seedPath + "/" + seedName
        break

print RESET + '      * Seed path: ',seedPath
newFileContent = list()
done = False
f = open(seedTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        newFileContent.append(string.replace(line, '$modelname$', modelname))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(seedPath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()
print OKGREEN + '      * Seed corrected (ES6): ' + str(done)







##
## Define some paths as basic API files
##

modelPath = dirpath + '/' + apipath + '/' + modelname + '.model.js'
controllerPath = dirpath + '/' + apipath + '/' + modelname + '.controller.js'
daoPath = dirpath + '/' + apipath + '/' + modelname + '.dao.js'
helpersPath = dirpath + '/' + apipath + '/' + modelname + '.helpers.js'
indexPath = dirpath + '/' + apipath + '/index.js'
factoryPath = dirpath + '/' + apipath + '/' + modelname + '.factory.js'
routesIndexPath = dirpath + '/src/api/index.js'




##
## Now lets create a controller from template
##

print RESET + '      * Controller Path: ' + controllerPath
newFileContent = list()
done = False
f = open(controllerTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        newFileContent.append(string.replace(line, '$modelname$', modelname))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(controllerPath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()
print OKGREEN + '      * Controller created: ' + str(done)


##
## By now DAO and helpers goes empty files
##
done = []
EMPTY_FILES_YET = [ daoPath, helpersPath ]
for path in EMPTY_FILES_YET:
    with open(path, 'w') as the_file:
        the_file.write('// Write your code here :)')
        the_file.close()
        done.append(True)

print RESET + '      * DAO Path: ' + daoPath
print RESET + '      * Helpers Path: ' + helpersPath
print OKGREEN + '      * DAO file created: ' + str(done[0])
print OKGREEN + '      * Helpers file created: ' + str(done[1])


##
## Model first needs to check created data structure
##
print RESET + '      * Model Path: ' + modelPath
modelattributes = list()
attributestittles = list()
done = False
f = open(modelPath, 'r')
for line in f:
    if ( 'DataTypes.' in line ):
        attributestittles.append( line.split(':')[0] + ',' )
        modelattributes.append(line)
        done= True
print RESET + '      * Recognized attributes: ' + str(len(modelattributes))

f.close()

querymanAttributes = []
# Let create bodyman structure
for index, attr in enumerate(modelattributes):
    if( 'DataTypes.STRING' in attr ):
        parseJsSequelizeType = [ 'DataTypes.STRING', 'String' ]
    elif('DataTypes.INTEGER' in attr):
        parseJsSequelizeType = [ 'DataTypes.INTEGER', 'Number' ]
    elif('DataTypes.FLOAT' in attr):
        parseJsSequelizeType = [ 'DataTypes.FLOAT', 'Number' ]
    elif('DataTypes.DATE' in attr):
        parseJsSequelizeType = [ 'DataTypes.DATE', 'Date' ]
    elif('DataTypes.BOOLEAN' in attr):
        parseJsSequelizeType = [ 'DataTypes.BOOLEAN', 'Boolean' ]
    elif('DataTypes.JSON' in attr):
        parseJsSequelizeType = [ 'DataTypes.JSON', 'JSON' ]
    else:
        raise Exception('Generator just supports DataTypes: STRING,  INTEGER, FLOAT, DATE, BOOLEAN, JSON')
    replaced = string.replace(attr, parseJsSequelizeType[0], parseJsSequelizeType[1])
    attr_name = replaced.split(':')[0].split('      ')[ len(replaced.split(':')[0].split('      ')) - 1]
    attr_type = replaced.split(':')[1].split(('\n'))[0]
    if( (len(modelattributes) - 1) != index ):
        querymanAttributes.append(attr_name + ':' + ' \n   {  \n'+ '       type: ' + attr_type + '\n       required: true \n   }, \n')
    else:
        querymanAttributes.append(attr_name + ':' + ' \n   {  \n'+ '       type: ' + attr_type + ',\n       required: true \n   } \n')



##
## (v1.22.0) Now lets cretae factory file... fakers templates for factories
##
attrfakerlist = []
# Let create bodyman structure

print RESET + '      * Factory Path: ' + factoryPath

for index, attr in enumerate(modelattributes):
    if( 'DataTypes.STRING' in attr ):
        parseJsSequelizeType = [ 'DataTypes.STRING', ' () => faker.lorem.sentence()' ]
    elif('DataTypes.INTEGER' in attr):
        parseJsSequelizeType = [ 'DataTypes.INTEGER', ' () => faker.random.number()' ]
    elif('DataTypes.FLOAT' in attr):
        parseJsSequelizeType = [ 'DataTypes.FLOAT', ' () => faker.random.number()' ]
    elif('DataTypes.DATE' in attr):
        parseJsSequelizeType = [ 'DataTypes.DATE', ' () => Date.now()' ]
    elif('DataTypes.BOOLEAN' in attr):
        parseJsSequelizeType = [ 'DataTypes.BOOLEAN', ' () => false' ]
    elif('DataTypes.JSON' in attr):
        parseJsSequelizeType = [ 'DataTypes.JSON', ' () => { }' ]
    else:
        raise Exception('Generator just supports DataTypes: STRING,  INTEGER, FLOAT, DATE, BOOLEAN, JSON')


    replaced = string.replace(attr, parseJsSequelizeType[0], parseJsSequelizeType[1])
    if( (len(modelattributes) - 1) != index ):
        attrfakerlist.append( replaced )
    else:
        attrfakerlist.append( replaced )
        


newFileContent = list()
done = False
f = open(factoryTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        newFileContent.append(string.replace(line, '$modelname$', modelname))
    elif( '$attrfakerlist$' in line):
        newFileContent.append(string.replace(line, '$attrfakerlist$', "".join(attrfakerlist)))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(factoryPath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()
print OKGREEN + '      * Factory created: ' + str(done)







#Just now build an object also for Sequelize
helper = []
for index, replaced in enumerate(modelattributes):
    attr_name = replaced.split(':')[0].split('      ')[ len(replaced.split(':')[0].split('      ')) - 1]
    attr_type = replaced.split(':')[1].split(('\n'))[0]
    if( (len(modelattributes) - 1) != index ):
        helper.append(attr_name + ':' + ' \n   {  \n'+ '       type: ' + attr_type + '\n       allowNull: false \n   }, \n')
    else:
        helper.append(attr_name + ':' + ' \n   {  \n'+ '       type: ' + attr_type + ',\n       allowNull: false \n   } \n')

# Re assign basic models attirubres by objects ;)
modelattributes = helper
    

## Now we have the structure, we can paste it to template
newFileContent = list()
done = False
f = open(modelTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        newFileContent.append(string.replace(line, '$modelname$', modelname))
    elif( '$modelattributes$' in line  ):
        newFileContent.append(string.replace(line, '$modelattributes$', "".join(modelattributes)))
    elif( '$querymanattributes$' in line):
        newFileContent.append(string.replace(line, '$querymanattributes$', "".join(querymanAttributes)))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(modelPath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()
print OKGREEN + '      * Model created: ' + str(done)







##
## Now lets create index file
##
print RESET + '      * Index Path for model (Middleware definitions ExpressJS routes): ' + indexPath

newFileContent = list()
done = False
f = open(indexTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        newFileContent.append(string.replace(line, '$modelname$', modelname))
    elif ( '$attributestittles$' in line ):
        newFileContent.append(string.replace(line, '$attributestittles$', "".join(attributestittles)))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(indexPath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()
print OKGREEN + '      * Index created: ' + str(done)




##
## At last, add route to router Express
##

# first by route to add
f = open(routeTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        routeToAdd = string.replace(line, '$modelname$', modelname) + '\n/** nextApi */'

f.close()
# second by setting import to add
f = open(importTemplatePath, 'r')
for line in f:
    if ( '$modelname$' in line ):
        importtoAdd = string.replace(line, '$modelname$', modelname) + '\n/** nextImport */'

f.close()
print OKGREEN + '      * Index created: ' + str(done)


print RESET + '      * Main routes file path (main ExpressJS routes to be added at NodeJS): ' + routesIndexPath

newFileContent = list()
done = False
f = open(routesIndexPath, 'r')
for line in f:
    if ( '/** nextImport */' in line ):
        newFileContent.append(string.replace(line, '/** nextImport */', importtoAdd))
    elif ( '/** nextApi */' in line ):
        newFileContent.append(string.replace(line, '/** nextApi */', routeToAdd))
    else:
        newFileContent.append(line)
newFileContent = "".join(newFileContent)

with open(routesIndexPath, 'w') as the_file:
    the_file.write(newFileContent)
    the_file.close()
    done = True

f.close()
print OKGREEN + '      * Main routes file modified: ' + str(done)


print WARNING + '  *******       ***********************          *******'
print OKGREEN + ' **********       ***********************          *******'
print FAIL + '************       ***********************          *******'
print HEADER +'************************************************************'
print RESET
