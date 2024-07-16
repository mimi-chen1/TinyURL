import UserModel from "../models/UserModel.js";
import LinkModel from "../models/LinkModel.js";
const UserController = {
  
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find()
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: "An error occurred", error });
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id)
      
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "An error occurred", error });
    }
  },
  

createUser: async (req, res) => {
    try {
      const { name, email, password, links } = req.body;
      if (!name || !email || !password) {
        return res.status(400).send({ message: "name, email, and password are required" });
      }

      const newUser = new UserModel({ name, email, password });

      if (links && links.length > 0) {
        const linkDocs = await LinkModel.insertMany(links.map(link => ({ originalUrl: link })));
        newUser.links = linkDocs.map(doc => doc._id);
      }

      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send({ message: "An error occurred", error });
    }
  },
  
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).send({ message: "name, email, and password are required" });
      }
      
      const updatedUser = await UserModel.findByIdAndUpdate(id, { name, email, password }, { new: true });
      
      if (updatedUser) {
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "An error occurred", error });
    }
  },
  
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(id);
      
      if (deletedUser) {
        res.status(200).send({ message: "User deleted successfully" });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "An error occurred", error });
    }
  }
};

export default UserController;
