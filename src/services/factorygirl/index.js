/** Factory lib for JS with adapters for Mongoose ODM or Sequelize ORM */
const factory = require('factory-girl').factory
const FactoryGirl = require('factory-girl')
/** Usefull functions from JS */


/** This case we use Sequelize */
const adapter = new FactoryGirl.SequelizeAdapter()

/** Set adapter and export instance as default */
factory.setAdapter(adapter)
export default factory
