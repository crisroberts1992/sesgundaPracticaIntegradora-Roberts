export async function loginView(req, res,next) {
    res.render('login', { pageTitle: 'Login' })
  }