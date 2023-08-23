import _ from 'lodash'

import validation from '@utils/user-validation'

export default async function handler(req, res) {
	const {method, body, query: {id}, DB} = req

	try {

		const user = await DB.Users.findOne({where: {id}})
		if (_.isEmpty(user)) {
			return res.status(400).json({name: 'Cannot found matching user'})
		}

		if (method === 'GET') {
			res.json(user)
		} else if (method === 'PUT') {

			const validateStatus = validation(body)
			if (_.has(validateStatus, 'msg')) {
				return res.status(validateStatus.status).json({msg: validateStatus.msg})
			}

			body.email = _.toLower(body.email)

			await user.update(body)

			res.json({success: true})
		} else if (method === 'DELETE') {

			await user.destroy()

			res.json({success: true})
		} else {
			res.status(405).json({name: 'Unsupported method'})
		}

	} catch (err) {
		console.error(err.toString())
		res.status(500).json({msg: 'There is an error'})
	}

}