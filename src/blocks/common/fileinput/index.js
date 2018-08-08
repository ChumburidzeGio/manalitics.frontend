import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import styles from './styles.css';

const FileInput = ({ onChange, model, icon, placeholder, accept }) => {
  const IconComponent = icon;

  return (
    <Fragment>
      <input
        accept={accept}
        className={styles.input}
        onChange={onChange}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button component="span" className={styles.uploadButton} fullWidth color="primary">
          {!model ? (
            <Fragment>
              <IconComponent className={styles.uploadButtonIcon} />
              {placeholder}
            </Fragment>
          ) : model.name}
        </Button>
      </label>
    </Fragment>
  );
}

export default FileInput;