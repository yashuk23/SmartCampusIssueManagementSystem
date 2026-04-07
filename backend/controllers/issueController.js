import mongoose from "mongoose";
import { Issue } from "../models/Issue.js";
import { User } from "../models/User.js";

const buildFilters = (query) => {
  const filters = {};

  if (query.status) {
    filters.status = query.status;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.search) {
    filters.$text = { $search: query.search };
  }

  return filters;
};

export const createIssue = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "Title, description, and category are required" });
    }

    const issue = await Issue.create({
      title,
      description,
      category,
      createdBy: req.user._id
    });

    const populatedIssue = await issue.populate("createdBy", "name email role");

    res.status(201).json({
      message: "Issue created successfully",
      issue: populatedIssue
    });
  } catch (error) {
    next(error);
  }
};

export const getMyIssues = async (req, res, next) => {
  try {
    const filters = {
      ...buildFilters(req.query),
      createdBy: req.user._id
    };

    const issues = await Issue.find(filters)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json({ issues });
  } catch (error) {
    next(error);
  }
};

export const getAllIssues = async (req, res, next) => {
  try {
    const filters = buildFilters(req.query);
    const issues = await Issue.find(filters)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    const staff = await User.find({ role: "staff" }).select("name email");

    res.json({ issues, staff });
  } catch (error) {
    next(error);
  }
};

export const getAssignedIssues = async (req, res, next) => {
  try {
    const filters = {
      ...buildFilters(req.query),
      assignedTo: req.user._id
    };

    const issues = await Issue.find(filters)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json({ issues });
  } catch (error) {
    next(error);
  }
};

export const assignIssue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { staffId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({ message: "Invalid issue or staff identifier" });
    }

    const [issue, staffMember] = await Promise.all([
      Issue.findById(id),
      User.findOne({ _id: staffId, role: "staff" })
    ]);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (!staffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    issue.assignedTo = staffMember._id;
    issue.status = issue.status === "pending" ? "in-progress" : issue.status;
    await issue.save();

    const populatedIssue = await issue.populate([
      { path: "createdBy", select: "name email" },
      { path: "assignedTo", select: "name email" }
    ]);

    res.json({
      message: "Issue assigned successfully",
      issue: populatedIssue
    });
  } catch (error) {
    next(error);
  }
};

export const updateIssueStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (!issue.assignedTo || issue.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update issues assigned to you" });
    }

    issue.status = status;
    await issue.save();

    const populatedIssue = await issue.populate([
      { path: "createdBy", select: "name email" },
      { path: "assignedTo", select: "name email" }
    ]);

    res.json({
      message: "Issue status updated successfully",
      issue: populatedIssue
    });
  } catch (error) {
    next(error);
  }
};
