import _ from 'lodash'
import {Op} from 'sequelize'

import validation from '@utils/user-validation'

export default async function handler(req, res) {
	const {method, body, query: {search}, DB} = req

	try {
		if (method === 'GET') {
			// Get all
			let where = {}
			if (!_.isEmpty(_.trim(search))) {
				where = {
					[Op.or]: [{
						email: {[Op.like]: `%${search}%`},
					}, {
						username: {[Op.like]: `%${search}%`},
					}, {
						phoneNo: {[Op.like]: `%${search}%`},
					}]
				}
			}

			const results = await DB.Users.findAll({where})

			res.json(results)
		} else if (method === 'POST') {
			// Create new

			const validateStatus = validation(body)
			if (_.has(validateStatus, 'msg')) {
				return res.status(validateStatus.status).json({msg: validateStatus.msg})
			}

			body.email = _.toLower(body.email)

			await DB.Users.create(body)

			res.json({success: true})
		} else {
			res.status(405).json({name: 'Unsupported method'})
		}
	} catch (err) {
		console.error(err.toString())
		res.status(500).json({msg: 'There is an error'})
	}
}
