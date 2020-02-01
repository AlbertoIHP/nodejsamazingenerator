





## Node.JS amazinGenerator  [![NPM version][npm-image]][npm-url] 

  

**Description:** Powerfull project with some features that could be take as basic, this project has some structure based on generator from [Diego Haz generator](https://github.com/diegohaz/rest) project. Also has some configuration files based on the [juniorhq88 generator](https://github.com/juniorhq88/nodejs-mysql-jwt-express) project.

  

Several changes about this both project, were maked by developer team. However many thanks to this both developers by creating both projects as open source code :)
  
   ## Features

This project has integrated this feautres:

 - [JWT](https://www.npmjs.com/package/jsonwebtoken): For authentication standard
 - [Passport](https://www.npmjs.com/package/passport): To define method through the app is authenticable
 -  [Sendgrid](https://www.npmjs.com/package/sendgrid): For mailing from back-end side
 - [ExpressJS](https://www.npmjs.com/package/express): To handling routes fetching and there flow as using [middlewares with next() function](https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express) in order to multi fetch.
 - [Sequelize ORM](https://www.npmjs.com/package/sequelize): To handle DB connection from the backend.
 - [Sequelize CLI](https://www.npmjs.com/package/sequelize-cli): To handle migrations, creation of models, or databases.
 - [Babel (allows ES6)](https://www.npmjs.com/package/@babel/core): To use latest syntaxis of JS
 - [ApiDoc Generator](https://www.npmjs.com/package/apidoc): from JSDoc conventions generate an HTML page to see it.
 - [JSDoc](https://jsdoc.app/): Conventions to write docs at JS files.
 - [Mocha](https://www.npmjs.com/package/mocha) To test files inside `test` folder with extension **.spec**
 - [Sequelize Auto](https://www.npmjs.com/package/sequelize-auto): This is just working through hard coded package.json, must be integrated with SDK of this lib, to create models inside the folder of the entity scope (As DAO, RESTful, MVC pattern should be) 
 - [Bodymen](https://www.npmjs.com/package/bodymen): As middleware on ExpressJS fetchings to validate body data structure ( Check docs )
 - [Body Parser](https://www.npmjs.com/package/body-parser): To admit urlencoded and JSON type on ExpressJS (Check docs)
 - [CORS](https://www.npmjs.com/package/cors): To allow fetching through REST methods.
 - [Morgan](https://www.npmjs.com/package/morgan): For NodeJS Logging (it can let save on persistance file logs).
 - [Dotenv](https://www.npmjs.com/package/dotenv): To let NodeJS use .env file as common frameworks use to work.

## Installation

Crate a directory like myprojectdirectory and then enter it by following code (replace with your project name of course)
```bash
mkdir myprojectdirectory; cd myprojectdirectory
```
Then init an npm project skipping all options with enter (this is just to get project)
```bash
npm init
```
Then install nodejsamazingenerator through npm like this
```bash
npm i nodejsamazingenerator
```
***IMPORTANT: create your .env file by following .env.example file or project will not work***
Finally by running `npm start`  server will be deployed following ***.env*** configurations.

## Usage
   
Last update let developers build full api entity scope (check folder structure below at myentity folder inside api folder):
```bash
npm run generate:model --name myentity --attr nombre:string,apellido:string,correo:string
```
Note that myentity should be as many models as your project has. Repeat as many times you need. Once you finished, run this command to create your database, and migrate your whole list of models created.
```bash
npm run start-with:reset-db-dev
```

Generate the whole models documentation by running:
```bash
npm run docs
```
## Other features

This project will allow you to build fast a robust backend NodeJS server. following good pattern design as DAO, RESTful and MVC. Commands to remember

 - **Create** database from config.js (See docs 4 detail): 
	```bash
	npm run sequelize db:create --env=test
	```


 - **Drop** database from config.js: 
	```bash
	npm run sequelize db:drop --env=test
	```
 - **Create model with it migration** (See docs 4 detail): 
	```bash
	npm run generate:model --name mymodelname --attr name:string,location:string,email:string
	```

 - Run **migrations** on database to create tables (See docs 4 detail): 
	```bash
	npm run sequelize db:migrate --env=test
	```
 - Generate server **Docs** following JSdocs conventions: 
	```bash
	npm run docs
	```
 - Run your **test** inside test folder with **.spec** extension on **Mocha**  **Docs** following JSdocs conventions: 
	```bash
	npm run test
	```
 - **(On dev)** Generate models from DB by changing at `package.json` at scripts last one change vars mydbname,  myhost, mydbuser, mydbpassword. 
	 ```json
	"scripts": {
	    ...,
	    "generate-models-from-db": "sequelize-auto -o /src/api -d mydbname -h myhost -u mydbuser -p 5432 -x mydbpassword -e postgres"
	  }
	```
	And then running 	
	 ```bash 
	 npm run generate-models-from-db
	 ``` 
 - Start server with reseting all by environment: 

	  ***for development***
	```bash 
	 npm run start-with:reset-db-dev
	 ``` 


	  ***for production***
	```bash 
	 npm run start-with:reset-db-prod
	 ``` 





	  ***for testing***
	```bash 
	 npm run start-with:reset-db-test
	 ``` 
  


## Directory structure

### Overview

You can customize the `src` and `api` directories.

```
backnodejs/
	├─ docs/
	├─ generator/
	│  ├─ templates/
	│  ├─ __init__.py
	│  ├─ generator.js
	│  ├─ listdirmaker.py
	│  └─ listdirmaker.pyc
	├─ config/
	│  └─ config.json
	├─ migrations/
	│  └─ timestamp-create-mymodel-migration.js
	├─ seeders/
	│  └─ timestamp-create-mymodel-seeder.js
	├─ src/
	│ 	├─ api/
	│ 	│  ├─ auth/
	│ 	│  │  ├─ controller.js
	│ 	│  │  └─  index.js
	│ 	│  ├─ user/
	│ 	│  │  ├─ user.controller.js
	│ 	│  │  ├─ user.dao.js
	│ 	│  │  ├─ user.helpers.js
	│ 	│  │  ├─ user.model.js
	│ 	│  │  └─ index.js
	│ 	│  ├─ myentity/
	│ 	│  │  ├─ myentity.controller.js
	│ 	│  │  ├─ myentity.dao.js
	│ 	│  │  ├─ myentity.helpers.js
	│ 	│  │  ├─ myentity.model.js
	│ 	│  │  └─ index.js
	│ 	│  └─ index.js
	│ 	├─ services/
	│ 	│  ├─ express/
	│ 	│  ├─ jwt/
	│ 	│  ├─ mongoose/
	│ 	│  ├─ passport/
	│ 	│  ├─ sendgrid/
	│ 	│  └─ sequelize/
	│ 	├─ utils/
	│ 	│  ├─ console_colors.js
	│ 	│  └─ error_handler.js
	│ 	├─ config.js
	│ 	├─ index.js
	│ 	└─ app.js
	├─ test/
	│  └─  mymodel.spec.js
	├─ .babelrc
	├─ .editorconfig
	├─ .env
	├─ .env.example
	├─ .eslintrc
	├─ .gitignore
	├─ apidoc.json
	├─ DOCS.md
	├─ LICENSE
	├─ package.json
	└─ README.md
```

### src/api/

Here is where the API endpoints are defined. Each API has ***its own folder***.

#### src/api/some-endpoint/model.js

It defines the **data attributes** of the **database** model, it could be coppied to the migration indeed. Also declares a ***Queryman object to be used at validations on controllers***. Finally defines the model with ***Sequelize SDK***

#### src/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.).

### services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.




# Documentation
  

-  **EXPRESSJS**: This *service* has a configuration service at `src/services/express/index.js` file, which basically sets some need configuration at express instance. Mainly config at this file (**to avoid writing whole file**) are:

  

	```javascript
	export  default (apiRoot, routes) => {
		const  app = express()	  

		/* istanbul ignore next */
		if (env === 'production' || env === 'development') {
			app.use(cors())
			app.use(compression())
			app.use(morgan('dev'))
		}  

		app.use(bodyParser.urlencoded({ extended:  false }))
		app.use(bodyParser.json())
		app.use(apiRoot, routes)
		app.use(queryErrorHandler())
		app.use(bodyErrorHandler())

		return  app

	}
	```

  

-  **JWT**: This *service* has a configuration service at `src/services/jwt/index.js` file, which basically sets sign method to be used at passport service. Mainly configuration of this file (**to avoid writing whole file**) is to sign with JWT.

	```javascript

	  

	/**
	* With promisify we can change the original function return by a Promise response
	*/

	const  jwtSign = Promise.promisify(jwt.sign)

	  

	/**

	* This method allows to sign in through jsonwebtoken lib
	* @param  {*}  id id from the fetching user
	* @param  {*}  options options to sign in
	* @param  {*}  method method to sign in at platform, usually jwt secret method

	*/

	export  const  sign = (id, options, method = jwtSign) => {
		console.log('Signing in with JWT_SECRET = ', config.jwtSecret)
		return  method({ id }, config.jwtSecret, options)
	}

	  

	```

  

-  **PASSPORT**: This *service* has a configuration service at `src/services/passport/index.js` file, this service is kindy more complex than others, Passport just let us define by **use()** function, ways of authenticate through passport API. As example, just to **avoid write whole** file (its kindy long), lets just take the token use, that works with the service of **JWT**(last one). *To use* one of this config, just use **authenticate()** method from passport, on one of your middlewares configuration at express routes :) as follow:

  

	*use('token')*

	 

	```javascript
	/**
	* Passport configuration for using JWT
	*/
	passport.use('token', new  JwtStrategy({
		secretOrKey:  config.jwtSecret, /** Mainly by giving to it the JWT_SECRET from .env (check config.js) */
		/**
		* Then by extracting from request the access_token given after logging API (It could be at URL, at Body from request, or Header from request)
		*/
		jwtFromRequest:  ExtractJwt.fromExtractors([
			ExtractJwt.fromUrlQueryParameter('access_token'),
			ExtractJwt.fromBodyField('access_token'),
			ExtractJwt.fromAuthHeaderWithScheme('Bearer')
	])

	/**
	* At last, get the user and is added to request as req.user with
	* done function, that takes the profile info and attaches it on the request object so its available on your callback url as req.user.
	* ( Read https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead )
	*/
	}, ({ id }, done) => {
	User.findById(id).then((user) => {
		done(null, user)
		return  null
	}).catch(done)

	}))

	```

  

	*authenticate('token')*

	```javascript
	export  const  token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
		passport.authenticate('token', { session:  false }, (err, user, info) => {
		if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
			return  res.status(401).end()
		}
		req.logIn(user, { session:  false }, (err) => {
			if (err) return  res.status(401).end()
			next()
		})
	})(req, res, next)

	```

	  

-  **RESPONSE**: This *service* has a configuration service at `src/services/response/index.js` file, and it has basically some standard at working with fetchings. One of this function as example **(to avoid writing whole file)** is that executes double function as success( res )( entity ), where res is res express object of fetching, and entity could be as example an user getted from **sequelize** service.

	```javascript
	/**
	* This methods builds a json response based on the original response, giving
	* to it a status and also the result of the fetching as an object entity
	* @param  {*}  res receives the res from a fetching request
	* @param  {*}  status Code with status of the response for a fetching request
	* */
	export  const  success = (res, status) => (entity) => {
		if (entity) {
			res.status(status || 200).json(entity)
		}
		return  null
	}
	```

	  

-  **SENDGRID**: This *service* has a configuration service at `src/services/sendgrid/index.js` file, and it has basically config to use mailing with sendgrid.

	```javascript
	import  sendgridMail  from  '@sendgrid/mail'
	import { sendgridKey, defaultEmail } from  '../../config'
	  
	/**
	* With the SENDGRID_KEY from .env we load
	*/
	sendgridMail.setApiKey(sendgridKey)  

	/**
	* This method receives the email from is going to be sended the email, the destination email
	* Subject of the email indeed, and the content. This can be as HTML string sure
	* @param  {*}  param0 Receives an object with basic data to send an email
	*/

	export  const  sendMail = ({
		fromEmail = defaultEmail,
		toEmail,
		subject,
		content
		}) => {
			const  msg = {
			to:  toEmail,
			from:  fromEmail,
			subject,
			html:  content
			}
			return  sendgridMail.send(msg)
		}
	}

	```

  

-  **SEQUELIZE**: This *service* has a configuration service at `src/services/sequelize/index.js` file, and it is based on [SequelizeCLI ](https://github.com/sequelize/cli) config file generator. To **avoid writting whole file** it basically works, loading whole models list from project, in Sequelize object cache, which allow to better perfomance at making queries with it.

  

	*Instanced class of Sequelize for NodeJS*

	```javascript

	const  sequelize = new  Sequelize(config.postgresql.uri, {
		logging:  config.postgresql.db_log === 'true',
		dialect:  'postgres',
		host:  config.postgresql.db_host,
		port:  config.postgresql.db_port,
		define: {
			timestamps:  false  /** Must be true */
		}
	})

	```

  
  
	
	*Recursive function to find models.js*

	```javascript

	const  searchModels = (target, result_array = []) => {
		fs.readdirSync(target, { withFileTypes:  true }).map(element  => {
			if (element.isDirectory()) {
				const  directoryPath = path.join(target, element.name)
				searchModels(directoryPath, result_array)
			} else {
				const  isModel = (element.name.indexOf('.model') !== -1)
				if (isModel) {
				result_array.push(path.join(target, element.name))
				}
			}
		})
	}

	```

	  

	*then using it with a defined path as inside **api older***

	  

	```javascript
	const  target = path.join(__dirname, '../../api')
	searchModels(target, models)
	models.map((modelPath) => {
		const  model = sequelize.import(modelPath)
		db[model.name] = model
		if ('associate'  in  db[model.name]) {
			db[model.name].associate(db)
		}
	})

	```

	  
  

-  **SEQUELIZE-CLI**: This lib can be executed by using npx executable from **nodeJS** as follow

	```bash

	npx sequelize-cli

	```
	But this way does not allow developers to use ES6 features, so by running custom command ``` npm run sequelize ``` will execute SequelizeCLI but with babel rules to read ES6 modules features. Then a file located at ``` config/config.json ``` must be configured with local vars if needded.

	```json
	{
		"development": {
			"username": "username",
			"password": "password",
			"database": "database",
			"host": "127.0.0.1",
			"dialect": "postgres"
		},
		"test": {
		"username": "username",
			"password": "password",
			"database": "database",
			"host": "127.0.0.1",
			"dialect": "postgres"
		},

		"production": {
			"username": "username",
			"password": "password",
			"database": "database",
			"host": "127.0.0.1",
			"dialect": "postgres"
		}

	}
	```

	Which will be used for commands to make migrations, or create them if needed. Set some seeders and other stuff. 
	As example something prettier basic as ***create*** the db without getting into the console from DB API...
	```bash
	npm run sequelize db:create --env=test
	```
	Then to ***drop*** the db just do
	```bash
	npm run sequelize db:drop --env=test
	```
	Rembember also to check **.env** file with your vars as:

	```
	DB_HOST=dbhost
	DB_NAME_DEV=dbnamedev
	DB_NAME_PROD=dbnameprod
	DB_PASSWORD=dbpass
	DB_LOG=dblog
	DB_PORT=dbport
	DB_USER=dbuser
	DEFAULT_EMAIL_ALIAS=defaultemail
	JWT_SECRET=jwtsecret
	MASTER_KEY=masterkey
	SENDGRID_KEY=sendgridkey
	SERVER_PORT=serverport
	SERVER_IP=serverip
	SERVER_ENVIRONMENT=serverenvironment
	```

	  

	For creating migrations for example we can use command like this **(remember use - instead of _)**:

	```bash
	npm run sequelize migration:generate --name my-migration
	```

	This will create your migration with a **timestamp** in the name just to set a flow that would be follow by CLI API.	  

	  

	So, by using this we can now create a model with our format *RESTful* design pattern, where the model example is ***mymodelname*** you could replace as you want

	  

	```bash

	npm run generate:model --name mymodelname --attr name:string,location:string,email:string

	```

	  

	Then the model will be created at the path `src/api/mymodelname/mymodelname.model.js` and the migration will be stored at `migrations` folder as `timestamp-create-mymodelname-model.js`. There modify the **.models bug**, add the **modelAttribute standard function** to load the migration as follow example:
	```javascript
	'use strict'

	import { userAttributes } from '../src/api/user/user.model'

	/**
	* With userAttributes we can spread whole attr model config
	*/
	module.exports = (() => {
	return {
		up: (sequelize, DataTypes) => {
		return sequelize.createTable('users', {
			...userAttributes(DataTypes)
		})
		},
		down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users')
		}
	}
	})()

	```

	Then at the model `src/api/mymodelname/mymodelname.model.js` remember to declare your bodyman Schema to use it as middleware on ExpressJS fetchs, declare the modelAttribute function which should return an Schema from Sequelize standard, and finally the definition of the model from Sequelize SDK as follow example:
	```javascript
	/* jshint indent: 2 */

	import bcrypt from 'bcrypt'
	import { errorHandler } from '../../utils/error_handler'

	const roles = [
	'superadmin',
	'admin',
	'masterplan',
	'lookahead'
	]

	/**
	* Queryman data Schema for validation middleware
	*
	*/
	export const userDataSchema = {
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},

	role: {
		type: String,
		required: true,
		enum: roles
	},
	username: {
		type: String,
		required: true
	}
	}

	/**
	* This method build usefull attr to be declared in many places as it could be necessary (migrations example)
	* @param {*} DataTypes From Sequelize instance
	*/
	export const userAttributes = (DataTypes) => {
	return {
		id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
		},
		email: {
		type: DataTypes.STRING,
		allowNull: false
		},
		password: {
		type: DataTypes.STRING,
		allowNull: false
		},
		role: {
		type: DataTypes.STRING(256),
		allowNull: false
		},
		username: {
		type: DataTypes.STRING,
		allowNull: false
		}
	}
	}

	/**
	* Sequelize model SDK for NodeJS with SequelizeCLI standard 
	*/
	export default (sequelize, DataTypes) => {
	return sequelize.define('users', {
		...userAttributes(DataTypes)
	}, {
		tableName: 'users',
		hooks: {
		/**
		* hooks methods from models recognize some
		* lifecycle hooks from the user model component
		* to execute some custom 'scripts' on them
		* (Check https://sequelize.org/master/manual/hooks.html)
		*/
		beforeSave: async (user) => {
			try {
			const hashedPass = await bcrypt.hash(user.password, 9)
			user.password = hashedPass
			} catch (err) {
			errorHandler(err)
			}
		}
		}
	})
	}


	```


	  

	Now lets guess that ***we were working without Sequelize-CLI*** and did create models from the scratch by ourselfs. So then, lets create a migration for example a already created `src/api/user/user.model.js` with command:

	  

	```bash
	npm run sequelize migration:generate --name user-migration
	```

	Checks file generated as `timestamp-create-user-migration.js.js` inside of it, is just skeleton of the migration, lets fill it with the copy of user.model.js like this:

	```javascript
	'use strict'

	import { userAttributes } from '../src/api/user/user.model'

	/**
	* With userAttributes we can spread whole attr model config
	*/
	module.exports = (() => {
	return {
		up: (sequelize, DataTypes) => {
		return sequelize.createTable('users', {
			...userAttributes(DataTypes)
		})
		},
		down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users')
		}
	}
	})()

	```

	Now running this command will migrate all your migrations...

	```bash
	npm run sequelize db:migrate --env=test
	```
	And if you are looking to restart the whole environment, and then start your backend app just run it like this to development
	```bash
	npm run start-with:reset-db-dev
	```

-  **Bodyman**: This lib allows expressJS to filter if data comes as should be on our fetch, declaring as a Schema from Sequelize model, but with other syntaxis :
	```javascript
	attribute: {
	    type: String,
	    match: /^\S+@\S+\.\S+$/,
	    required: true,
	    unique: true,
	    trim: true,
	    lowercase: true,
	    minlength: 6,
	    enum: roles
	  }
	```
	Following last example, check how a user should be declared with bodyman, for example at user.model.js below of sequelize declaration:
	```javascript
	export const userDataSchema = {
	  deleted_at: {
	    type: Date,
	    required: false
	  },
	  email: {
	    type: String,
	    required: true
	  },
	  password: {
	    type: String,
	    required: true
	  },
	  username: {
	    type: String,
	    required: true
	  }
	}
	```

	
	Then at route config we can validate this by following code, which one configurate as **middlewares**, ***master passport method authentication*** (for authorized apps just fetching API), then **bodyman** through body ***which executes the schema validate() method***, to check if the definition that we gave is correct, finally just using ***create() method for create the model indeed***:
	```javascript
	import { middleware as query } from 'querymen'
	import { master } from '../../services/passport'
	const { email, password, username } from './user.model.js'
	const { create } from './user.controller.js

	router.post('/',
	  master(),
	  body({ email, password, username }),
	  create)
	```

-  **Api Docs**: This lib allow us to create a HTML document with the documentation of our API, using JSDoc standard at our code (**Please document your code**, remember that code is readed by other ***humans***).  Check the apidoc.json file, should look like this (Check more config at https://apidocjs.com/#configuration):

	```javascript
	{
	    "name": "myprojectname",
	    "version": "0.0.1",
	    "description": "mydescription",
	    "title": "mydoctittle",
	    "url" : "http://server-host:serverport"
	}
	```

	With it, by running ```npm run docs``` will generate the doc, and open it at your default web browser.
  
  

## License

MIT © [Alberto Herrera Poza](https://github.com/AlbertoIHP)

[npm-image]: https://badge.fury.io/js/nodejsamazingenerator.svg
[npm-url]: https://www.npmjs.com/package/nodejsamazingenerator
