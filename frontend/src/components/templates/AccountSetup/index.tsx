import { Grid } from "@mui/material";
import './index.css';

interface AccountSetupTemplateProps {
content?:React.ReactElement,
button?:React.ReactElement
};


export const AccountSetupTemplate = (props:AccountSetupTemplateProps)=>{

    const {content, button} = props;

    return (
        <Grid container className="account-setup-template-grid" data-testid="account-setup-template-grid">
            <Grid item sm={3}></Grid>
            <Grid item sm={6}  sx={{padding:"0px 10%"}}>
                <div className="account-setup-template-content">
                    {content}
                </div>
                <div className="account-setp-template-footer">
                    {button}
                </div>
            </Grid>
            <Grid item sm={3}></Grid>
        </Grid>
    );
}