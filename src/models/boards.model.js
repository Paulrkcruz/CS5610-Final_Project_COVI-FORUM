module.exports = (sequelize, Sequelize) => {
  const Boards = sequelize.define("boards", {
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
