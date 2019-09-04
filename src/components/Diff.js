import React, { Fragment } from 'react';
import { GRADES } from '../constants';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  success: {
    color: green[600],
    margin: '0 1vw',
  },
  error: {
    color: theme.palette.error.dark,
    margin: '0 1vw',
  },
  root: {
    marginTop: '3vh',
  },
  diff: {
    marginTop: '1.5vh',
  },
}));

const getDiff = (text, diff) => {
  const hashedDiff = diff.reduce(
    (hash, element) => ({
      ...hash,
      [element.index]: element,
    }),
    {},
  );

  return text.split('').map((char, index) => {
    let result = {
      original: char,
      user: char,
    };

    if (hashedDiff[index]) {
      result.user = hashedDiff[index].user;
    }

    return result;
  });
};

const Diff = ({ grade }) => {
  const classes = useStyles();
  if (!grade || grade.grade === GRADES.APPROVED) {
    return null;
  }
  const uiDiff = getDiff(grade.text, grade.diff);
  return (
    <Fragment>
      <div className={classes.root}>
        {uiDiff.map((element, index) => {
          const cls = element.user !== element.original ? classes.error : {};
          return (
            <span key={`user_${index}`} className={cls}>
              {element.user}
            </span>
          );
        })}
      </div>
      <div className={classes.diff}>
        {uiDiff.map((element, index) => {
          const cls = element.user !== element.original ? classes.success : {};
          return (
            <span key={`original_${index}`} className={cls}>
              {element.original}
            </span>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Diff;
