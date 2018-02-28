let projectConfig = {
    url: {
        data: 'http://data.hasura/v1/query',
        auth: {
        	getUserInfo: 'http://auth.hasura/v1/user/info'
        }
    }
}

if (process.env.ENVIRONMENT === 'dev') {
    projectConfig = {
        url: {
            data: 'https://data.' + process.env.CLUSTER_NAME + '.hasura-app.io/v1/query',
            auth: {
            	getUserInfo: 'https://auth.' + process.env.CLUSTER_NAME + '.hasura-app.io/v1/user/info'
            }
        }
    }
}

module.exports = {
  projectConfig
};
