import React from 'react';
import App from '../../layouts/App';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import styles from './Dashboard.css';
import Import from './Import';
import Export from './Export';
import TransactionList from '../../components/TransactionList';
import { Zoom } from 'material-ui/transitions';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Search from './Search';

export const Dashboard = () => (
	<App>

		<Search />

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