import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";

export class PostModel extends Model {
  declare id: string
  declare title: string
  declare content: string
  declare authorId: string
}

PostModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  authorId: { // Nome no TypeScript (CamelCase)
    type: DataTypes.STRING,
    allowNull: false,
    field: 'author_id', // Nome real na tabela (Migration)
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize,
  timestamps: true,
  tableName: 'posts',
  freezeTableName: true,
  underscored: true
})
