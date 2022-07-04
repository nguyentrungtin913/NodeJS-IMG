
/**
 * @swagger
 * /login:
 *   post:
 *     description: Log in to the system
 *     parameters:
 *      - name: email
 *        description: email exists in the system
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: email exists in the system
 *        in: formData
 *        required: true
 *        type: string
 *
 *     responses:
 *       200:
 *         description: Login success
 *         schema:
 *              type: object
 *              properties:
 *                   code:
 *                      type: string
 *                   msgKey:
 *                      type: string
 *                   description:
 *                      type: string
 *                   data:
 *                      type: object
 *                      properties:
 *                          accessToken:
 *                              type: string
 */

/**
 * @swagger
 * /setting:
 *   get:
 *     description: Get timezone
 *     responses:
 *       200:
 *         description: Get timezone success
 *         schema:
 *              type: object
 *              properties:
 *                  code:
 *                      type: string
 *                  msgKey:
 *                      type: string
 *                  description:
 *                      type: string
 *                  data:
 *                      type: string
 */

//------user------
 /**    
  * @swagger
  * /users:
  *   post:
  *     description: Get all user
  *     parameters:
  *      - name: page
  *        in: formData
  *        description: Page
  *        type: string
  *      - name: limit
  *        in: formData
  *        description: Limit
  *        type: string
  *      - name: status
  *        in: formData
  *        description: Status
  *        type: string
  *      - name: email
  *        in: formData
  *        description: Email
  *        type: string
  *     responses:
  *       200:
  *         description: Get a list of successful users
  *         schema:
  *              type: object
  *              properties:
  *                  code:
  *                      type: string
  *                  msgKey:
  *                      type: string
  *                  description:
  *                      type: string
  *                  data:
  *                      type: object
  *                      properties:
  *                          ListUsers:
  *                              type: array
  *                              items:
  *                                  type: object
  *                                  properties:
  *                                      user_id:
  *                                          type: string
  *                                      user_email:
  *                                          type: string
  *                                      user_first_name:
  *                                          type: string
  *                                      user_last_name:
  *                                          type: string
  *                                      user_status:
  *                                          type: integer
  *                                      user_create_at:
  *                                          type: string
  *                                          format: date-time
  *                                      user_update_at:
  *                                          type: string
  *                                          format: date-time
  *                                      user_create_by:
  *                                          type: string
  *                                      user_update_by:
  *                                          type: string
  *                                      user_roles:
  *                                          type: array
  *                                          items:
  *                                              type: object
  *                                              properties:
  *                                                  user_id:
  *                                                      type: string
  *                                                  role_id:
  *                                                      type: string
  *                                                  user_role_create_date:
  *                                                      type: string
  *                                                      format: date-time
  *                                                  user_role_update_date:
  *                                                      type: string
  *                                                      format: date-time
  *                                                  user_role_create_by:
  *                                                      type: string
  *                                                  user_role_update_by:
  *                                                      type: string
  *                                                  role:
  *                                                      type: object
  *                                                      properties:
  *                                                          role_id:
  *                                                              type: integer
  *                                                          role_name:
  *                                                              type: integer
  *                                                          role_create_date:
  *                                                              type: string
  *                                                              format: date-time
  *                                                          role_update_date:
  *                                                              type: string
  *                                                              format: date-time
  *                                                          role_create_by:
  *                                                              type: string
  *                                                          role_update_by:
  *                                                              type: string
  *
  *
  */

 /**    
  * @swagger
  * /users/create:
  *   post:
  *     description: Create user
  *     parameters:
  *      - name: email
  *        in: formData
  *        required: true
  *        description: Email
  *        type: string
  *      - name: password
  *        in: formData
  *        required: true
  *        description: Password
  *        type: string
  *      - name: firstName
  *        in: formData
  *        description: Firstname
  *        type: string
  *      - name: lastName
  *        in: formData
  *        description: Lastname
  *        type: string
  *     responses:
  *       200:
  *         description: Create user successfully
  *         schema:
  *              type: object
  *              properties:
  *                  code:
  *                      type: string
  *                  msgKey:
  *                      type: string
  *                  description:
  *                      type: string
  *                  data:
  *                      type: string
  *
  */

//role
/**
 * @swagger
 * /roles:
 *   get:
 *     description: Get all role
 *     responses:
 *       200:
 *         description: Get a list of successful users
 *         schema:
 *              type: object
 *              properties:
 *                  code:
 *                      type: string
 *                  msgKey:
 *                      type: string
 *                  description:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                          list_roles:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      role_id:
 *                                          type: string
 *                                      role_name:
 *                                          type: string
 *                                      role_create_date:
 *                                          type: string
 *                                          format: date-time
 *                                      role_update_date:
 *                                          type: string
 *                                          format: date-time
 *                                      role_create_by:
 *                                          type: string
 *                                      role_update_by:
 *                                          type: string
 */
