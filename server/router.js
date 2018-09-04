import * as Authentication from "./controllers/authentication";
import passportService from './services/passport';

const requireAuth = passportService.authenticate('jwt', {
    session: false
});
const requireSignin = passportService.authenticate('local', {
    session: false
});

export default function (app) {
  app.get('/', requireAuth, (req, res) => {
      res.send({
          hi: 'there'
      });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
