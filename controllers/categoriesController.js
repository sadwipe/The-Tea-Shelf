import db from '../db/queries.js';

import { body, validationResult, matchedData } from 'express-validator';

// GET /categories
function getCategories(req, res) {
  res.render('categories');
}

// GET /categories/new
function getNewCategoriesForm(req, res) {
  res.render('add-category', { errors: [] });
}

const validateCategory = [
  body('category')
    .trim()
    .isAlpha()
    .withMessage('The category must only contain letters.')
    .isLength({ min: 3, max: 30 })
    .withMessage('The category must be between 3 and 30 characters.'),
];

// POST /categories/new
const postNewCategory = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    const { color } = req.body;

    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).render('add-category', {
        errors: errors.array(),
      });
    }

    const { category } = matchedData(req);

    console.log(matchedData(req));

    const existingCategory = await db.getCategory(category);

    if (existingCategory.length !== 0) {
      return res.status(400).render('add-category', {
        errors: [{ msg: `The category ${category} already exists.` }],
      });
    }

    const data = {
      name: category,
      // Remove # from the hexcode
      color: color.slice(1),
    };

    await db.postCategory(data);
    res.redirect('/categories');
  },
];

// async function postNewCategory(req, res) {
//   const { category } = req.body;

//   const existingCategory = await db.getCategory(category);

//   console.log(existingCategory);

//   if (existingCategory.length !== 0) {
//     res.render('add-category', {
//       errors: [{ msg: `The category ${category} already exists.` }],
//     });
//     return;
//   }

//   await db.postCategory(category);
//   res.redirect('/categories');
// }

export default {
  getCategories,
  getNewCategoriesForm,
  postNewCategory,
};
