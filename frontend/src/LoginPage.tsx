import {Box, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
});
export default function LoginPage() {

    return (

        <FormContainer className="form-container" onSubmit={onLogIn} sx={{maxWidth: 600, mx: "auto"}}>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                <TextField id="input-with-sx" label="With sx" variant="standard"/>
            </Box>
        </FormContainer>
    )
}