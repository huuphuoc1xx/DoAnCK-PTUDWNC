const { STATUS } = require("./constant");

module.exports = {
  responseWithStatus: (res, code) => {
    res.json(STATUS[code]);
  },
  responseWithData: (res, data) => {
    res.json({
      code: 0,
      data,
    });
  },
  dataMapper: (data, fields) => {
    const obj = {};

    fields.forEach((field) => {
      if (data[field]) obj[field] = data[field];
    });

    return obj;
  },
  commonModel: function (db, TABLE, viewFields, changeFields) {
    return {
      findAll: () => db.load(`SELECT ${viewFields} FROM ${TABLE}`),
      findByCondition: (condition) => db.load(
        `SELECT ${viewFields} FROM ${TABLE} WHERE ?`,
        condition
      ),
      add: (entity) => {
        const addData = this.dataMapper(entity, changeFields);
        return db.add(TABLE, addData);
      },
      edit: (entity) => {
        const changeData = this.dataMapper(entity, changeFields);
        return db.edit(TABLE, changeData, { id: entity.id });
      },
    };
  },
};
