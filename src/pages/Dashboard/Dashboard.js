import React from 'react';
import App from '../../layouts/App';
import Paper from 'material-ui/Paper';
import styles from './Dashboard.css';
import Import from './Import';
import Export from './Export';

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

		<Paper className={styles.container} elevation={1}>
			<Import />
			<Export />
		</Paper>

	</App>
);

export default Dashboard;