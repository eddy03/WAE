/**
 * Why using custom server?
 * Because we can use like mysql/postgres pool
 * or Redis without terminate connection
 *
 */

const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const _ = require('lodash')

const dev = process.env.NODE_ENV !== 'production'
// When using server, or docker or GCP Cloud Run. We can set PORT env externally
// PORT won't be available until nextjs loaded
const port = Number(process.env.PORT || 4000)

const app = next({dev, hostname: '0.0.0.0', port})
const handle = app.getRequestHandler()

app.prepare()
	.then(async () => {
		const DB = require('./lib/models')

		createServer(async (req, res) => {
			try {
				req.DB = DB.sequelize.models
				req.sequelize = DB.sequelize
				req.Sequelize = DB.Sequelize

				await handle(req, res, parse(req.url, true))
			} catch (err) {
				console.error('There is an error', err.toString())
				res.statusCode = 500
				res.end('Internal Server Error')
			}
		})
			.once('error', err => {
				console.error(err)
				process.exit(1)
			})
			.listen(port, () => {
				// MAC will behave differently
				console.log(`> Ready on http://localhost:${port}`)
			})
	})
