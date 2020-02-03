/** Factory lib for JS with adapters for Mongoose ODM or Sequelize ORM */
import factoryGirl from 'factory-girl' 
/** Usefull functions from JS */
import bluebird from 'bluebird' 

/** with Factory, we bascially get factory instance, then to allow asyn/await features we promosify the instance */
const factory = new factoryGirl.Factory().promisify(bluebird)
/** This case we use Sequelize */
const adapter = new factoryGirl.SequelizeAdapter()

/** Set adapter and export instance as default */
factory.setAdapter(adapter)
export default factory
