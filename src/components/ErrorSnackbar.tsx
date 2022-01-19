import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Snackbar} from "@mui/material";
import {AppStateType} from "../redux/store";
import {setAppError} from "../redux/app-reducer";
import MuiAlert, { AlertProps } from '@mui/material/Alert';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useSelector<AppStateType, string | null>(state => state.app.error);

    const dispatch = useDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError({error: null}));
    };

    const isOpen = error !== null;
    // const isOpen = true;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
