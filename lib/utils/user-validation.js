import _ from 'lodash'
import validator from 'validator'

export default function (body) {
	// @todo  adding server side validation
	if (_.isEmpty(_.trim(body.username))) {
		return {msg: 'Username is required', status: 400}
	} else if (_.isEmpty(_.trim(body.email))) {
		return {msg: 'Email is required', status: 400}
	} else if (!validator.isEmail(body.email)) {
		return {msg: 'Email is invalid', status: 400}
	} else if (_.isEmpty(_.trim(body.phoneNo))) {
		return {msg: 'Phone number is required', status: 400}
	}

	return null
}