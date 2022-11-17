### github

- add repository to github
- clone repository
- check git remote -v
- check .git/config for user credentials

### heroku

heroku > app > deploy from main branch
heroku > app > settings > config vars:

- NODE_OPTIONS = --max_old_space_size=2560 (???)
- REACT_APP_API_URL = https://korrektursystem-backend.herokuapp.com/

heroku-cli:

heroku -a <appname>

heroku logs --tail -a <appname>
heroku domains -a <appname>

### react app
