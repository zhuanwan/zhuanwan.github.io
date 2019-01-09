
import config from './env.config'

// const env = 'test'
const env = 'test'
const envConfig = config[env]
const version = 'v1.0.0'

export {
  env,
  envConfig,
  version
}
