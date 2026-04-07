import express from "express";
import {
  assignIssue,
  createIssue,
  getAllIssues,
  getAssignedIssues,
  getMyIssues,
  updateIssueStatus
} from "../controllers/issueController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware("student"), createIssue);
router.get("/my", roleMiddleware("student"), getMyIssues);
router.get("/", roleMiddleware("admin"), getAllIssues);
router.get("/assigned", roleMiddleware("staff"), getAssignedIssues);
router.put("/:id/assign", roleMiddleware("admin"), assignIssue);
router.put("/:id/status", roleMiddleware("staff"), updateIssueStatus);

export default router;
