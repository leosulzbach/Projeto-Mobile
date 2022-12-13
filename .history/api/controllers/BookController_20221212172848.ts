
import { NextFunction } from 'express';
import { Op } from 'sequelize';
import BookModel from '../models/Book';

class BookController {

  index = async (req, res, next) => {
    const params = req.query;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};
   


    const book = await BookModel.findAll({
      where: where,
      order: [ [sort, order] ],
    });
    res.json(book);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const Book = await BookModel.create(data);
      res.json(Book);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const Book = await BookModel.findByPk(req.params.bookId);
    res.json(Book);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.userId;
      const data = await this._validateData(req.body, parseInt(id));
      await UserModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await UserModel.findByPk(id));
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    res.json({});
  }

  _validateData = async (data:any, id?:number) => {
    const attributes = ['name', 'age', 'sex', 'email', 'password'];
    const user:any = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      user[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(user.email, id)) {
      throw new Error(`The user with mail address "${user.email}" already exists.`);
    }

    return user;
  }

  _checkIfEmailExists = async (email:string, id?:number) => {
    const where:any = {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await UserModel.count({
      where: where
    });

    return count > 0;
  }

}

export default new UsersController();
