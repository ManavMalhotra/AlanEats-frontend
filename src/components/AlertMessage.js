import React, { useEffect } from 'react';
// import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

export function AlertMessage({ message }) {
    const { enqueueSnackbar } = useSnackbar();


    const handleClickVariant = (variant) => {
        enqueueSnackbar(message, { variant });
    };

    useEffect(() => {
        console.log("inside useEffect")
    }, [])
    return (
        <React.Fragment>
            {handleClickVariant('success')}
        </React.Fragment>
    );
}