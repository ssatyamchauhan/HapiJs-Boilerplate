
exports.register = async (server) => {

    const options = {
        ops: {
            interval: 5000
        },
        reporters: {
            myConsoleReporters: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{log: '*', response: "*", ops: '*'}]
            },
            {
                module: 'good-console'
            }, 'stdout'
            ]
        },

    }
    await server.register({
        plugin: require('good'),
        options
    })
}

exports.pkg = {
    name: "logging"
}