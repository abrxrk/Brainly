import express from "express"

export const ShareRoutes = express.Router()

ShareRoutes.post('/share')
ShareRoutes.get('/:shareLink')