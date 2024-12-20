/**
 * @swagger
 * /api/admin/add/product:
 *   post:
 *     summary: Add a new product
 *     tags: [Admin/Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Running Shoes
 *               categoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e6f"
 *               subCategoryId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e70"
 *               brandId:
 *                 type: string
 *                 example: "60b8d295f9f1b2a7d03c5e71"
 *               price:
 *                 type: number
 *                 example: 1000
 *               description:
 *                 type: string
 *                 example: High quality running shoes
 *               image:
 *                 type: string
 *                 format: binary
 *               size:
 *                 type: string
 *                 example: "10"
 *               color:
 *                 type: string
 *                 example: "Red"
 *               stock:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b8d295f9f1b2a7d03c5e72"
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */