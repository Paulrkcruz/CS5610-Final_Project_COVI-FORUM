exports.allAccess = (req, res) => {
  res.status(200).send("Welcome to CoviForum");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Settings");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Administrator Mode.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Mode.");
};
