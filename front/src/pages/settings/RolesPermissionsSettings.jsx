import { useState } from 'react';

import {
    Alert,
    Box, Button, Checkbox, FormGroup, Grid, Snackbar,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { useEffect } from 'react';
import { getRolesPermissions, updateRolesPermissions } from '../../services/AuthServices';



  
  function Row(props) {
    const { groupName, roles, permissionRoles, permissions, setPermissionRoleChecked, permissionRoleChecked } = props; 
    
    
    function handleChange(e){
        const {value, checked} = e.target;
        e.target.checked = !e.target.checked;
        setPermissionRoleChecked({...permissionRoleChecked, [value]:checked})

        
    }
    
    return (
      <React.Fragment>
 
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
           
         
                <Typography variant="h6" gutterBottom component="div">{groupName}</Typography>
             
                <Table >
                  <TableHead>
                    <TableRow>
                    <TableCell width={250}>#</TableCell>
      
                    
                        {
                            roles.map((role) => 
                          ( 
                          <> 
                            <TableCell key={role.id} >{role.nom}</TableCell>
                          </>
                          )
                                
                            )
                        }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell width={250}>{permission.description}</TableCell>
                        {/* <TableCell>{historyRow.customerId}</TableCell> */}
                      
                        {
                       
                            roles.map(role =>
                                {
                             
                                    var checked = permissionRoles.includes(permission.id+'_'+role.id) ? true : false;

                                    return(                            
                                        <TableCell ><Checkbox key={permission.id+'_'+role.id}  checked={ permissionRoleChecked[permission.id+'_'+role.id] ?? checked } onChange={handleChange} color="success" value={permission.id+'_'+role.id} name={permission.id+'_'+role.id} /> </TableCell>   
                                    )
                                })
                           
                        }
                     
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  

  


export default function RolesPermissionsSettings() {
    
    const [roles, setRoles] = useState([]);
    const [permissionGroups, setPermissionGroups] = useState([]);
    const [permissionRoles, setPermissionRoles] = useState([]);
    const [permissionRoleChecked, setPermissionRoleChecked] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const vertical = "top";
    const horizontal = "center";
    
    
    useEffect(  () => {
    
        getRolesPermissions().then( data => {
        
            setRoles(data.roles);
            setPermissionGroups(data.permissionGroups);
            setPermissionRoles(data.permissionRoles);
        
        });
       
    }, []);
    
    function handleSubmit (e){
        e.preventDefault();
        setAlertSuccess(false);
        setAlertError(false);
        
        
        updateRolesPermissions(permissionRoleChecked).then(data => {
            
            if(data.status == 200){
                setAlertSuccess(true);
                setMessageSuccess(data.message);
            }else{
                setAlertError(true);
                setMessageErrors(" Erreur: permissions non modifiées");
                
            }
            console.log(data);
        })
    }
    

    return (
    <>    
        <Paper>
        
        <FormGroup >
            {alertSuccess && (
             
                <Snackbar open={alertSuccess}  anchorOrigin={{ vertical, horizontal }}>
                   <Alert severity="success" onClose={() => setAlertSuccess(false) } my={3}>
                        <Typography variant="h6" component="h6" > {messageSuccess}  </Typography> 
                    </Alert>
                </Snackbar>
            )}
             {alertError && (
                <Snackbar open={alertError} autoHideDuration={6} anchorOrigin={{ vertical, horizontal }}>
                    <Alert severity="warning" onClose={() => setAlertError(false) } my={3}>
                    <Typography variant="h6" component="h6" > {messageErrors}  </Typography> 
                    </Alert>
                </Snackbar>
            )}
            
            <form onSubmit={handleSubmit}>
        
        
                <TableContainer component={Paper} sx={{ width: '100%', overflow: 'hidden' }}>
                    <Table stickyHeader aria-label="sticky table " >
                      <TableHead >
                        <TableRow>
                       
                          {/* <TableCell >#</TableCell>
                          <TableCell >Editeur</TableCell>
                          <TableCell >Administrateur</TableCell>
                          <TableCell >Comptable</TableCell>
                          <TableCell >Commercial</TableCell>
                           */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                            {permissionGroups.map((group) => (
                              <Row key={group.id}  roles = {roles} groupName={group.nom} permissionRoles={permissionRoles} permissions={group.permissions} setPermissionRoleChecked={setPermissionRoleChecked} permissionRoleChecked={permissionRoleChecked} />
                            ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                
                <Grid container direction="row" justifyContent="center">
                    <Grid item mt={10} mb={5}>
                        <Button type="submit" size="large"  variant="contained" color="success" endIcon={<EditIcon />}>
                            Enregistrer 
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormGroup>
        </Paper>
        
        
   
    </>
        
      );
};