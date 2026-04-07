const Loader = ({ label = "Loading..." }) => (
  <div className="section-card">
    <div className="flex items-center justify-center gap-3 text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      <span className="font-medium">{label}</span>
    </div>
  </div>
);

export default Loader;
