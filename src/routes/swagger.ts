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
 * /profile/me:
 *   get:
 *     description: Get profile user login
 *     responses:
 *       200:
 *         description: Get profile success
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
 *                          _id:
 *                              type: string
 *                          user_email:
 *                              type: string
 *                          user_first_name:
 *                              type: string
 *                          user_last_name:
 *                              type: string
 *                          user_status:
 *                              type: integer
 *                          user_create_at:
 *                              type: string
 *                              format: date-time
 *                          user_update_at:
 *                              type: string
 *                              format: date-time
 *                          user_create_by:
 *                              type: string
 *                          user_update_by:
 *                              type: string
 *                          user_role:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  user_id:
 *                                      type: string
 *                                  role_id:
 *                                      type: string
 *                                  user_role_create_date:
 *                                      type: string
 *                                      format: date-time
 *                                  user_role_update_date:
 *                                      type: string
 *                                      format: date-time
 *                                  role:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          role_name:
 *                                              type: integer
 *                                          role_create_date:
 *                                              type: string
 *                                              format: date-time
 *                                          role_update_date:
 *                                              type: string
 *                                              format: date-time
 *
 *
 */
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

/**
 * @swagger
 * /users/delete:
 *   post:
 *     description: Delete user
 *     parameters:
 *      - name: userId
 *        in: formData
 *        required: true
 *        description: User id
 *        type: string
 *     responses:
 *       200:
 *         description: Delete user successfully
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Log in to the system
 *     parameters:
 *      - name: accessToken
 *        description: Token
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
 *                      type: string
 */

//------image------
/**
 * @swagger
 * /images/create:
 *   post:
 *     description: Create image
 *     parameters:
 *      - name: name
 *        in: formData
 *        required: true
 *        description: Image name
 *        type: string
 *      - name: file
 *        in: formData
 *        required: true
 *        description: Image file
 *        type: file
 *     responses:
 *       200:
 *         description: Create image successfully
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
/**
 * @swagger
 * /images:
 *   get:
 *     description: Get list image
 *     parameters:
 *      - name: page
 *        in: query
 *        description: Page
 *        type: integer
 *      - name: limit
 *        in: query
 *        description: Limit
 *        type: integer
 *      - name: status
 *        in: query
 *        description: Status
 *        type: integer
 *      - name: name
 *        in: query
 *        description: Name
 *        type: string
 *      - name: deleted
 *        in: query
 *        description: Deleted
 *        type: integer
 *      - name: timeStart
 *        in: query
 *        description: Time start
 *        type: string
 *      - name: timeEnd
 *        in: query
 *        description: Time end
 *        type: string
 *     responses:
 *       200:
 *         description: Get a list of successful image
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
 *                                      _id:
 *                                          type: string
 *                                      image_name:
 *                                          type: string
 *                                      image_path:
 *                                          type: string
 *                                      image_status:
 *                                          type: integer
 *                                      image_create_at:
 *                                          type: string
 *                                          format: date-time
 *                                      image_update_at:
 *                                          type: string
 *                                          format: date-time
 *                                      image_create_by:
 *                                          type: string
 *                                      image_update_by:
 *                                          type: string
 *                                      image_deleted:
 *                                          type: integer
 *
 *
 *
 */

/**
 * @swagger
 * /images:
 *   put:
 *     description: Update image
 *     parameters:
 *      - name: id
 *        in: formData
 *        required: true
 *        description: Id image
 *        type: string
 *      - name: status
 *        in: formData
 *        description: Status image
 *        type: integer
 *      - name: name
 *        in: formData
 *        description: Name image
 *        type: string
 *     responses:
 *       200:
 *         description: Update successful
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
 *                          _id:
 *                             type: string
 *                          image_name:
 *                             type: string
 *                          image_path:
 *                             type: string
 *                          image_status:
 *                             type: integer
 *                          image_create_at:
 *                             type: string
 *                             format: date-time
 *                          image_update_at:
 *                             type: string
 *                             format: date-time
 *                          image_create_by:
 *                             type: string
 *                          image_update_by:
 *                             type: string
 *                          image_deleted:
 *                             type: integer
 *
 */

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     description: Restore image
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Image id
 *        type: string
 *     responses:
 *       200:
 *         description: Restore image successfully
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

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     description: Delete image
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Image id
 *        type: string
 *     responses:
 *       200:
 *         description: Delete image successfully
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
