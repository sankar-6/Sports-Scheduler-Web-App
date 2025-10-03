const express = require('express');
const { body, validationResult } = require('express-validator');
const { Sport } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all sports
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sports = await Sport.find().populate('createdBy', 'name email');
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new sport (Admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('name').notEmpty().withMessage('Sport name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const sport = new Sport({ name, createdBy: req.user.userId });
    await sport.save();

    const populatedSport = await Sport.findById(sport._id).populate('createdBy', 'name email');
    res.status(201).json(populatedSport);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete sport (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    await Sport.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clean up duplicate sports (Admin only)
router.delete('/cleanup/duplicates', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const allSports = await Sport.find();
    const sportsByName = {};
    
    // Group sports by name
    allSports.forEach(sport => {
      if (!sportsByName[sport.name]) {
        sportsByName[sport.name] = [];
      }
      sportsByName[sport.name].push(sport);
    });

    let deletedCount = 0;
    const deletedSports = [];

    // Delete duplicates, keeping the first occurrence of each name
    for (const [sportName, sports] of Object.entries(sportsByName)) {
      if (sports.length > 1) {
        // Keep the first one, delete the rest
        const toDelete = sports.slice(1);
        for (const sport of toDelete) {
          await Sport.findByIdAndDelete(sport._id);
          deletedCount++;
          deletedSports.push({ name: sport.name, id: sport._id });
        }
      }
    }

    res.json({
      message: `Cleanup completed. Deleted ${deletedCount} duplicate sports.`,
      deletedCount,
      deletedSports
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
