import { CalendarClock, CircleCheckBig, CircleDashed, CircleEllipsis, Tag, UserRound } from "lucide-react";

const statusClasses = {
  pending: "bg-amber-100 text-amber-800",
  "in-progress": "bg-sky-100 text-sky-800",
  resolved: "bg-emerald-100 text-emerald-800"
};

const statusIcons = {
  pending: CircleDashed,
  "in-progress": CircleEllipsis,
  resolved: CircleCheckBig
};

const formatLabel = (value) =>
  value
    ?.split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

const metaPillClass = "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600";

const IssueCard = ({ issue, actionSlot }) => {
  const StatusIcon = statusIcons[issue.status] || CircleDashed;
  const createdAt = new Date(issue.createdAt);
  const createdDate = Number.isNaN(createdAt.getTime())
    ? "Date unavailable"
    : createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  return (
    <article className="section-card issue-card">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`status-badge ${statusClasses[issue.status] || "bg-slate-100 text-slate-700"}`}>
              <StatusIcon size={14} className="mr-1.5" />
              {formatLabel(issue.status)}
            </span>
            <span className={metaPillClass}>
              <Tag size={13} />
              {formatLabel(issue.category)}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-950">{issue.title}</h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600 md:text-base">{issue.description}</p>
        </div>

        {actionSlot && <div className="w-full lg:w-auto lg:min-w-[190px]">{actionSlot}</div>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {issue.createdBy?.name && (
          <span className={metaPillClass}>
            <UserRound size={13} />
            Reported by {issue.createdBy.name}
          </span>
        )}
        {issue.assignedTo?.name && (
          <span className={metaPillClass}>
            <UserRound size={13} />
            Assigned to {issue.assignedTo.name}
          </span>
        )}
        <span className={metaPillClass}>
          <CalendarClock size={13} />
          Reported {createdDate}
        </span>
      </div>
    </article>
  );
};

export default IssueCard;
