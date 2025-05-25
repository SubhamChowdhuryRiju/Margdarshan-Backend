const express = require("express");
const router = express.Router();
const add = require("../components/addition/addition");

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add two numbers from the request body
 *     tags:
 *       - Math
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               n1:
 *                 type: integer
 *                 example: 5
 *               n2:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       200:
 *         description: The sum of the two numbers
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: The sum of 5 and 7 is 12
 */
router.post("/", (req, res) => {
  const { n1, n2 } = req.body;
  const result = add(n1, n2);
  response = {
    message: `The sum of ${n1} and ${n2} is ${result}`,
  }
  res.send(response);
});

module.exports = {
  path: "/add",
  router,
};
