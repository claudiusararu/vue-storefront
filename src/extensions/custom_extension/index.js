import extensionStore from './store'
import extensionRoutes from './router'
import EventBus from 'core/plugins/event-bus'
const EXTENSION_KEY = 'custom_extension'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store
  // TODO: register module events here
  app.$on('application-after-init', () => {
    console.log('custom-event')
  })

  EventBus.$on('product-after-single', (payload) => {
    // payload.product.name = "" // this is an example on how can you modify the data
    return payload
  })

  EventBus.$on('cart-before-add', (payload) => {
    // payload.product.name = "" // this is an example on how can you modify the data
    // payload.product.sku = ""
    return payload
  })

  EventBus.$filter('product-after-load', (payload) => {
    return new Promise((resolve, reject) => {
      // payload.store.state.product.current.name = '' // this change will be visible in SSR
      resolve(payload)
    })
  })

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
