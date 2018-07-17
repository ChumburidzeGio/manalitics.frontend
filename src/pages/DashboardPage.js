import React from 'react'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import App from '../layouts/App'
import client from '../client'
import { connect } from 'react-redux'
import { showSnack, hideSnack } from '../state/snackbarActions'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import HotelIcon from 'material-ui-icons/Hotel'
import ListSubheader from 'material-ui/List/ListSubheader'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog'
import XSelect from '../components/XSelect';
import CloudUpload from 'material-ui-icons/CloudUpload';
import { loadTransactions } from '../state/transactions';
import moment from 'moment';

const styles = ({
    search: {
        '&:before': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
    },
    searchInput: {
        padding: '15px'
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '90%',
        margin: '30px auto 30px',
        borderRadius: '3px'
    },
    uploadButton: {
        marginTop: '25px',
        border: '1px solid #2196f3',
    },
    uploadButtonIcon: {
      marginRight: '10px'
    },
    hiddenInput: {
        display: 'none',
    },
    modal: {
        '&>div': {
            overflow: 'visible'
        }
    },
    listItem: {
        borderBottom: '1px solid #33333314',
        '&>h3': {
            fontSize: '14px'
        }
    },
    drawerList: {
        width: 400,
        maxWidth: '95vw'
    },
    drawerDetails: {
        padding: '10px 20px'
    }
})

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            searchResults: [],
            isInvModalOpened: false,
            file: '',
            bank_options: [
                {
                    label: 'Ing Netherlands',
                    value: 'ing.nl',
                },
                {
                    label: 'Ing Poland',
                    value: 'ing.pl',
                },
                {
                    label: 'TBC Bank Georgia',
                    value: 'tbcbank',
                }
            ],
            bank: null,
            exportModalOpen: false,
            exportLink: null,
        }
    }

    componentDidMount = () => {
        this.props.loadTransactions()
    }

    handleTransactionClick = (id) => {
        this.setState({transactionsDrawer: true, drawerLoading: true, drawerData: {}});

        client().get('transaction.details?id=' + id).then(({data}) => {
            this.setState({drawerData: data.transaction})
        }).catch(error => {
            
        });
    };

    handleUploadNew = () => {
        this.setState({isInvModalOpened: !this.state.isInvModalOpened});
    };

    loadMore = () => {
        this.props.loadTransactions(2);
    };

    handleExport = () => {
        this.setState({exportModalOpen: true});
        this.setState({exportLink: '/export.toFile?token='})
    };

    handleImport = () => {

        const formData = new FormData();

        formData.append('file',this.state.file);
        formData.append('bank',this.state.bank);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        this.props.showSnack('Importing transactions...', 100000, 'progress');

        client().post('import.fromFile', formData, config).then(({data}) => {
            this.props.hideSnack('progress');
            this.props.showSnack('Succesfully imported all your transactions!');
            this.props.loadTransactions();
            this.setState({
                bank: null,
                file: '',
                isInvModalOpened: false
            });
        }).catch(error => {
            console.log(error);
            this.props.hideSnack('progress');
            this.props.showSnack('Something went wrong, please check if you picked correct file and bank');
        });

    };

    handleClose = () => {
        this.setState({isInvModalOpened: false});
    } 

    handleCloseExport = () => {
        this.setState({exportModalOpen: !this.state.exportModalOpen});
    }

    handleChangeX = (name, value) => {
        this.setState({[name]: value});
    }

    handleChangeFileInput = (name) => event => this.setState({ [name]: event.target.files[0] });

    transformDay(day) {
        return moment(day).calendar(null, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: 'DD MMM YYYY',
            sameElse: 'DD MMM YYYY'
        });
    } 

    toggleDrawer = (open) => () => {
        this.setState({
            transactionsDrawer: open,
        });
    };

    search = (event) => {

        let query = event.target.value;

        let params = {};

        params.query = query.toLowerCase().split(" ").filter(piece => {

            if(piece.startsWith('bank:')) {
                params.bank = piece.replace('bank:', '');
                return false;
            }

            if(piece.startsWith('from:')) {
                params.from = piece.replace('from:', '');
                return false;
            }

            if(piece.startsWith('to:')) {
                params.to = piece.replace('to:', '');
                return false;
            }

            return true;

        }).join(' ');
        
        client().post('/search', params).then(({data}) => {
            this.setState({ searchResults: data.transactions || [] });
        }).catch(error => {
            throw(error)
        })

        this.setState({ searchQuery: query });
    }

    render() {

        const { classes, transactions } = this.props

        return (
            <App>
                
                <TextField
                    id="search"
                    placeholder="Search for resources and product types"
                    type="search"
                    InputProps={{
                        classes: {
                            root: classes.search,
                            input: classes.searchInput
                        },
                    }}
                    autoFocus
                    onChange={this.search}
                    value={this.state.searchQuery}
                    fullWidth
                />

                <Paper className={classes.container} elevation={1}>
                    <Button onClick={this.handleUploadNew} color="primary">
                        Import transactions
                    </Button>
                    <Button onClick={this.handleExport} color="primary">
                        Export transactions
                    </Button>
                </Paper>

                
                <Paper className={classes.container} elevation={1}>
                    
                    {this.state.searchQuery ? 
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader component="div" disableSticky={true}>Search results</ListSubheader>
                        }>

                        {this.state.searchResults.map(item => {
                                return (
                                    <ListItem onClick={this.handleInventoryClick} button key={item.id}>
                                        <Avatar>
                                            <HotelIcon />
                                        </Avatar>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={(item.is_expense ? '-' : '') + item.amount + ' ' + item.currency + ' · ' + item.date + ' · ' + item.description}
                                            className={classes.listItem}/>
                                    </ListItem>
                                )
                        })}

                    </List>
                    :
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader component="div" disableSticky={true}>My transactions</ListSubheader>
                        }>

                        {transactions.items && transactions.items.map(group => {
                            return (
                                <div key={group.day}>
                                    <ListSubheader disableSticky={true} style={{color: '#3b5998'}}>
                                        {this.transformDay(group.day)}
                                    </ListSubheader>
                                    {group.items.map(item => {
                                        return (
                                            <ListItem onClick={this.handleTransactionClick.bind(this, item.id)} button key={item.id}>
                                                {/* <Avatar>
                                                    <HotelIcon />
                                                </Avatar> */}
                                                <ListItemText
                                                    primary={item.title}
                                                    className={classes.listItem}/>
                                                    <ListItemText
                                                        primary={(item.is_expense ? '-' : '') + item.amount + ' ' + item.currency}
                                                        className={classes.listItem}
                                                        style={{textAlign: 'right'}}/>
                                            </ListItem>
                                        )
                                    })}
                                </div>
                            );
                        })}

                        <Button component="span" fullWidth color="primary" onClick={this.loadMore}>
                            Load more
                        </Button>


                    </List>}

                </Paper>

                        <Dialog
                            open={this.state.isInvModalOpened}
                            onClose={this.handleClose}
                            className={classes.modal}
                        >
                            <DialogTitle id="alert-dialog-title">Upload File With Transactions</DialogTitle>

                            <DialogContent style={{overflow:'visible'}}>

                                <DialogContentText>
                                    Please choose the file you want to upload. File should be type of .csv or .xlsx.
                                </DialogContentText>

                                <XSelect label={'Select your bank'} name={'bank'} value={this.state.bank} options={this.state.bank_options} onChange={this.handleChangeX}/>

                                    <div>
                                        <input
                                            accept=".csv, .xlsx"
                                            className={classes.hiddenInput}
                                            onChange={this.handleChangeFileInput('file')}
                                            id="raised-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="raised-button-file">
                                            <Button component="span" className={classes.uploadButton} fullWidth color="primary">
                                                {!this.state.file ?
                                                    <React.Fragment>
                                                        <CloudUpload className={classes.uploadButtonIcon}/> Pick the file
                                                    </React.Fragment>
                                                 : this.state.file.name}
                                            </Button>
                                        </label>
                                    </div>

                            </DialogContent>

                            <DialogActions>
                                <Button onClick={this.handleClose}>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleImport} color="primary" autoFocus>
                                    Upload
                                </Button>
                            </DialogActions>
                        </Dialog>



                        <Dialog
                            open={this.state.exportModalOpen}
                            onClose={this.handleCloseExport}
                        >
                            <DialogTitle id="alert-dialog-title">Download File With Transactions</DialogTitle>

                            <DialogContent>

                                <DialogContentText>
                                    Click download button bellow and get the Excel file with all your transactions.
                                </DialogContentText>

                            </DialogContent>

                            <DialogActions>
                                <Button onClick={this.handleCloseExport}>
                                    Cancel
                                </Button>
                                <Button href={this.state.exportLink} target="_blank" color="primary">
                                    Download
                                </Button>
                            </DialogActions>
                        </Dialog>
                        

                        <Drawer open={this.state.transactionsDrawer} onClose={this.toggleDrawer(false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                                className={classes.drawerList}
                            >
                                {this.state.drawerData && <List>
                                    <ListItem>
                                        <Avatar className={classes.avatar}>H</Avatar>
                                        <ListItemText primary={this.state.drawerData.title} secondary={this.state.drawerData.bank} />
                                    </ListItem>
                                    
                                    <div className={classes.drawerDetails}>

                                        <Typography gutterBottom>
                                            <strong>Transaction:</strong> {this.state.drawerData.is_expense && '-'}{this.state.drawerData.amount} {this.state.drawerData.currency}
                                        </Typography>

                                        <Typography gutterBottom>
                                            <strong>Date:</strong> {this.state.drawerData.date}
                                        </Typography>

                                        <Typography gutterBottom>
                                            <strong>Type:</strong> {this.state.drawerData.type}
                                        </Typography>

                                        <Typography gutterBottom>
                                            <strong>Description:</strong> {this.state.drawerData.description}
                                        </Typography>

                                    </div>

                                </List>}
                            </div>
                        </Drawer>

            </App>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    transactions: state.transactionReducer
});

export default withStyles(styles)(withRoot(
    connect(mapStateToProps, {showSnack, hideSnack, loadTransactions})(DashboardPage)
))
