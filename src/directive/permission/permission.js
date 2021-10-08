import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const perms = store.getters && store.getters.permissions

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissions = value

      const hasPermission = perms.some(perm => {
        return permissions.includes(perm)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need perms! Like v-permission="['perms_1','perms_2']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
