const getDate = dt => {
  // const date = new Date(dt);
  return dt;
};

const documentObj = (sequelize, Sequelize) => {
  const Doc = sequelize.define('doc', {
    date: {
      type: Sequelize.DATEONLY
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    membersOnly: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    weeklyBased: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });
  Doc.findByDate = async () => {
    const docs = await Doc.findAll({ where: { weeklyBased: true } });
    const docMap = docs.reduce(
      (p, c) => ({
        ...p,
        ...{
          [getDate(c.date)]: p[getDate(c.date)]
            ? [...p[getDate(c.date)], c]
            : [c]
        }
      }),
      {}
    );
    return Object.entries(docMap).map(([date, documents]) => ({
      date,
      documents
    }));
  };
  Doc.associate = () => {
    // Doc.hasMany(models.Message);
  };

  return Doc;
};

export default documentObj;
