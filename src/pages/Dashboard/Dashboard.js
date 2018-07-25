import React from 'react';
import App from '../../layouts/App';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import styles from './Dashboard.css';
import Import from './Import';
import Export from './Export';
import TransactionList from './TransactionList';
import { Zoom } from 'material-ui/transitions';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

export const Dashboard = () => (
	<App>

		{/* <FormControl fullWidth>
			<Input
				id="name-simple"
				type="search"
				autoFocus
				placeholder="Search for resources and product types"
				value={this.state.searchQuery}
				onChange={this.search}
				className={styles.searchInput}
			/>
		</FormControl> */}
		<Grid container className={styles.root} spacing={24}>
			
			<Grid item lg={3} className={styles.gridElement}>
					<List component="nav" className={styles.container}>
						<Import />
						<Export />
					</List>
			</Grid>

			<Grid item lg={8} className={styles.gridElement}>
				<TransactionList />
			</Grid>

		</Grid>

		<Zoom
          in={true}
          timeout={300}
          unmountOnExit
        >
          <Button variant="fab" className={styles.fab} color="primary">
                <AddIcon />
          </Button>
        </Zoom>

	</App>
);

export default Dashboard;