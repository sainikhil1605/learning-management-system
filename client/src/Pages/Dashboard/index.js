import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useCallback, useEffect, useState } from 'react';
import {
  DashboardContainer,
  DashboardGrid,
  DashboardTile,
  LeftContainer,
  RightContainer,
} from './dashboard.styles';
import CountUp from 'react-countup';
import SchoolIcon from '@mui/icons-material/School';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleIcon from '@mui/icons-material/People';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextFieldContainer } from '../Login/login.styles';
import { apiGetCall, apiPostCall } from '../../utils/apiUtils';
import CustomTable from '../../Components/CustomTable';
import * as _ from 'lodash';
const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pageId } = useParams();
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {
      const postAdmin = async () => {
        const payload = {
          ...values,
          roles: 'admin',
        };
        try {
          const response = await apiPostCall('admin', payload);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      postAdmin();
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
      firstName: Yup.string().required('Required'),
      lastName: Yup.string(),
    }),
    validateOnBlur: true,
    // validateOnChange: true,
  });
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await apiGetCall('/admin');
      // response.data.email = response?.data.adminUserId?.email;
      const re = response?.data?.map((item) => {
        item.email = item.adminUserId.email;
        const recItem = _.omit(item, ['adminUserId']);
        return recItem;
      });
      setRows(re);
    };
    if (pageId === 'admin-management') {
      getData();
    }
  }, []);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const headCells = [
    {
      id: 'adminId',
      numeric: false,
      disablePadding: true,
      label: 'Admin Id',
    },
    {
      id: 'firstName',
      numeric: true,
      disablePadding: false,
      label: 'First Name',
    },
    {
      id: 'lastName',
      numeric: true,
      disablePadding: false,
      label: 'Last Name',
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: 'Email Id',
    },
  ];
  console.log(rows);
  const getDashboardUI = useCallback(() => {
    if (pageId === 'admin-management') {
      return (
        <DashboardContainer>
          <DashboardTile>
            {rows && rows.length > 0 && (
              <CustomTable
                headCells={headCells}
                rows={rows}
                uniqueId="adminId"
              />
            )}
          </DashboardTile>
          <DashboardTile>
            <Typography variant="h6">Add Admin</Typography>
            <form onSubmit={handleSubmit}>
              <TextFieldContainer>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email && true}
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password && true}
                />
              </TextFieldContainer>

              <TextFieldContainer>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  error={errors.firstName && true}
                />
              </TextFieldContainer>

              <TextFieldContainer>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  error={errors.lastName && true}
                />
              </TextFieldContainer>

              <Button type="submit">Submit</Button>
            </form>
          </DashboardTile>
        </DashboardContainer>
      );
    } else {
      return (
        <DashboardContainer>
          <DashboardGrid>
            <DashboardTile>
              <Typography variant="h5">
                <SchoolIcon fontSize="large" />
                <p>Number of Institutions</p>
              </Typography>
              <Typography variant="h6">
                {' '}
                <CountUp start={0} end={100} />
              </Typography>
            </DashboardTile>
            <DashboardTile>
              <Typography variant="h5">
                <Diversity3Icon fontSize="large" />
                <p>Number of Students</p>
              </Typography>
              <Typography variant="h6">
                <CountUp start={0} end={100} />
              </Typography>
            </DashboardTile>
            <DashboardTile>
              <Typography variant="h5">
                <PeopleIcon fontSize="large" />
                <p>Number of Teachers</p>
              </Typography>
              <Typography variant="h6">
                <CountUp start={0} end={100} />
              </Typography>
            </DashboardTile>

            {/* </LeftContainer> */}
          </DashboardGrid>

          <RightContainer>
            <Paper>
              <Typography variant="h5" style={{ padding: '20px' }}>
                <p>Colleges in the last 9 months</p>
              </Typography>
              <LineChart
                width={500}
                height={250}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </Paper>
          </RightContainer>
        </DashboardContainer>
      );
    }
  }, [data, pageId]);
  return (
    <div>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem key="dashboard" disablePadding>
              <ListItemButton onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem key="add-admin" disablePadding>
              <ListItemButton
                onClick={() => navigate('/dashboard/admin-management')}
              >
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Management" />
              </ListItemButton>
            </ListItem>
            <ListItem key="add-institution" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Instution" />
              </ListItemButton>
            </ListItem>
          </List>
          {/* <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            {/* <Button> */}
            <MenuIcon />
            {/* </Button> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageId === undefined
              ? 'Dashboard'
              : pageId
                  .split('-')
                  .map((e) => e.substring(0, 1).toUpperCase() + e.substring(1))
                  .join(' ')}
          </Typography>
          <Button color="inherit" style={{ textTransform: 'none' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {getDashboardUI()}
    </div>
  );
};

export default Dashboard;
