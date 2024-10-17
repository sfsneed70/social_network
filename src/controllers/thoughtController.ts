import Thought from "../models/Thought.js";
import User from "../models/User.js";
import { Request, Response } from "express";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().select("-__v");
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );

    if (!thought) {
      res.status(404).json({ message: "No thought with that ID" });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.create(req.body);
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: dbThoughtData._id } },
      { new: true }
    );

    res.json(dbThoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "No thought with this ID!" });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    if (!deletedThought) {
      res.status(404).json({ message: "No thought with this ID!" });
    } else {
      res.json(deletedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "No thought with this ID!" });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "No thought with this ID!" });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
