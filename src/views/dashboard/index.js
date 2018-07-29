import React from 'react';
import Grid from 'material-ui/Grid';
import { Layout } from '../../blocks/app';
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
				<div className={styles.transactions}>
                	<Transactions.List />
				</div>
			</Grid>

		</Grid>

    </Layout>
);

export default Dashboard;