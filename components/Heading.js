import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Heading(props) {

	return (
		<Box>
			<Typography variant={'h5'} sx={{pb: 4, pt: 2}}>
				{props.title}
			</Typography>
		</Box>
	)
}
