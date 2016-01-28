import Promise from 'bluebird';
import nodeAjax from '../nodeAjax';
import logger from '../logger';

// demonstrate Promise.promisify() usage
const promisedAjax = Promise.promisify(nodeAjax);

// retrieve Cartman's profile from IMDB
promisedAjax('imdb.com/cartman')

  // retrieve criminal record + friends from SPDB
  .then((character) => {
    return Promise.props({
      friends: promisedAjax(`${character.spdbUrl}/friends`),
      criminalRec: promisedAjax(`${character.spdbUrl}/record`)
    })

      .then((props) => Object.assign(character, props));
  })

  // retrieve episodes known for
  .then((character) => {
    if (character.friends < 2 && character.criminalRec !== null) {
      logger.strong(`Friends: ${character.friends}. CR: ${character.criminalRec} => infamous!\n`);
      return promisedAjax(`${character.spdbUrl}/known_for`)

        .then((knownFor) => Object.assign(character, {knownFor}));
    }

    return character;
  })

  .then((eric) => {
    logger.success(eric);
  })

  .catch((err) => {
    logger.error(error);
  });
