import {useEffect, useState} from 'react'
import _ from 'lodash'

import Head from 'next/head'
import {useRouter} from 'next/router'

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Navbar from '@comp/Navbar'
import Heading from '@comp/Heading'
import UserForm from '@comp/UserForm'
import request from '@config/request'

export default function Update(props) {

	const router = useRouter()

	const [form, setForm] = useState({
		id: null,
		username: '',
		email: '',
		phoneNo: '',
		skillSet: [],
		hobbies: []
	})
	const [isLoading, setIsloading] = useState(false)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	useEffect(() => {

		const match = window.location.pathname.match(/\/(\d)$/)
		if (match && !isNaN(parseInt(match[1]))) {
			setIsloading(true)
			request.get(`users/${match[1]}`)
				.then(res => {
					const formClone = {..._.pick(res.data, _.keys(form))}
					if (_.isObject(formClone.skillSet) && _.isEmpty(formClone.skillSet)) {
						formClone.skillSet = []
					}
					if (_.isObject(formClone.hobbies) && _.isEmpty(formClone.hobbies)) {
						formClone.hobbies = []
					}

					setForm(formClone)
				})
				.catch(err => {
					console.error(err.response?.data)
				})
				.finally(() => setIsloading(false))
		} else {
			console.log('not found')
		}

	}, [])

	function submit(e) {
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
		request.put(`users/${form.id}`, form)
			.then(() => router.push(`/?msg=${encodeURIComponent('User updated')}&type=success`))
			.catch(err => {
				console.error(err.response?.data)
			})
			.finally(() => setIsloading(false))
	}

	function confirmDelete () {
		setIsloading(true)
		request.delete(`users/${form.id}`)
			.then(() => router.push(`/?msg=${encodeURIComponent('User deleted')}&type=success`))
			.catch(err => {
				console.error(err.response?.data)
			})
			.finally(() => setIsloading(false))
	}

	return (
		<>
			<Head>
				<title>Update user | Etiqa Assignment</title>
				<meta name="description" content="Update user | Etiqa Assignment"/>
			</Head>
			<Navbar/>
			<Container>
				<Heading title={'Update user'}/>

				<UserForm
					form={form}
					setForm={setForm}
					isLoading={isLoading}
					submit={submit}
					onDelete={() => setShowConfirmDelete(true)}
				/>

				<Dialog open={showConfirmDelete} fullWidth onClose={() => setShowConfirmDelete(false)} maxWidth={'sm'}>
					<DialogTitle>
						Confirm to delete this user
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you confirm to delete this user?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							variant={'text'}
							color={'inherit'}
							onClick={() => setShowConfirmDelete(false)}>
							Cancel
						</Button>
						<Button
							variant={'outlined'}
							color={'error'}
							onClick={confirmDelete}>
							Yes, confirm
						</Button>
					</DialogActions>
				</Dialog>

			</Container>
		</>
	)
}
