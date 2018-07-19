import React from 'react';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import App from '../../layouts/App';
import styles from './Dashboard.css';
import Import from './Import';

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

		{/* <Paper className={styles.container} elevation={1}>
			<Import />
			<Export />
		</Paper> */}

	</App>
);

export default Dashboard;