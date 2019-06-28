import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as api from './api';

class JobListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            company_details: {},
            job_listings: []
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const company_slug = this.props.match.params.company_slug
        api.getJobListings(company_slug)
        .then(response => {
            const { data = {} } = response;
            const { company_details = {}, job_listings = []} = data; 
            this.setState({ isLoading: false, company_details, job_listings });
        });
    }

    getJobListingsGridXML = (company_details, job_listings) => {
        const response = [];
        const { company_name = '' } = company_details;
        for (const key in job_listings) {
            const {position_title = '', location = '', listing_original_url = ''} = job_listings[key];
            response.push(
            <Grid key={key} item xs={4}>
                <Card>                
                    <CardContent style={{ minHeight: '170px'}}>
                        <Typography gutterBottom variant="h6" component="h4" gutterBottom>
                            {position_title}
                        </Typography>
                        <Typography color="textSecondary">
                            {company_name}
                        </Typography>
                        <Typography color="textSecondary">
                            {location}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link target="_blank" href={listing_original_url}> View listing </Link>
                    </CardActions>
                </Card>
            </Grid>);
        }
        return response;
    }

    render() {
        const { isLoading, company_details, job_listings } = this.state;
        return (
            <Grid style={{marginTop: '15px'}} container spacing={3}>
                { isLoading && 
                    <Grid style={{textAlign: 'center'}} item xs={12}>
                        <CircularProgress />
                    </Grid>
                }

                { !isLoading && this.getJobListingsGridXML(company_details, job_listings) }
            </Grid>
        )
    }
}

export default JobListings;