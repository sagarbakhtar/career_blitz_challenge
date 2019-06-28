import React from 'react';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LaunchIcon from '@material-ui/icons/Launch';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as api from './api';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class Companies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            companies: {}
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        api.getCompanies()
        .then(response => {
            const { data = {} } = response;
            this.setState({ isLoading: false, companies: data })
        });
    }

    getCompaniesGridXML = (companies) => {
        const response = [];
        for (const key in companies) {
            const {company_name = '', slug = ''} = companies[key];
            response.push(
            <Grid key={key} item xs={4}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {company_name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" component={AdapterLink} to={`job_listing/${slug}`}>
                            Job listings <LaunchIcon  style={{marginLeft: '4px'}}/>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>);
        }
        return response;
    }

    render() {
        const { isLoading, companies } = this.state;
        return (
            <Grid style={{marginTop: '15px'}} container spacing={3}>
                { isLoading && 
                    <Grid style={{textAlign: 'center'}} item xs={12}>
                        <CircularProgress />
                    </Grid>
                }

                { !isLoading && this.getCompaniesGridXML(companies) }
            </Grid>
        )
    }
}

export default Companies;