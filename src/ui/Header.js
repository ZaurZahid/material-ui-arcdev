import React, {useEffect} from 'react'
import ReactGA from 'react-ga'
import Link from '../Link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {useTheme} from '@material-ui/core/styles'
import {makeStyles} from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

function ElevationScroll(props) {
  const {children} = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const useStyle = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '4rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '3rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.85rem'
    }
  },
  logo: {
    height: '8rem',
    [theme.breakpoints.down('md')]: {
      height: '7rem'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5rem'
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab, //theme-dan goturur hamsini
    minWidth: 10,
    marginLeft: '20px'
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  },
  logoContainer: {
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0'
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    }
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px'
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0'
  },
  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    }
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  },
  drawerItemSelected: {
    '& ,.MuiListItemText-root': {
      opacity: 1
    }
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  }
}))

export default function Header(props) {
  const classes = useStyle()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [openMenu, setOpenMenu] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDraw, setOpenDraw] = React.useState(false)
  const [previousPage, setPreviousPage] = React.useState('')
  const handleChange = (e, newVal) => {
    props.setValue(newVal)
    // console.log(newVal)
  }
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }
  // console.log(e.currentTarget)

  const handleMenuClick = (e, index) => {
    props.setSelected(index)
  }
  const handleClose = (e) => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const menuOptions = [
    {name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0},
    {
      name: 'Custom Software Development',
      link: '/customsoftware',
      activeIndex: 1,
      selectedIndex: 1
    },
    {
      name: 'IOS/Android App Development',
      link: '/mobileapps',
      activeIndex: 1,
      selectedIndex: 2
    },
    {
      name: 'Website Development',
      link: '/websites',
      activeIndex: 1,
      selectedIndex: 3
    }
  ]

  const routes = [
    {name: 'Home', link: '/', activeIndex: 0},
    {
      name: 'Services',
      link: '/services',
      activeIndex: 1,
      ariaHasPopup: openMenu ? true : undefined,
      areaOwns: anchorEl ? 'simple-menu' : undefined,
      onMouseOver: (event) => handleClick(event)
    },
    {name: 'Revulation', link: '/revulation', activeIndex: 2},
    {name: 'About us', link: '/about', activeIndex: 3},
    {name: 'Contact', link: '/contact', activeIndex: 4},
    {name: 'Estimate', link: '/estimate', activeIndex: 5}
  ]
  useEffect(() => {
    if (previousPage !== window.location.pathname) {
      //sehife refresh olanda eleme icindekini ancaq seh deyisende bas verir icindeki
      setPreviousPage(window.location.pathname)
      ReactGA.pageview(window.location.pathname + window.location.search) //  mes /about bu gedir google analyticsde qeyd olunurki yeni bu sehifeye bas cekib
    }
    ;[...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex)
            if (route.selectedIndex && route.selectedIndex !== props.selected)
              props.setSelected(route.selectedIndex)
          }
          break
        case '/estimate':
          if (props.value !== 5) {
            props.setValue(5)
          }
          break
        default:
          break
      }
    })
  }, [props.value, menuOptions, props.selected, routes, props])
  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value === 5 ? 0 : props.value}
        onChange={handleChange}
        aria-label="simple tabs example"
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((opt, index) =>
          opt.name !== 'Estimate' ? (
            <Tab
              key={`Menu${opt.name}${index}`}
              className={classes.tab}
              component={Link}
              href={opt.link}
              label={opt.name}
              aria-haspopup={opt.ariaHasPopup}
              area-owns={opt.areaOwns}
              onMouseOver={opt.onMouseOver}
            />
          ) : null
        )}
      </Tabs>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{onMouseLeave: handleClose}}
        classes={{paper: classes.menu}}
        elevation={0}
        style={{zIndex: '1302'}}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            component={Link}
            href={option.link}
            onClick={(e) => {
              handleMenuClick(e, index)
              props.setValue(1)
              handleClose()
            }}
            selected={index === props.selected && props.value === 1}
            classes={{root: classes.menuItem}}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
      <Button
        variant="contained"
        color="secondary"
        style={{backgroundColor: props.value === 5 ? theme.palette.warning.dark : null}}
        className={classes.button}
        component={Link}
        href="/estimate"
        onClick={() => {
          props.setValue(5)
          ReactGA.event({
            category: 'Estimate',
            action: 'button in header'
          })
        }}
      >
        Free Estimate
      </Button>
    </React.Fragment>
  )
  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDraw}
        onClose={() => setOpenDraw(false)}
        onOpen={() => setOpenDraw(true)}
        classes={{paper: classes.drawer}}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((opt, index) =>
            opt.name !== 'Estimate' ? (
              <ListItem
                button
                divider
                onClick={() => {
                  setOpenDraw(false)
                  props.setValue(0)
                }}
                component={Link}
                selected={props.value === opt.activeIndex}
                href={opt.link}
                key={`List${opt.name}${index}`}
                classes={{selected: classes.drawerItemSelected}}
              >
                <ListItemText disableTypography className={classes.drawerItem}>
                  {opt.name}
                </ListItemText>
              </ListItem>
            ) : null
          )}
          <ListItem
            button
            divider
            onClick={() => {
              setOpenDraw(false)
              props.setValue(5)
              ReactGA.event({
                category: 'Estimate',
                action: 'button in drawer (mobile)'
              })
            }}
            component={Link}
            href="/estimate"
            selected={props.value === 5}
            classes={{root: classes.drawerItemEstimate}}
            style={{backgroundColor: props.value === 5 ? theme.palette.warning.dark : null}}
          >
            <ListItemText
              disableTypography
              className={classes.drawerItem}
              component={Link}
              href="/estimate"
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDraw(!openDraw)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar color="primary" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              href="/"
              className={classes.logoContainer}
              onClick={() => props.setValue(0)}
              disableRipple
            >
              <img src="/assets/logo.svg" className={classes.logo} alt="company logo" />
            </Button>
            <Hidden mdDown>{tabs}</Hidden>
            <Hidden lgUp>{drawer}</Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}
