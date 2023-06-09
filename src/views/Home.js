import React, { useEffect } from 'react'
import { Typography, Box, Paper, Button,CircularProgress} from '@mui/material'
import { ResponsiveTypography } from '../components/ResponsiveTypography'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase';
import { Image } from '../components/Image'




export const Home = () => {
const { authUser, loading } = useAuth()
const navigate = useNavigate()

useEffect(() => {
  if (loading) {
    return;
  }

  if (!authUser) {
    navigate('/signin')
  } 

}, [authUser, navigate, loading])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      //Sign-out successful
    }).catch((error) => {
      //An error happened
    })
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ResponsiveTypography type='title'>
        Welcome to Britzky's Dungeon
      </ResponsiveTypography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center'}}
      >
      <Image
        src={'./images/home.jpg'} 
        type={'home'}
        slug={'home'}
        sx={{
          width: {
            xs: 350,
            md: 800
          },
          height: {
            xs: 350,
            md: 500
          },
        }}
        />
      </Box>
    </Box>
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        marginTop: '2em',
        p: 2
      }}
    >
      <Typography variant="body2">
        Select New Character to create a new character or View Characters to see the ones you have saved.
      </Typography>
      <hr width="100%"/>
      <Link to="/newcharacter">
        <Button
          size="large"
          sx={{
            color: '#fdf0d5',
            '&:hover':{
              backgroundColor: '#669bbc'
            } 
          }}
        >
          New Character
        </Button>
      </Link>
      <Link to="viewcharacters">
        <Button
          size="large"
          sx={{
            color: '#fdf0d5',
            '&:hover':{
              backgroundColor: '#669bbc'
            } 
          }}
        >
          View Characters
        </Button>
      </Link>
      <Link to='signin'>
        <Button
          size="small"
          onClick={handleSignOut} 
          sx={{
            color: '#fdf0d5',
            '&:hover':{
              backgroundColor: '#c1121f'
            } 
          }}
        >
          Logout
        </Button>
      </Link>
    </Paper>
    </Box>

    </>
  )
}

