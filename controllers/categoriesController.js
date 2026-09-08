import { body, validationResult, matchedData } from 'express-validator';

import db from '../db/queries.js';
import { getContrastColor } from '../utils/utils.js';

// GET /categories
async function getCategories(req, res) {
  const categories = await db.getCategories();

  if (categories.length === 0) {
    return res.render('pages/categories', {
      categories,
      info: 'There are no categories available.',
    });
  }

  res.render('pages/categories', { categories, getContrastColor });
}

// GET /categories/new
function getNewCategoriesForm(req, res) {
  res.render('pages/add-category', { errors: [] });
}

// Validate POST /categories/new
const validateCategory = [
  body('category')
    .trim()
    .matches(/^[A-Za-z ]+$/)
    .withMessage('The category name must only contain letters and spaces.')
    .isLength({ min: 3, max: 30 })
    .withMessage(
      'The category name length must be between 3 and 30 characters.',
    ),
];

// POST /categories/new
const postNewCategory = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    const { color } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).render('pages/add-category', {
        errors: errors.array(),
      });
    }

    const { category } = matchedData(req);

    const existingCategory = await db.getCategory(category);

    if (existingCategory.length !== 0) {
      return res.status(400).render('pages/add-category', {
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

export default {
  getCategories,
  getNewCategoriesForm,
  postNewCategory,
};
