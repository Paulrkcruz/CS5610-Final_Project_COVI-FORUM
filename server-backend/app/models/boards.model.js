module.exports = (sequelize, Sequelize) => {
  const Boards = sequelize.define("boards", {
    username: {
      type: Sequelize.STRING
    },
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
  return Boards;
};
