import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";

// @Table({ tableName: 'posts', timestamps: true, freezeTableName: true })
// export class PostModel extends Model {
//   @Default(DataType.UUIDV4) // Gera o UUID automaticamente no Sequelize
//   @PrimaryKey
//   @Column(DataType.UUID)    // Define o tipo da coluna no Banco de Dados
//   id!: string;

//   @Column(DataType.STRING)
//   title!: string;

//   @Column(DataType.TEXT)
//   content!: string;

//   @ForeignKey(() => UserModel)
//   @Column(DataType.STRING)
//   authorId!: string;

//   @BelongsTo(() => UserModel)
//   author!: UserModel;
// }


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
