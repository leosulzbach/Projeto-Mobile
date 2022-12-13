
import { Op } from 'sequelize';
import BookModel from '../models/Book';
import express, { Request, Response, NextFunction } from 'express';

class BookController {

  index = async (req:Request, res:Response, next:NextFunction) => {
   

    const books = await BookModel.findAll({

    });
    res.json(books);
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
    const attributes = ['title', 'author', 'publication_year', 'pages', 'value'];
    const book:any = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      book[attribute] = data[attribute];
    }

    if (await this._checkIfTitleExists(book.title, id)) {
      throw new Error(`The book with title "${book.title}" already exists.`);
    }

    return book;
  }

  _checkIfTitleExists = async (title:string, id?:number) => {
    const where:any = {
      title: title
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await BookModel.count({
      where: where
    });

    return count > 0;
  }

}

export default new BookController();