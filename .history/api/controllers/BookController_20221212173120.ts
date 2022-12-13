
import { Op } from 'sequelize';
import BookModel from '../models/Book';
import express, { Request, Response, NextFunction } from 'express';

class UsersController {

  index = async (req:Request, res:Response, next:NextFunction) => {
    // const params = req.query;
    // const limit:number = parseInt(params.limit+"") || 100;
    // const page:number = parseInt(params.page+"") || 1;
    // const offset = (page - 1) * limit;
    // const sort:string = params.sort+"" || 'id';
    // const order:string = params.order+"" || 'ASC';
    // const where:any = {};

    // if (params.name) {
    //   where.name = {
    //     [Op.iLike]: `%${params.name}%`
    //   };
    // }

    // if (params.email) {
    //   where.email = {
    //     [Op.iLike]: `%${params.email}%`
    //   };
    // }

    // if (params.min_age) {
    //   where.age = {
    //     [Op.gte]: params.min_age
    //   };
    // }

    // if (params.max_age) {
    //   if (! where.age) {
    //     where.age = {};
    //   }
    //   where.age[Op.lte] = params.max_age;
    // }

    // if (params.sex) {
    //   where.sex = params.sex;
    // }

    const users = await BookModel.findAll({
      // where: where,
      // limit: limit,
      // offset: offset,
      // order: [ [sort, order] ]
    });
    res.json(users);
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
    const book = await BookModel.findByPk(req.params.bookId);
    res.json(book);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const data = await this._validateData(req.body, parseInt(id));
      await BookModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await BookModel.findByPk(id));
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await BookModel.destroy({
      where: {
        id: req.params.bookId
      }
    });
    res.json({});
  }

  _validateData = async (data:any, id?:number) => {
    const attributes = [];
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