import React from 'react';
import Grid from 'material-ui/Grid';
import { Layout } from '../../blocks/app';
import { Paper } from '../../blocks/common';
import * as Transactions from '../../blocks/transactions';
import styles from './styles.css';

const Dashboard = () => (
    <Layout>
		<Transactions.Search />
		
        <Grid container spacing={0} className={styles.container}>

			<Grid item lg={3}>
				<Transactions.Import />
				<Transactions.Export />
			</Grid>

			<Grid item lg={8}>
				<Paper bordered>
                	<Transactions.List />
				</Paper>
			</Grid>

		</Grid>

    </Layout>
);

export default Dashboard;