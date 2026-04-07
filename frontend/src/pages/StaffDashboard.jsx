import { CircleCheckBig, ClipboardList, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import IssueCard from "../components/IssueCard";
import IssueFilters from "../components/IssueFilters";
import Loader from "../components/Loader";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAssignedIssues, updateIssueStatus } from "../services/issueService";

const categories = ["hostel", "classroom", "lab", "library", "canteen", "transport", "electricity", "water", "cleanliness", "other"];

const StaffDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "", category: "" });

  const stats = useMemo(() => {
    const inProgressCount = issues.filter((issue) => issue.status === "in-progress").length;
    const resolvedCount = issues.filter((issue) => issue.status === "resolved").length;

    return [
      { label: "Assigned issues", value: issues.length, icon: ClipboardList, tone: "from-sky-50 to-blue-50 text-sky-800" },
      { label: "In progress", value: inProgressCount, icon: LoaderCircle, tone: "from-amber-50 to-orange-50 text-amber-800" },
      { label: "Resolved", value: resolvedCount, icon: CircleCheckBig, tone: "from-emerald-50 to-teal-50 text-emerald-800" }
    ];
  }, [issues]);

  const fetchIssues = async (activeFilters = filters) => {
    try {
      setLoading(true);
      const { issues: items } = await getAssignedIssues(activeFilters);
      setIssues(items);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch assigned issues");
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

  const handleStatusUpdate = async (issueId, status) => {
    try {
      await updateIssueStatus(issueId, { status });
      toast.success("Issue status updated");
      fetchIssues();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <DashboardLayout title="Staff Dashboard" subtitle="View assigned issues and update their resolution progress.">
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

      <div className="mt-6 space-y-4">
        <IssueFilters filters={filters} onChange={handleFilterChange} categories={categories} />
        {loading ? (
          <Loader label="Loading assigned issues..." />
        ) : issues.length ? (
          <div className="space-y-4">
            {issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={issue}
                actionSlot={
                  <select value={issue.status} onChange={(event) => handleStatusUpdate(issue._id, event.target.value)} className="select-field">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                }
              />
            ))}
          </div>
        ) : (
          <div className="section-card text-center">
            <h3 className="text-xl font-semibold text-slate-900">No assigned issues found</h3>
            <p className="mt-2 text-sm text-slate-500">When admins assign issues to you, they will appear here for action.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
