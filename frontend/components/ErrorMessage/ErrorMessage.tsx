import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const renderMessageArray = (errors) => {
    const constraints = errors
      .map((error) =>
        error.constraints ? Object.values(error.constraints) : error,
      )
      .flat()
      .map((constraint, idx) => <li key={idx}>{constraint}</li>);

    return <ul className={styles.ErrorList}>{constraints}</ul>;
  };

  return (
    <div className={styles.ErrorContainer}>
      <h1 className={styles.ErrorHeading}>Oops!</h1>
      {Array.isArray(message) ? renderMessageArray(message) : <p>{message}</p>}
    </div>
  );
};
