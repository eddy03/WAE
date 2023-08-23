import Head from 'next/head'

import Navbar from '@comp/Navbar'

export default function Profile() {
	return (
		<>
			<Head>
				<title>Etiqa Assignment</title>
				<meta name="description" content="Etiqa Assignment" />
			</Head>
			<div>
				<Navbar />
			</div>
		</>
	)
}
