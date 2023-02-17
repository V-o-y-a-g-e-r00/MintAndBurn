import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    testSection: {
        display: "flex",
        overflow: "scroll",
        resize: "both",

        width: "calc(620px + 16.8px)",
        height: "800px"

    },

    mintandburnForm: {
        width: '100%',
        height: '46.625rem',

        padding: '3.125rem',
        background: 'blue',
        'border-radius': '2.5rem',
        '& .header' : {
            color: 'red'

        }
    }







});