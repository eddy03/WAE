import {useState} from 'react'

import Link from 'next/link'

import {styled} from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import AccountCircle from '@mui/icons-material/AccountCircle'

const StyledAppbar = styled(AppBar)`
  background-color: #FFF;
  color: #000;

  a {
    text-decoration: none !important;
    color: inherit !important;
  }
`

const StyledMenu = styled(Menu)`
  a {
    text-decoration: none !important;
    color: inherit !important;
  }
`

export default function Navbar(props) {

	const [anchorEl, setAnchorEl] = useState(null)

	function handleMenu(e) {
		setAnchorEl(e.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	return (
		<StyledAppbar position="static">
			<Container>
				<Toolbar disableGutters>
					<Box sx={{flexGrow: 1}}>
						<Link href={'/'}>
							<Typography variant="h6" component="span">
								Etiqa Assignment
							</Typography>
						</Link>
					</Box>
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit">
							<AccountCircle />
						</IconButton>
						<StyledMenu
							keepMounted
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{vertical: 'top', horizontal: 'right'}}
							transformOrigin={{vertical: 'top', horizontal: 'right'}}
							open={Boolean(anchorEl)}
							onClose={handleClose}>
							<Link href={'/account'}>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
							</Link>
							<Link href={'/logout'}>
								<MenuItem onClick={handleClose}>Logout</MenuItem>
							</Link>
						</StyledMenu>
					</div>
				</Toolbar>
			</Container>
		</StyledAppbar>
	)

}
