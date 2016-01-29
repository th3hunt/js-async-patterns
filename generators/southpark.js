import fakeAjax from '../fakeAjaxAsPromise';
import logger from '../logger';

async function fetchCharacter(url) {
  try {
    const character = await fakeAjax(url);
    
    const [friends, criminalRec] = await Promise.all([
      fakeAjax(character.spdbUrl + '/friends'),
      fakeAjax(character.spdbUrl + '/record')
    ]);

    Object.assign(character, {friends, criminalRec});

    if (friends < 2 && criminalRec !== null) {
      logger.strong('Friends: %s. CR: %s  => infamous!\n', friends, criminalRec);
      const knownFor = await fakeAjax(character.spdbUrl + '/known_for');
      Object.assign(character, {knownFor});
    }

    return character;

  } catch(error) {
    throw error;
  }
}

fetchCharacter('imdb.com/cartman')
  .then((eric) => logger.success(eric))
  .catch((error) => logger.error(error));
