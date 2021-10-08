import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const perms = store.getters && store.getters.permissions
    const permissions = value

    return perms.some(role => {
      return permissions.includes(role)
    })
  } else {
    console.error(`need perms! Like v-permission="['admin','editor']"`)
    return false
  }
}
