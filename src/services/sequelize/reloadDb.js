
import models from '.'

try {
  models.sequelize.sync({ alter: true }).then(() => {
    console.log('[SUCCESS] DATABASE HAS BEEN SYNC (UPDATED)')
  })
} catch (err) {
  console.log(err)
}
