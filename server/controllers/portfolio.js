const Portfolio = require("../models/Portfolio");

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find();
  if (!portfolios) res.status(404).send("there is no portfolio");
  res.send(portfolios);
};

exports.getPortfolioById = async (req, res) => {
  const id = req.params.id;
  const portfolio = await Portfolio.findById(id).select(`-__v`).exec();
  if (!portfolio) res.status(404).send(`portfolio with ${id} does not exist`);
  return res.send(portfolio);
};

exports.savePortfolio = async (req, res) => {
  const portfolioData = req.body;
  const userId = req.user.sub;
  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = userId;

  await portfolio.save();
  return res.send(portfolio);
};

exports.updatePortfolios = async (req, res) => {
  const id = req.params.id;
  let portfolio = await Portfolio.findById(id);
  if (!portfolio) res.status(404).send(`there is no portfolio with this ${id}`);
  portfolio.set(req.body);

  try {
    await portfolio.save();
    res.send(portfolio);
  } catch (e) {
    console.log(e);
  }
};

exports.deletePortfolios = async (req, res) => {
  const id = req.params.id;
  try {
    const portfolio = await Portfolio.findByIdAndDelete(id);
    console.log(portfolio);
    return res.send(`${portfolio} is deleted`);
  } catch (e) {
    console.log(e);
  }
};
