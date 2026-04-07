import { CircleCheckBig, ClipboardPenLine, Clock3, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import IssueCard from "../components/IssueCard";
import IssueFilters from "../components/IssueFilters";
import Loader from "../components/Loader";
import DashboardLayout from "../layouts/DashboardLayout";
import { createIssue, getMyIssues } from "../services/issueService";

const categories = ["hostel", "classroom", "lab", "library", "canteen", "transport", "electricity", "water", "cleanliness", "other"];

const StudentDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "", category: "" });
  const [formData, setFormData] = useState({ title: "", description: "", category: "hostel" });

  const stats = useMemo(() => {
    const pendingCount = issues.filter((issue) => issue.status === "pending").length;
    const resolvedCount = issues.filter((issue) => issue.status === "resolved").length;

    return [
      { label: "Total reports", value: issues.length, icon: ClipboardPenLine, tone: "from-sky-50 to-blue-50 text-sky-800" },
      { label: "Awaiting action", value: pendingCount, icon: Clock3, tone: "from-amber-50 to-orange-50 text-amber-800" },
      { label: "Resolved", value: resolvedCount, icon: CircleCheckBig, tone: "from-emerald-50 to-teal-50 text-emerald-800" }
    ];
  }, [issues]);

  const fetchIssues = async (activeFilters = filters) => {
    try {
      setLoading(true);
      const { issues: items } = await getMyIssues(activeFilters);
      setIssues(items);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleFilterChange = (event) => {
    const nextFilters = { ...filters, [event.target.name]: event.target.value };
    setFilters(nextFilters);
    fetchIssues(nextFilters);
  };

  const handleFormChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await createIssue(formData);
      toast.success("Issue submitted successfully");
      setFormData({ title: "", description: "", category: "hostel" });
      fetchIssues();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create issue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Student Dashboard" subtitle="Create issues and track their progress in one place.">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className={`stat-card bg-gradient-to-br ${tone}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                <Icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[400px_1fr]">
        <form className="section-card space-y-5" onSubmit={handleSubmit}>
          <div>
            <div className="eyebrow">New report</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Report a campus issue</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Share what happened, where it happened, and enough context so the right team can respond quickly.</p>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Issue title</span>
            <input
              type="text"
              name="title"
              placeholder="Example: Water leakage near Block B staircase"
              value={formData.title}
              onChange={handleFormChange}
              required
              className="input-field"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Description</span>
            <textarea
              name="description"
              placeholder="Describe what you noticed, how urgent it is, and any useful location details."
              value={formData.description}
              onChange={handleFormChange}
              required
              rows={5}
              className="textarea-field"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <select name="category" value={formData.category} onChange={handleFormChange} className="select-field">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <div className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm text-sky-900">
            Clear issue titles and location details usually lead to faster assignment.
          </div>
          <button type="submit" disabled={submitting} className="primary-btn w-full">
            {submitting ? "Submitting..." : "Submit issue"}
            {!submitting && <Send size={18} />}
          </button>
        </form>
        <div className="space-y-4">
          <IssueFilters filters={filters} onChange={handleFilterChange} categories={categories} />
          {loading ? (
            <Loader label="Loading your issues..." />
          ) : issues.length ? (
            <div className="space-y-4">
              {issues.map((issue) => (
                <IssueCard key={issue._id} issue={issue} />
              ))}
            </div>
          ) : (
            <div className="section-card text-center">
              <h3 className="text-xl font-semibold text-slate-900">No issues found</h3>
              <p className="mt-2 text-sm text-slate-500">Try adjusting your filters or submit a new report to get started.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
