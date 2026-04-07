import { Clock3, ListChecks, UserRoundCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import IssueCard from "../components/IssueCard";
import IssueFilters from "../components/IssueFilters";
import Loader from "../components/Loader";
import DashboardLayout from "../layouts/DashboardLayout";
import { assignIssue, getAllIssues } from "../services/issueService";

const categories = ["hostel", "classroom", "lab", "library", "canteen", "transport", "electricity", "water", "cleanliness", "other"];

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "", category: "" });

  const stats = useMemo(() => {
    const unassigned = issues.filter((issue) => !issue.assignedTo).length;

    return [
      { label: "All issues", value: issues.length, icon: ListChecks, tone: "from-sky-50 to-blue-50 text-sky-800" },
      { label: "Unassigned", value: unassigned, icon: Clock3, tone: "from-amber-50 to-orange-50 text-amber-800" },
      { label: "Available staff", value: staff.length, icon: UserRoundCheck, tone: "from-emerald-50 to-teal-50 text-emerald-800" }
    ];
  }, [issues, staff]);

  const fetchIssues = async (activeFilters = filters) => {
    try {
      setLoading(true);
      const data = await getAllIssues(activeFilters);
      setIssues(data.issues);
      setStaff(data.staff);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load issues");
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

  const handleAssign = async (issueId, staffId) => {
    if (!staffId) {
      toast.error("Select a staff member first");
      return;
    }

    try {
      await assignIssue(issueId, { staffId });
      toast.success("Issue assigned successfully");
      fetchIssues();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign issue");
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Monitor all issues and assign them to the right staff members.">
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
          <Loader label="Loading all campus issues..." />
        ) : issues.length ? (
          <div className="space-y-4">
            {issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={issue}
                actionSlot={
                  <select defaultValue={issue.assignedTo?._id || ""} onChange={(event) => handleAssign(issue._id, event.target.value)} className="select-field">
                    <option value="">Assign staff</option>
                    {staff.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                }
              />
            ))}
          </div>
        ) : (
          <div className="section-card text-center">
            <h3 className="text-xl font-semibold text-slate-900">No issues found</h3>
            <p className="mt-2 text-sm text-slate-500">Try changing the filters to broaden the result set.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
