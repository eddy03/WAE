import Head from 'next/head'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Navbar from '@comp/Navbar'
import Heading from '@comp/Heading'

export default function AddNew() {
	return (
		<>
			<Head>
				<title>Add new user | Etiqa Assignment</title>
				<meta name="description" content="Add new user | Etiqa Assignment" />
			</Head>
			<Navbar />
			<Container>
				<Heading title={'Add new user'} />
			</Container>
		</>
	)
}
