import React, { Fragment } from 'react';
import { GRADES } from '../constants';

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
  if (!grade || grade.grade === GRADES.APPROVED) {
    return null;
  }

  const uiDiff = getDiff(grade.text, grade.diff);
  return (
    <Fragment>
      <div>
        {uiDiff.map((element, index) => {
          return (
            <span
              key={`user_${index}`}
              style={{ color: element.user !== element.original ? 'red' : '' }}
            >
              {element.user}
            </span>
          );
        })}
      </div>
      <div>
        {uiDiff.map((element, index) => {
          return (
            <span
              key={`original_${index}`}
              style={{
                color: element.user !== element.original ? 'green' : '',
              }}
            >
              {element.original}
            </span>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Diff;
