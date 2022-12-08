import { DataTypes, Model } from 'sequelize';
import { AnyFunction } from 'sequelize/types/utils';
import db from './db';
import User from './models/User';

async function atualizaDb()
{
    await User.sync({force: true});
    await User.create({
        name:"Leonardo",
        password:"12345",
        email:"leonardo@gmail.com"
    });

    let logado:any = await User.locateUser('leonardo@gmail.com','12345');
    console.log(logado.toJSON());
}

atualizaDb();