// exports.dashboard = (req, res) => {
//   res.status(200).render('');
// };

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'LOGIN',
  });
};
