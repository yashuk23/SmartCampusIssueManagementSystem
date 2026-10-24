const IssueFilters = ({ filters, onChange, categories }) => (
  <section className="section-card filter-panel" aria-labelledby="filter-heading">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="dashboard-eyebrow">ISSUE TRACKER</div>
        <h2 id="filter-heading" className="mt-2 text-xl font-semibold text-slate-950">All reports</h2>
        <p className="mt-1 text-sm text-slate-500">Search and filter the reports in your workspace.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:min-w-[640px]">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Search</span>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Search issues..."
            aria-label="Search issues by title, description, or assignee"
            className="input-field"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Status</span>
          <select name="status" value={filters.status} onChange={onChange} className="select-field">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Category</span>
          <select name="category" value={filters.category} onChange={onChange} className="select-field">
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  </section>
);

export default IssueFilters;
