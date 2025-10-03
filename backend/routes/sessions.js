const express = require('express');
const { body, validationResult } = require('express-validator');
const { Sport, Session } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all sessions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'active' })
      .populate('sport', 'name')
      .populate('createdBy', 'name email')
      .populate('joinedPlayers.user', 'name email')
      .sort({ date: 1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new session
router.post('/', authenticateToken, [
  body('sportId').notEmpty().withMessage('Sport ID is required'),
  body('team1Players').isArray().withMessage('Team 1 players must be an array'),
  body('team2Players').isArray().withMessage('Team 2 players must be an array'),
  body('additionalPlayersNeeded').isInt({ min: 0 }).withMessage('Additional players needed must be a non-negative integer'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('venue').notEmpty().withMessage('Venue is required'),
  body('skillLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Skill level must be beginner, intermediate, or advanced'),
  body('maxPlayers').isInt({ min: 2 }).withMessage('Maximum players must be at least 2')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sportId, team1Players, team2Players, additionalPlayersNeeded, date, venue, description, skillLevel, maxPlayers } = req.body;

    // Check if sport exists
    const sport = await Sport.findById(sportId);
    if (!sport) {
      return res.status(400).json({ message: 'Sport not found' });
    }

    // Check if date is in the future
    if (new Date(date) <= new Date()) {
      return res.status(400).json({ message: 'Session date must be in the future' });
    }

    // Check for session conflicts (user already has a session at the same time)
    const sessionDate = new Date(date);
    const existingSession = await Session.findOne({
      $or: [
        { createdBy: req.user.userId },
        { 'joinedPlayers.user': req.user.userId }
      ],
      status: 'active',
      date: {
        $gte: new Date(sessionDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours before
        $lte: new Date(sessionDate.getTime() + 2 * 60 * 60 * 1000)  // 2 hours after
      }
    });

    if (existingSession) {
      return res.status(400).json({ 
        message: 'You already have a session scheduled around this time. Please choose a different time.',
        conflictingSession: {
          id: existingSession._id,
          date: existingSession.date,
          venue: existingSession.venue
        }
      });
    }

    const session = new Session({
      sport: sportId,
      createdBy: req.user.userId,
      team1Players,
      team2Players,
      additionalPlayersNeeded,
      date: new Date(date),
      venue,
      description: description || '',
      skillLevel,
      maxPlayers
    });

    await session.save();

    const populatedSession = await Session.findById(session._id)
      .populate('sport', 'name')
      .populate('createdBy', 'name email')
      .populate('joinedPlayers.user', 'name email');

    res.status(201).json(populatedSession);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Join session
router.post('/:id/join', authenticateToken, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status !== 'active') {
      return res.status(400).json({ message: 'Cannot join cancelled session' });
    }

    if (new Date(session.date) <= new Date()) {
      return res.status(400).json({ message: 'Cannot join past session' });
    }

    // Check if user already joined
    const alreadyJoined = session.joinedPlayers.some(
      player => player.user.toString() === req.user.userId
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: 'Already joined this session' });
    }

    // Check if session is full
    const totalJoined = session.joinedPlayers.length;
    if (totalJoined >= session.additionalPlayersNeeded) {
      return res.status(400).json({ message: 'Session is full' });
    }

    // Check for session conflicts when joining (user already has a session at the same time)
    const sessionDate = new Date(session.date);
    const conflictingSession = await Session.findOne({
      $or: [
        { createdBy: req.user.userId },
        { 'joinedPlayers.user': req.user.userId }
      ],
      status: 'active',
      _id: { $ne: session._id }, // Exclude current session
      date: {
        $gte: new Date(sessionDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours before
        $lte: new Date(sessionDate.getTime() + 2 * 60 * 60 * 1000)  // 2 hours after
      }
    });

    if (conflictingSession) {
      return res.status(400).json({ 
        message: 'You already have a session scheduled around this time. Please choose a different session.',
        conflictingSession: {
          id: conflictingSession._id,
          date: conflictingSession.date,
          venue: conflictingSession.venue
        }
      });
    }

    session.joinedPlayers.push({ user: req.user.userId });
    await session.save();

    const populatedSession = await Session.findById(session._id)
      .populate('sport', 'name')
      .populate('createdBy', 'name email')
      .populate('joinedPlayers.user', 'name email');

    res.json(populatedSession);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel session
router.post('/:id/cancel', authenticateToken, [
  body('reason').notEmpty().withMessage('Cancellation reason is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only session creator can cancel' });
    }

    session.status = 'cancelled';
    session.cancellationReason = req.body.reason;
    await session.save();

    res.json({ message: 'Session cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's sessions
router.get('/user/sessions', authenticateToken, async (req, res) => {
  try {
    const createdSessions = await Session.find({ createdBy: req.user.userId })
      .populate('sport', 'name')
      .populate('joinedPlayers.user', 'name email')
      .sort({ date: 1 });

    const joinedSessions = await Session.find({ 
      'joinedPlayers.user': req.user.userId,
      createdBy: { $ne: req.user.userId }
    })
      .populate('sport', 'name')
      .populate('createdBy', 'name email')
      .populate('joinedPlayers.user', 'name email')
      .sort({ date: 1 });

    res.json({ createdSessions, joinedSessions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get sessions by location/area
router.get('/area/:location', authenticateToken, async (req, res) => {
  try {
    const { location } = req.params;
    const sessions = await Session.find({ 
      status: 'active',
      venue: { $regex: location, $options: 'i' }
    })
      .populate('sport', 'name')
      .populate('createdBy', 'name email')
      .populate('joinedPlayers.user', 'name email')
      .sort({ date: 1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get sessions by sport
router.get('/sport/:sportId', authenticateToken, async (req, res) => {
  try {
    const { sportId } = req.params;
    const sessions = await Session.find({ 
      status: 'active',
      sport: sportId
    })
      .populate('sport', 'name')
      .populate('createdBy', 'name email')
      .populate('joinedPlayers.user', 'name email')
      .sort({ date: 1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Invite players to session
router.post('/:id/invite', authenticateToken, [
  body('emails').isArray().withMessage('Emails must be an array'),
  body('emails.*').isEmail().withMessage('Each email must be valid')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only session creator can invite players' });
    }

    const { emails } = req.body;
    const newInvitations = emails.map(email => ({
      email,
      invitedAt: new Date(),
      status: 'pending'
    }));

    session.invitedPlayers.push(...newInvitations);
    await session.save();

    res.json({ 
      message: 'Invitations sent successfully',
      invitedCount: emails.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's session activity/stats
router.get('/user/activity', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user's created sessions
    const createdSessions = await Session.find({ createdBy: userId })
      .populate('sport', 'name')
      .populate('joinedPlayers.user', 'name')
      .sort({ createdAt: -1 });

    // Get user's joined sessions
    const joinedSessions = await Session.find({ 
      'joinedPlayers.user': userId,
      createdBy: { $ne: userId }
    })
      .populate('sport', 'name')
      .populate('createdBy', 'name')
      .sort({ date: -1 });

    // Calculate stats
    const stats = {
      totalCreated: createdSessions.length,
      totalJoined: joinedSessions.length,
      activeSessions: createdSessions.filter(s => s.status === 'active').length,
      completedSessions: createdSessions.filter(s => s.status === 'completed').length,
      cancelledSessions: createdSessions.filter(s => s.status === 'cancelled').length,
      totalPlayersInvited: createdSessions.reduce((sum, s) => sum + s.invitedPlayers.length, 0),
      sportsPlayed: [...new Set([...createdSessions, ...joinedSessions].map(s => s.sport.name))]
    };

    res.json({
      createdSessions,
      joinedSessions,
      stats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
