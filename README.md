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

heroku > app > settings > add domain (www.korrektursystem.live)
copy DNS-Target code
name.com > domains > dns records > add:
CNAME www.korrektursystem.com Value= DNS-Target code

config ssl with ACM (hobby account!)

heroku-cli:

heroku -a <appname>

heroku logs --tail -a <appname>
heroku domains -a <appname>

### react app
