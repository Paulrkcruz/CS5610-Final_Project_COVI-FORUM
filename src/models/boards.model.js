module.exports = (sequelize, Sequelize) => {
  const boards = sequelize.define("boards", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return boards;
};
