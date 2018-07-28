import { Zoom } from 'material-ui/transitions';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';

<Zoom
    in={true}
    timeout={300}
    unmountOnExit
>
    <Button variant="fab" className={styles.fab} color="primary">
        <AddIcon />
    </Button>
</Zoom>
