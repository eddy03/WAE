import {useState} from 'react'

import Head from 'next/head'
import Link from 'next/link'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import Navbar from '@comp/Navbar'
import Heading from '@comp/Heading'

export default function Home() {

  const [search, setSearch] = useState('')

  function submit (e) {
    e.preventDefault()
    e.stopPropagation()


  }

  return (
    <>
      <Head>
        <title>Search users | Etiqa Assignment</title>
        <meta name="description" content="Search Users | Etiqa Assignment" />
      </Head>
      <Navbar />
      <Container>
        <Heading title={'Search users'} />

        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Box sx={{flexGrow: 1, pr: 2}}>
            <form onSubmit={submit}>
              <TextField
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
                variant={'outlined'}
                label={'Search profile'}
                InputLabelProps={{shrink: true}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type={'submit'}>
                        <SearchOutlinedIcon/>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Box>
          <Box>
            <Link href={'/add-new'}>
              <Button
                fullWidth
                variant={'outlined'}
                size={'large'}>
                Add new
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  )
}
