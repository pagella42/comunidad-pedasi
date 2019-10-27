
const createRoute = (routeName) => {
    return window.location.host.includes('localhost') ?
        `http://localhost:4000/${routeName}`
        : `/${routeName}`
}
module.exports = {
    CREATE_ROUTE: createRoute
}