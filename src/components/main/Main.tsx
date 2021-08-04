import React from 'react';
import {ErrorSnackbar} from "../../features/errors/ErrorSnackbar";
import Container from "@material-ui/core/Container/Container";
import {Box} from "@material-ui/core";
import Typography from '@material-ui/core/Typography/Typography';

export const Main = () => {

    return (
        <Container maxWidth="sm">


            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    ХУИТА ЕБАНАЯ!
                </Typography>
            </Box>
            <ErrorSnackbar/>
        </Container>
    )
}