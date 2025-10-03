const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['player', 'admin'], default: 'player' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Sport Model
const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Sport = mongoose.model('Sport', sportSchema);

// Session Model
const sessionSchema = new mongoose.Schema({
  sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team1Players: [{ type: String }],
  team2Players: [{ type: String }],
  additionalPlayersNeeded: { type: Number, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  description: { type: String, default: '' },
  skillLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  maxPlayers: { type: Number, required: true },
  joinedPlayers: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedAt: { type: Date, default: Date.now },
    team: { type: String, enum: ['team1', 'team2', 'unassigned'], default: 'unassigned' }
  }],
  invitedPlayers: [{
    email: { type: String },
    invitedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
  }],
  status: { type: String, enum: ['active', 'cancelled', 'completed'], default: 'active' },
  cancellationReason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = {
  User,
  Sport,
  Session
};
