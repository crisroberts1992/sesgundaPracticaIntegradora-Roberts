
  import { criptografiador } from '../utils/criptografia.js'

// mid de autenticacion
export function extraerCredenciales(req, res, next) {
  try {
    const token = req.signedCookies.authToken
    const datosUsuario = criptografiador.decodificarToken(token)
    req.usuario = datosUsuario
  } catch (error) { }
  next()
}

// mid de autorizacion!
export function soloAutenticados(req, res, next) {
  if (!req.usuario) {
    return next(new Error('AUTHORIZATION ERROR'))
  }
  next()
}


//
/*export function soloAutenticados(req, res, next) {
  if (req.session.user) {
    next()
    
  } else {
    res.redirect('/login')
  }
}*/
