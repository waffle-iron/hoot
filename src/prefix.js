const prefix = (format) => (namespace) => (reducer) => (actions) => {
  const o = {}
  actions.forEach((action) => {
    o[action] = format(namespace, reducer, action)
  })
  return o
}

export default prefix((n, r, a) => `${r}/${a}`)('hoot')
