import { ShoppingCartRounded } from '@mui/icons-material'
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../store/configerStore'

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

// const midLinks = [
//     { title: 'catalog', path: '/catalog' },
//     { title: 'about', path: '/about' },
//     { title: 'contact', path: '/contact' },
// ]

// const rightLinks = [
//     { title: 'login', path: '/login' },
//     { title: 'register', path: '/register' },
// ]

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': { color: 'grey.500' },
    '&.active': { color: 'black' }
}


export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket)

    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to='/' sx={navStyles}>
                        RE-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>


                <List sx={{ display: 'flex' }}>
                    <ListItem sx={navStyles} component={NavLink} to={'/catalog'}>
                        CATALOG
                    </ListItem>
                    <ListItem sx={navStyles} component={NavLink} to={'/about'}>
                        ABOUT
                    </ListItem>
                    <ListItem sx={navStyles} component={NavLink} to={'/contact'}>
                        CONTACT
                    </ListItem>
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCartRounded />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        <ListItem sx={navStyles}>
                            <NavLink to={'/login'} style={{ color: 'inherit', textDecoration: 'none' }}>
                                LOGIN
                            </NavLink>
                        </ListItem>
                        <ListItem sx={navStyles}>
                            <NavLink to={'/register'} style={{ color: 'inherit', textDecoration: 'none' }}>
                                REGISTER
                            </NavLink>
                        </ListItem>
                    </List>
                </Box>


            </Toolbar>
        </AppBar>
    )
}
