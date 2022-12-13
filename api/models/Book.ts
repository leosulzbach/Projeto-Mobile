import { DataTypes, Model } from 'sequelize';
import db from '../db';


class Book extends Model { };

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'books',
  modelName: 'Book'
});


export default Book;