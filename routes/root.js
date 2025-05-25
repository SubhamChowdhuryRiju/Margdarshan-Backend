const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Returns a welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to the Margdarshan Backend System!
 */
router.get("/", (req, res) => {
  res.send("<h1>Welcome to the Margdarshan Backend System!</h1>");
});

module.exports = {
  path: "/",
  router,
};
