const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require('./user.controller');

const router = require('express').Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;
