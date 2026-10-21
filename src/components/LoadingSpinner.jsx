function LoadingSpinner({ message = 'Loading movies...' }) {
  return (
    <div className="loading-spinner" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
