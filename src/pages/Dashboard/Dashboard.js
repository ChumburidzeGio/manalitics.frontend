import React from 'react';
import App from '../../layouts/App';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import styles from './Dashboard.css';
import Import from './Import';
import Export from './Export';
import TransactionList from './TransactionList';

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
		<Grid container className={styles.root} spacing={0}>
			
			<Grid item lg={8}>
				<TransactionList />
			</Grid>

			<Grid item lg={4}>
				<Paper className={styles.container} elevation={1}>
					<List component="nav">
						<Import />
						<Export />
					</List>
				</Paper>
			</Grid>

		</Grid>
	</App>
);

export default Dashboard;