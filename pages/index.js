import {useEffect, useState} from 'react'
import _ from 'lodash'

import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import Navbar from '@comp/Navbar'
import Heading from '@comp/Heading'
import request from '@config/request'

export default function Home() {

  const router = useRouter()

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [qs, setQs] = useState({})

  useEffect(() => {

    const qsClone = {}
    if (typeof window !== 'undefined') {
      window.location.search.replace(/^\?/, '').split('&').forEach(m => {
        const split = m.split('=')
        qsClone[split[0]] = decodeURIComponent(split[1])
      })
    }
    setQs(qsClone)

    query()

  }, [])

  function submit (e) {
    e.preventDefault()
    e.stopPropagation()

    query()
  }

  function query () {
    request.get('users', {params: {search}})
      .then(res => setResults(res.data))
      .catch(err => console.error(err.response?.data))
      .finally(() => {})
  }

  function closeAlert () {
    setQs({})
    router.replace('/')
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

        {
          !_.isEmpty(_.trim(qs.msg)) && !_.isEmpty(_.trim(qs.type)) && (
            <Alert severity={qs.type} sx={{mb: 5}} onClose={closeAlert}>{qs.msg}</Alert>
          )
        }

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
            <Link href={'/users'}>
              <Button
                fullWidth
                variant={'outlined'}
                size={'large'}>
                Add new
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{mt: 3}}>
          {
            _.isEmpty(results) ? (
              <Alert severity={'info'}>No results</Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Phone Number</TableCell>
                      <TableCell align="right">Skill sets</TableCell>
                      <TableCell align="right">Hobbies</TableCell>
                      <TableCell align="right" width={50}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      results.map(row => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">{row.username}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.phoneNo}</TableCell>
                          <TableCell align="right">{row.skillSet}</TableCell>
                          <TableCell align="right">{row.hobbies}</TableCell>
                          <TableCell align="right" width={50}>
                            <Link href={`/users/${row.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                              <IconButton>
                                <EditOutlinedIcon />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            )
          }
        </Box>
      </Container>
    </>
  )
}
