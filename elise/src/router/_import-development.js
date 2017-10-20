// module.exports = file => require(`../component/${file}.vue`).default
module.exports = file => () => import(`../component/${file}.vue`)