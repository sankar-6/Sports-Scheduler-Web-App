const express = require('express');
const { Session } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get admin reports
router.get('/reports', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sessions = await Session.find(dateFilter)
      .populate('sport', 'name')
      .populate('joinedPlayers.user', 'name email');

    const totalSessions = sessions.length;
    const sportStats = {};

    sessions.forEach(session => {
      const sportName = session.sport.name;
      if (!sportStats[sportName]) {
        sportStats[sportName] = {
          sessions: 0,
          totalPlayers: 0
        };
      }
      sportStats[sportName].sessions++;
      sportStats[sportName].totalPlayers += session.joinedPlayers.length;
    });

    res.json({
      totalSessions,
      sportStats,
      period: { startDate, endDate }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
