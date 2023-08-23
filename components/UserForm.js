import React, {useEffect, useState} from 'react'
import _ from 'lodash'

import Link from 'next/link'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

export default function UserForm(props) {

	const {form, setForm, isLoading, submit, onDelete} = props

	const [skill, setSkill] = useState('')
	const [hobbies, setHobbies] = useState('')

	useEffect(() => {

		if (!_.isEmpty(_.trim(skill)) && /,/.test(skill)) {
			persistSkill()
		}

	}, [skill])

	useEffect(() => {

		if (!_.isEmpty(_.trim(hobbies)) && /,/.test(hobbies)) {
			persistHobbies()
		}

	}, [hobbies])

	function updateForm (e) {
		const formClone = _.cloneDeep(form)
		formClone[e.target.name] = e.target.value
		setForm(formClone)
	}

	function removeSkill (i) {
		const formClone = _.cloneDeep(form)
		formClone.skillSet.splice(i, 1)
		setForm(formClone)
	}

	function removeHobby (i) {
		const formClone = _.cloneDeep(form)
		formClone.hobbies.splice(i, 1)
		setForm(formClone)
	}

	function listenForEnter(e) {
		if (e) {
			if (e.key === 'Enter') {
				e.stopPropagation()
				e.preventDefault()

				if (e.target.name === 'skill') {
					persistSkill()
				} else if (e.target.name === 'hobbies') {
					persistHobbies()
				}
			}
		}
	}

	function persistSkill () {
		const formClone = _.cloneDeep(form)
		formClone.skillSet.push(skill.replace(/,/, ''))
		formClone.skillSet = _.uniq(formClone.skillSet)
		setForm(formClone)
		setSkill('')
	}

	function persistHobbies () {
		const formClone = _.cloneDeep(form)
		formClone.hobbies.push(hobbies.replace(/,/, ''))
		formClone.hobbies = _.uniq(formClone.hobbies)
		setForm(formClone)
		setHobbies('')
	}

	return (
		<form onSubmit={submit} autoComplete="off">
			<TextField
				fullWidth
				required
				id={'username'}
				label="Username"
				margin={'normal'}
				variant="outlined"
				name={'username'}
				value={form.username}
				onChange={updateForm}
				InputProps={{autoComplete: 'off'}}
				InputLabelProps={{shrink: true}} />
			<TextField
				fullWidth
				required
				id={'email'}
				label="Email"
				type={'email'}
				margin={'normal'}
				variant="outlined"
				name={'email'}
				value={form.email}
				onChange={updateForm}
				InputProps={{autoComplete: 'off'}}
				InputLabelProps={{shrink: true}} />
			<TextField
				fullWidth
				required
				id={'phoneno'}
				label="Phone Number"
				margin={'normal'}
				variant="outlined"
				name={'phoneNo'}
				value={form.phoneNo}
				onChange={updateForm}
				InputProps={{autoComplete: 'off'}}
				InputLabelProps={{shrink: true}} />
			<TextField
				fullWidth
				label="Skill sets"
				margin={'normal'}
				variant="outlined"
				name={'skill'}
				value={skill}
				onChange={e => setSkill(e.target.value)}
				onKeyPress={listenForEnter}
				InputProps={{autoComplete: 'off'}}
				InputLabelProps={{shrink: true}}
				helperText={'Use , or enter to add the skill'} />
			<Box sx={{pb: 2, display: 'flex', justifyContent: 'flex-start', marginLeft: '-6px', marginRight: '-6px'}}>
				{
					form.skillSet.map((s, i) => {
						return <Chip key={i} label={s} onDelete={() => removeSkill(i)} sx={{ml: 1, mr: 1}} />
					})
				}
			</Box>
			<TextField
				fullWidth
				label="Hobbies"
				margin={'normal'}
				variant="outlined"
				name={'hobbies'}
				value={hobbies}
				onChange={e => setHobbies(e.target.value)}
				onKeyPress={listenForEnter}
				InputProps={{autoComplete: 'off'}}
				InputLabelProps={{shrink: true}}
				helperText={'Use , or enter to add the hobby'} />
			<Box sx={{pb: 2, display: 'flex', justifyContent: 'flex-start', marginLeft: '-6px', marginRight: '-6px'}}>
				{
					form.hobbies.map((h, i) => {
						return <Chip key={i} label={h} onDelete={() => removeHobby(i)} sx={{ml: 1, mr: 1}} />
					})
				}
			</Box>
			<Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
				<Link href={'/'} style={{color: 'inherit', textDecoration: 'none'}}>
					<Button variant={'text'} color={'inherit'} sx={{mr: 2}} disabled={isLoading}>Cancel</Button>
				</Link>
				{
					_.has(form, 'id') && !isNaN(form.id) && (
						<Button variant={'outlined'} color={'error'} sx={{mr: 2}} disabled={isLoading} onClick={onDelete}>
							Delete
						</Button>
					)
				}
				<Button type={'submit'} variant={'outlined'} disabled={isLoading}>Save</Button>
			</Box>
		</form>
	)
}
