const Loader = ({ label = "Loading..." }) => (
  <div className="loading-state" role="status" aria-live="polite">
    <div className="loading-state-heading">
      <span className="loading-spinner" />
      <span>{label}</span>
    </div>
    <div className="skeleton-card" />
    <div className="skeleton-card skeleton-card-short" />
  </div>
);

export default Loader;
