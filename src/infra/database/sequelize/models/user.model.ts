
import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config";

export class UserModel extends Model {
  declare id: string
  declare username: string
  declare email: string
  declare password: string
}

UserModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [6, 10] // Exemplo de validação: senha deve ter entre 6 e 10 caracteres
    }
  }
}, {
  sequelize,
  timestamps: true,
  tableName: 'users',
  freezeTableName: true,
  underscored: true,
})