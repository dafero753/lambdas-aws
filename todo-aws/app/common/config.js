const env = {
	connection: {
		host: process.env.PS_HOSTNAME,
		database: process.env.PS_DB_NAME,
		user: process.env.PS_USERNAME,
		password: process.env.PS_PASSWORD,
		port: process.env.PS_PORT
	}
};

module.exports = env;
