import {Container, Paper, styled,} from '@mui/material';
import React from 'react';


function Settings() {


    return (
        <Container maxWidth="xl">
            <GeneralSettings elevation={10}>
                <h3>General</h3>
            </GeneralSettings>
        </Container>
    );
}

export default Settings;

const GeneralSettings = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 50px auto;
  
  h3{
    margin-left: 30px;
  }
  
`

