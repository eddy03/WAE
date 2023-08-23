import {useState} from 'react'

import Head from 'next/head'
import {useRouter} from 'next/router'

import Container from '@mui/material/Container'

import Navbar from '@comp/Navbar'
import Heading from '@comp/Heading'
import request from '@config/request'
import UserForm from '@comp/UserForm'

export default function AddNew() {

	const router = useRouter()

	const [form, setForm] = useState({
		username: '',
		email: '',
		phoneNo: '',
		skillSet: [],
		hobbies: []
	})

	const [isLoading, setIsloading] = useState(false)

	function submit (e) {
		e.preventDefault()
		e.stopPropagation()

		if (isLoading) {
			return null
		}

		// @todo improve validation UI/UX
		// if (!_.isEmpty(_.trim(form.username))) {
		//
		// } else if (!_.isEmpty(_.trim(form.email))) {
		//
		// } else if (!_.isEmpty(_.trim(form.phoneNo))) {
		//
		// }

		setIsloading(true)
		request.post('users', form)
			.then(res => router.push(`/?msg=${encodeURIComponent('User added')}&type=success`))
			.catch(err => {
				console.error(err.response?.data)
			})
			.finally(() => setIsloading(false))
	}

	return (
		<>
			<Head>
				<title>Add new user | Etiqa Assignment</title>
				<meta name="description" content="Add new user | Etiqa Assignment" />
			</Head>
			<Navbar />
			<Container>
				<Heading title={'Add new user'} />

				<UserForm
					form={form}
					setForm={setForm}
					isLoading={isLoading}
					submit={submit}
				/>

			</Container>
		</>
	)
}
