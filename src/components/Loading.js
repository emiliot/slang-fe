import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WatchLaterIcon from '@material-ui/icons/WatchLaterOutlined';
const useStyles = makeStyles({
  root: {
    marginTop: '35vh',
  },
});

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <WatchLaterIcon fontSize='large' />
    </div>
  );
};

export default Loading;
