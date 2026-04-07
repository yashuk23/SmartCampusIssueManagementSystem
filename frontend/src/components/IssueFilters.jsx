const IssueFilters = ({ filters, onChange, categories }) => (
  <div className="section-card">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="eyebrow">Refine results</div>
        <h2 className="mt-3 text-xl font-semibold text-slate-950">Find issues faster</h2>
        <p className="mt-1 text-sm text-slate-500">Search by keyword, narrow by status, or focus on a category.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:min-w-[640px]">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Search</span>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Title, description, or assignee"
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
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  </div>
);

export default IssueFilters;
