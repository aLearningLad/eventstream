const router = require("express").Router();
const getProjectController = require("../../controllers/project_controllers/get_project_controller");
const ensureAuth = require("../../middleware/is_authenticated");

router.get("/api/v1/event/:event_id", ensureAuth, getProjectController);

module.exports = { retrieveProjectRoute: router };
