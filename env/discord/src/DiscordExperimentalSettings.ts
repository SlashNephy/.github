// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable eqeqeq, no-proto */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const main = () => {
  let wpRequire
  window.webpackChunkdiscord_app.push([
    [Math.random()],
    {},
    (req) => {
      wpRequire = req
    },
  ])
  const mod = Object.values(wpRequire.c).find((x) => typeof x?.exports?.default?.isDeveloper !== 'undefined')
  const usermod = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getUsers)
  const nodes = Object.values(mod.exports.default._dispatcher._actionHandlers._dependencyGraph.nodes)
  try {
    nodes
      .find((x) => x.name == 'ExperimentStore')
      .actionHandler.CONNECTION_OPEN({ user: { flags: 1 }, type: 'CONNECTION_OPEN' })
  } catch (e: unknown) {}
  const oldGetUser = usermod.exports.default.__proto__.getCurrentUser
  usermod.exports.default.__proto__.getCurrentUser = () => ({ hasFlag: () => true })
  nodes.find((x) => x.name == 'DeveloperExperimentStore').actionHandler.CONNECTION_OPEN()
  usermod.exports.default.__proto__.getCurrentUser = oldGetUser
}

module.exports = class {
  public start() {
    main()
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public stop() {}
}
