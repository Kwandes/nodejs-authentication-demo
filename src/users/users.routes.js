import express from "express";
import { processError } from "../util/process-error.js";
import { UsersService } from "./users.service.js";

const router = express.Router();

const usersService = new UsersService();

router.get("/", async (_req, res) => {
  try {
    const result = await usersService.findAll();
    return res.status(200).send(result);
  } catch (err) {
    return processError(err, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await usersService.findOne(req.params.id);
    return res.status(200).send(result);
  } catch (err) {
    return processError(err, res);
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const result = await usersService.findOneByEmail(req.params.email);
    return res.status(200).send(result);
  } catch (err) {
    return processError(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate the body
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.code = 400;
      throw error;
    }

    const result = await usersService.create(email, password);
    return res.status(200).send(result);
  } catch (err) {
    return processError(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await usersService.perish(req.params.id);
    return res.status(204).send(result);
  } catch (err) {
    return processError(err, res);
  }
});

export { router as UsersRouter };
